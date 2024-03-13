import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CadastroUsuario from './part/CadastPage';
import VerificarDados from './part/VericDados';
import CalcularRotas from './part/CalcRotas';
import FazerRotas from './part/FazerRota';
import EditarUsuario from './part/EditarUser'; // Importe o componente de edição de usuário

function App() {
  // State para armazenar o conteúdo dinâmico e controle de visibilidade
  // eslint-disable-next-line
  const [content, setContent] = useState('Conteúdo inicial');
  const [showCadastro, setShowCadastro] = useState(false);
  const [showVerificarDados, setShowVerificarDados] = useState(false);
  const [showCalcularRotas, setShowCalcularRotas] = useState(false);
  const [showFazerRotas, setShowFazerRotas] = useState(false);
  const [showEditarUsuario, setShowEditarUsuario] = useState(false); // Adicione o estado para a página de Edição de Usuário

  // Funções para manipular o conteúdo ao clicar nos botões
  const handleCadastro = () => {
    setContent('Cadastro de Dados');
    setShowCadastro(true);
    setShowVerificarDados(false);
    setShowCalcularRotas(false);
    setShowFazerRotas(false);
    setShowEditarUsuario(false); // Certifique-se de ocultar a página de Edição de Usuário ao clicar no botão Cadastro Dados
  }

  const handleVerificar = () => {
    setContent('Verificar Dados');
    setShowCadastro(false);
    setShowVerificarDados(true);
    setShowCalcularRotas(false);
    setShowFazerRotas(false);
    setShowEditarUsuario(false); // Ocultar a página de Edição de Usuário ao clicar no botão Verificar Dados
  }

  const handleCalcularRotas = () => {
    setContent('Calcular Rotas');
    setShowCadastro(false);
    setShowVerificarDados(false);
    setShowCalcularRotas(true);
    setShowFazerRotas(false);
    setShowEditarUsuario(false); // Ocultar a página de Edição de Usuário ao clicar no botão Calcular Rotas
  }

  const handleFazerRotas = () => {
    setContent('Fazer Rotas');
    setShowCadastro(false);
    setShowVerificarDados(false);
    setShowCalcularRotas(false);
    setShowFazerRotas(true);
    setShowEditarUsuario(false); // Ocultar a página de Edição de Usuário ao clicar no botão Fazer Rotas
  }

  const handleEditarUsuario = () => {
    setContent('Editar Usuário');
    setShowCadastro(false);
    setShowVerificarDados(false);
    setShowCalcularRotas(false);
    setShowFazerRotas(false);
    setShowEditarUsuario(true); // Exibir a página de Edição de Usuário ao clicar no botão Editar Usuário
  }

  return (
    <div className="container mt-5">
      {/* Layout dividido em três partes */}
      <div className="row">
        {/* Área de mensagens no topo */}
        <div className="col-md-12">
          <div className="alert alert-primary text-center" role="alert">
            <p>Cleaning Company</p>
            <p>Facilita Jurídico | Erasmo Cardoso</p>
          </div>
        </div>
      </div>

      {/* Layout dividido em três partes */}
      <div className="row">
        {/* Botões à esquerda */}
        <div className="col-md-3">
          <div className="d-flex flex-column" style={{ maxHeight: '400px' }}>
            <button className="btn btn-primary flex-fill mb-2" onClick={handleCadastro}>Cadastro Dados</button>
            <button className="btn btn-primary flex-fill mb-2" onClick={handleVerificar}>Verificar Dados</button>
            <button className="btn btn-primary flex-fill mb-2" onClick={handleEditarUsuario}>Editar Usuário</button>    
            <button className="btn btn-primary flex-fill mb-2" onClick={handleCalcularRotas}>Calcular Rotas</button>
            <button className="btn btn-primary flex-fill mb-2" onClick={handleFazerRotas}>Fazer Rotas</button>
             {/* Adicione um botão para a página de Edição de Usuário */}
          </div>
        </div>

        {/* Conteúdo dinâmico no meio */}
        <div className="col-md-9">
          <div className="d-flex justify-content-center align-items-center" style={{ maxHeight: '400px' }}>
            {showCadastro && <CadastroUsuario />}
            {showVerificarDados && <VerificarDados />}
            {showCalcularRotas && <CalcularRotas />}
            {showFazerRotas && <FazerRotas />}
            {showEditarUsuario && <EditarUsuario />} {/* Renderizar a página de Edição de Usuário quando showEditarUsuario for true */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
