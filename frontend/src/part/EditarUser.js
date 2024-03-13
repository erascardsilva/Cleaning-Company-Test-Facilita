import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseURL = 'http://localhost:3001/api'; 

function EditarUsuario() {
  const [userId, setUserId] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [mensagemBackend, setMensagemBackend] = useState('');
  const [sucesso, setSucesso] = useState(false);

  
  useEffect(() => {
    if (userId !== '') {
      fetchUsuario(userId);
    }
  }, [userId]);

  
  const fetchUsuario = async (id) => {
    try {
      const response = await fetch(`${baseURL}/checkdata/${id}`);
      const userData = await response.json();
      setNome(userData.nome);
      setTelefone(userData.telefone);
      setEmail(userData.email);
      setCep(userData.cep);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/updatedata/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, telefone, email, cep })
      });

      const data = await response.json();
      setSucesso(true);
      setMensagemBackend(data.message);
    } catch (error) {
      setSucesso(false);
      setMensagemBackend('Erro ao atualizar usuário. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">ID do Usuário</label>
          <input type="text" className="form-control form-control-sm" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome do Cliente</label>
          <input type="text" className="form-control form-control-sm" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">Telefone</label>
          <input type="text" className="form-control form-control-sm" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control form-control-sm" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="cep" className="form-label">CEP</label>
          <input type="text" className="form-control form-control-sm" id="cep" value={cep} onChange={(e) => setCep(e.target.value)} />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-sm">Atualizar</button>
        </div>
      </form>
      {mensagemBackend && (
        <div className={`alert ${sucesso ? 'alert-success' : 'alert-danger'} mt-3`} role="alert" style={{ backgroundColor: 'black', color: 'white', maxHeight: '100px', fontSize: '14px' }}>
          {mensagemBackend}
        </div>
      )}
    </div>
  );
}

export default EditarUsuario;
