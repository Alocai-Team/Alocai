import Star from '../../assets/star.png';

import '../../styles/Solicitacoes.css';

export default function SolicitacoesAdm() {

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
                <th>Data</th>
                <th>Sala</th>
                <th>Departamento</th>
                <th>Universidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Em análise</td>
                <td>4683648</td>
                <td>01/02/03</td>
                <td>Sala 05</td>
                <td>DC</td>
                <td>UFRPE</td>
                <td>
                  <button className="btn-aceitar">Aceitar</button>
                  <button className="btn-negar">Negar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h2 style={{ color: '#003366', fontWeight: 'bold', position: 'relative', top: '1.5rem' }}>alocai</h2>
    </div>
  );
}