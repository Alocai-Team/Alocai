import React, { useEffect, useState } from 'react';
import Star from '../../assets/star.png';
import '../../styles/Solicitacoes.css';

export default function SolicitacoesAdm() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [predios, setPredios] = useState([]);
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/solicitacoes/');
        const data = await response.json();
        setSolicitacoes(data);
      } catch (error) {
        console.error('Erro ao carregar solicitações:', error);
      }
    };

    const fetchPredios = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/predios/');
        const data = await response.json();
        setPredios(data);
      } catch (error) {
        console.error('Erro ao carregar departamentos:', error);
      }
    };

    const fetchSalas = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/salas/');
        const data = await response.json();
        setSalas(data);
      } catch (error) {
        console.error('Erro ao carregar salas:', error);
      }
    };

    fetchSolicitacoes();
    fetchPredios();
    fetchSalas();
  }, []);

  const atualizarStatus = async (id, novoStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/api/solicitacoes/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: novoStatus }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar status');

      // Atualiza a lista de solicitações após a alteração
      const updatedSolicitacoes = solicitacoes.map(solicitacao =>
        solicitacao.id === id ? { ...solicitacao, status: novoStatus } : solicitacao
      );
      setSolicitacoes(updatedSolicitacoes);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  // Função para obter o nome do departamento pelo ID
  const getPredioNome = (id) => {
    const predio = predios.find(pred => pred.id === id);
    return predio ? predio.nome : 'N/A';
  };

  // Função para obter o número da sala pelo ID
  const getSalaNumero = (id) => {
    const sala = salas.find(sala => sala.id === id);
    return sala ? sala.numero : 'N/A';
  };

  return (
    <div className="mainContainer">
      <div className="pageTitleForm">
        <img src={Star} alt="Estrela" />
      </div>

      <div className="containerForm">
        <h2>Gerenciamento de Solicitações</h2>

        <div className="solicitacoesContainer">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>ID da Solicitação</th>
                <th>Data de Início</th>
                <th>Data de Término</th>
                <th>Número da Sala</th>
                <th>Nome do Prédio</th>
                <th>Universidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {solicitacoes.length > 0 ? (
                solicitacoes.map(solicitacao => (
                  <tr key={solicitacao.id}>
                    <td>{solicitacao.status}</td>
                    <td>{solicitacao.id}</td>
                    <td>{new Date(solicitacao.datahora_inicio).toLocaleDateString()}</td>
                    <td>{new Date(solicitacao.datahora_fim).toLocaleDateString()}</td>
                    <td>{getSalaNumero(solicitacao.sala)}</td> {/* Número da Sala */}
                    <td>{getPredioNome(solicitacao.predio)}</td> {/* Nome do Departamento */}
                    <td>{solicitacao.universidade}</td>
                    <td>
                      <button
                        className="btn-aceitar"
                        onClick={() => atualizarStatus(solicitacao.id, 'Aprovado')}
                      >
                        Aceitar
                      </button>
                      <button
                        className="btn-negar"
                        onClick={() => atualizarStatus(solicitacao.id, 'Rejeitado')}
                      >
                        Negar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">Nenhuma solicitação encontrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
