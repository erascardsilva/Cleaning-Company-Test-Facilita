import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseURL = 'http://localhost:3001/api';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [mensagemBackend, setMensagemBackend] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${baseURL}/savedate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, telefone, email, cep })
      });
  
      const data = await response.json();
      setSucesso(true);
      setNovoUsuario(data);
      setMensagemBackend('Usuário cadastrado com sucesso!');
    } catch (error) {
      setSucesso(false);
      setMensagemBackend('Erro ao cadastrar usuário. Por favor, tente novamente.');
    } finally {
      
      setNome('');
      setTelefone('');
      setEmail('');
      setCep('');
    }
  };
  
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cadastro de Usuário</h2>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}> {/* Div com barra de rolagem */}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome do Cliente</label>
          <input type="text" className="form-control form-control-sm" id="nome" placeholder="Insira o nome do cliente" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">Telefone</label>
          <input type="text" className="form-control form-control-sm" id="telefone" placeholder="Insira o telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control form-control-sm" id="email" placeholder="Insira o email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="cep" className="form-label">CEP</label>
          <input type="text" className="form-control form-control-sm" id="cep" placeholder="Insira o CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-sm">Cadastrar</button>
        </div>
      </form>
      </div>
      {mensagemBackend && (
        <div className={`alert ${sucesso ? 'alert-success' : 'alert-danger'} mt-3`} role="alert" style={{ backgroundColor: 'black', color: 'white', maxHeight: '100px', fontSize: '14px', overflowY: 'auto' }}>
  {sucesso ? (
          <p>{mensagemBackend}</p>
          ) : (
            <p>{mensagemBackend}</p>
          )}
          {novoUsuario && sucesso && (
            <div>
              <p>ID: {novoUsuario.id} Nome : {novoUsuario.nome}</p>
              <p>Email: {novoUsuario.email} Telefone: {novoUsuario.telefone}</p>
              
              <p>CEP: {novoUsuario.cep}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CadastroUsuario;
