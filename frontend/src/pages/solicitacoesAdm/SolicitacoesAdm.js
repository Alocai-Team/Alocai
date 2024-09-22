import React, { useState, useEffect } from 'react';
import Star from '../../assets/star.png';
import '../../styles/Solicitacoes.css';

export default function SolicitacoesAdm() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/solicitacoes/');
        if (!response.ok) throw new Error('Erro ao buscar solicitações');
        
        const data = await response.json();
        setSolicitacoes(data); // Atualiza o estado com as solicitações recebidas
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar solicitações:', error);
        setIsLoading(false);
      }
    };

    fetchSolicitacoes();
  }, []);

  return (
    <div className="mainContainer">
      <div className="pageTitleForm">
        <img src={Star} alt="Estrela" />
      </div>

      <div className="containerForm">
        <h2>Gerenciamento de Solicitações</h2>

        <div className="solicitacoesContainer">
          {isLoading ? (
            <p>Carregando solicitações...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>ID da Solicitação</th>
                  <th>Data Início</th>
                  <th>Data Fim</th>
                  <th>Sala</th>
                  <th>Departamento</th>
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
                      <td>{solicitacao.sala.numero}</td>
                      <td>{solicitacao.departamento.nome}</td>
                      <td>{solicitacao.universidade}</td>
                      <td>
                        <button className="btn-aceitar">Aceitar</button>
                        <button className="btn-negar">Negar</button>
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
          )}
        </div>
      </div>
    </div>
  );
}
