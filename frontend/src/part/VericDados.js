import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  AiOutlineDelete, AiOutlineSearch } from 'react-icons/ai'; 

function VerificarDados() {
    
    const [clientes, setClientes] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);


    useEffect(() => {
        fetchClientes();
    }, []);

    // Get client
    const fetchClientes = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/checkdata');
            const data = await response.json();
            setClientes(data);
            console.log('Dados do backend:', data);
        } catch (error) {
            console.error('Erro ao buscar dados do backend:', error);
        }
    };

    // delete user
    const handleApagar = async (id) => {
        console.log('Apagar cliente com ID:', id);
        try {
            await fetch(`http://localhost:3001/api/deletedata/${id}`, {
                method: 'DELETE'
            });
            // Update cliente 
            fetchClientes();
        } catch (error) {
            console.error('Erro ao apagar cliente:', error);
        }
    };

   
    const handleEditar = (cliente) => {
        console.log('Editar cliente com ID:', cliente.id);
        setSelectedClient(cliente);
    };

    // close o modal
    const handleCloseModal = () => {
        setSelectedClient(null);
    };

    const renderPopoverContent = (cliente) => {
        if (cliente !== null) {
            return (
                <div>
                    <p>Nome: {cliente.nome}</p>
                    <p>Telefone: {cliente.telefone}</p>
                    <p>Email: {cliente.email}</p>
                    <p>CEP: {cliente.cep}</p>
                </div>
            );
        } else {
            return <p>Cliente não encontrado.</p>;
        }
    };

    return (
        <div className="container mt-5">
            {/* Título da página */}
            <h2 className="text-center mb-4">Verificar Dados</h2>

            {/* Lista de clientes com barra de rolagem */}
            <div className="row">
                <div className="col" style={{ maxHeight: '300px', overflowY: 'auto' }}> 
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Email</th>
                                <th scope="col">CEP</th>
                                <th scope="col">Ações</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {/* Maps client */}
                            {clientes.map(cliente => (
                                <tr key={cliente.id}>
                                    <th scope="row">{cliente.id}</th>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.cep}</td>
                                    <td>
                                        
                                        <button className="btn btn-outline-primary me-2" onClick={() => handleEditar(cliente)}>
                                            <AiOutlineSearch />
                                        </button>
                                       
                                        <button className="btn btn-outline-danger" onClick={() => handleApagar(cliente.id)}>
                                            <AiOutlineDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {selectedClient && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalhes do Cliente .......................</h5>
                                <button type="button" className="close" aria-label="Close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {renderPopoverContent(selectedClient)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VerificarDados;
