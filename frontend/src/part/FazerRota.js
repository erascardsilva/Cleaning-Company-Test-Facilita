import React, { useState } from 'react';

const baseURL = 'http://localhost:3001/api'; 

function FazerRotas() {
  const [empresaCep, setEmpresaCep] = useState('');
  const [cliente1Nome, setCliente1Nome] = useState('');
  const [cliente1Cep, setCliente1Cep] = useState('');
  const [cliente2Nome, setCliente2Nome] = useState('');
  const [cliente2Cep, setCliente2Cep] = useState('');
  const [mensagemBackend, setMensagemBackend] = useState('');

  const handleGerarRota = async () => {
    try {
      const response = await fetch(`${baseURL}/calculate-route`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          company: {
            cep: empresaCep
          },
          client1: {
            name: cliente1Nome,
            cep: cliente1Cep
          },
          client2: {
            name: cliente2Nome,
            cep: cliente2Cep
          }
        })
      });

      const data = await response.json();
      setMensagemBackend(data.message);
    } catch (error) {
      console.error('Erro ao gerar rota:', error);
      setMensagemBackend('Erro ao gerar rota. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Fazer Rotas</h2>
      <label>Importante coloque cep com formato 00000-000</label>
      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="empresaCep" className="form-label">CEP Empresa</label>
          <input type="text" className="form-control" id="empresaCep" placeholder="CEP Empresa" value={empresaCep} onChange={(e) => setEmpresaCep(e.target.value)} />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="cliente1Nome" className="form-label">Nome Cliente 1</label>
          <input type="text" className="form-control" id="cliente1Nome" placeholder="Nome Cliente 1" value={cliente1Nome} onChange={(e) => setCliente1Nome(e.target.value)} />
        </div>
        <div className="col">
          <label htmlFor="cliente1Cep" className="form-label">CEP Cliente 1</label>
          <input type="text" className="form-control" id="cliente1Cep" placeholder="CEP Cliente 1" value={cliente1Cep} onChange={(e) => setCliente1Cep(e.target.value)} />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="cliente2Nome" className="form-label">Nome Cliente 2</label>
          <input type="text" className="form-control" id="cliente2Nome" placeholder="Nome Cliente 2" value={cliente2Nome} onChange={(e) => setCliente2Nome(e.target.value)} />
        </div>
        <div className="col">
          <label htmlFor="cliente2Cep" className="form-label">CEP Cliente 2</label>
          <input type="text" className="form-control" id="cliente2Cep" placeholder="CEP Cliente 2" value={cliente2Cep} onChange={(e) => setCliente2Cep(e.target.value)} />
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleGerarRota}>Gerar Rota</button>
      {mensagemBackend && (
        <div className="alert alert-primary mt-3" role="alert" style={{ backgroundColor: 'black', color: 'white', maxHeight: '100px', fontSize: '14px', overflowY: 'auto' }}>
          <strong>Mensagem do Backend:</strong>
          <p>{mensagemBackend}</p>
        </div>
      )}
    </div>
  );
}

export default FazerRotas;
