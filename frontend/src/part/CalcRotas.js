import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseURL = 'http://localhost:3001/api';

function CalcularRotas() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosSelecionados, setUsuariosSelecionados] = useState([]);
  const [mensagemBackend, setMensagemBackend] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${baseURL}/checkdata`);
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao buscar dados de usuários:', error);
    }
  };

  const handleSelecionarUsuario = (id) => {
    if (usuariosSelecionados.includes(id)) {
      setUsuariosSelecionados(usuariosSelecionados.filter(userId => userId !== id));
    } else {
      setUsuariosSelecionados([...usuariosSelecionados, id]);
    }
  };

  const handleGerarRota = async () => {
    try {
      const companyCep = "08141-300"; // CEP fix
      const clientsData = usuariosSelecionados.map(id => {
        const usuario = usuarios.find(user => user.id === id);
        return { cep: usuario.cep, name: usuario.nome };
      });

      const requestBody = {
        company: { cep: companyCep },
        clients: clientsData
      };

      const response = await fetch(`${baseURL}/calculate-route-all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const responseData = await response.json();
        setMensagemBackend(`Total de distância: ${responseData.totalDistance} km - ${responseData.message}`);
      } else {
        setMensagemBackend('Erro ao calcular rota.');
      }
    } catch (error) {
      console.error('Erro ao gerar rota:', error);
      setMensagemBackend('Erro ao gerar rota. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Calcular Rotas</h2>
      <ul className="list-group">
        {usuarios.map(usuario => (
          <li key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {usuario.nome} - {usuario.cep}
            </div>
            <div>
              <input
                type="checkbox"
                checked={usuariosSelecionados.includes(usuario.id)}
                onChange={() => handleSelecionarUsuario(usuario.id)}
              />
            </div>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary mt-3" onClick={handleGerarRota}>Gerar Rota</button>
      {mensagemBackend && (
        <div className="alert mt-3" role="alert" style={{ backgroundColor: 'black', color: 'white', maxHeight: '100px', fontSize: '14px', overflowY: 'auto' }}>
          {mensagemBackend}
        </div>
      )}
    </div>
  );
}

export default CalcularRotas;
