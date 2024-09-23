import React, { useEffect, useState } from 'react';
import Star from '../../assets/star.png';
import '../../styles/Solicitacoes.css';

export default function SolicitacoesUser() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const userId = localStorage.getItem('userId'); // Obtendo o userId do localStorage
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
  useEffect(() => {
    // Fazendo a requisição para buscar todas as solicitações
    fetch('http://localhost:8000/api/solicitacoes/')
      .then((response) => response.json())
      .then((data) => {
        // Filtrando as solicitações pelo userId
        const filteredSolicitacoes = data.filter(solicitacao => solicitacao.id_usuario == userId);
        setSolicitacoes(filteredSolicitacoes); // Armazenando as solicitações filtradas no estado
      })
      .catch((error) => {
        console.error('Erro ao buscar as solicitações:', error);
      });
  }, [userId]);

  const formatarStatus = (status) => {
    switch (status) {
      case 'aprovado':
        return 'Aprovado';
      case 'rejeitado':
        return 'Rejeitado';
      default:
        return 'Em Análise';
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
      <div className='pageTitleForm'>
        <img src={Star} alt="" />
      </div>

      <div className="containerForm">
        <h2>Suas solicitações</h2>
        <div className='solicitacoesContainer'>
          <table>
            <thead>
              <tr>
                <th>ID do Usuário</th>
                <th>Data de Início</th>
                <th>Data de Término</th>
                <th>Número da Sala</th>
                <th>Nome do Prédio</th>
                <th>Universidade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {solicitacoes.length > 0 ? (
                solicitacoes.map((solicitacao) => (
                  <tr key={solicitacao.id}>
                    <td>{solicitacao.id_usuario}</td>
                    <td>{new Date(solicitacao.datahora_inicio).toLocaleDateString()}</td>
                    <td>{new Date(solicitacao.datahora_fim).toLocaleDateString()}</td>
                    <td>{getSalaNumero(solicitacao.sala)}</td> {/* Número da Sala */}
                    <td>{getPredioNome(solicitacao.predio)}</td>
                    <td>{solicitacao.universidade}</td>
                    <td>{formatarStatus(solicitacao.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Nenhuma solicitação encontrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <h2 style={{ color: '#003366', fontWeight: 'bold', position: 'relative', top: '1.5rem' }}>alocai</h2>
    </div>
  );
}
