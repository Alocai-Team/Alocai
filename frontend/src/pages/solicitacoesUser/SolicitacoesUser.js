import Star from '../../assets/star.png';

import '../../styles/Solicitacoes.css';


export default function SolicitacoesUser() {

  return (
    <div className="mainContainer">

    <div className='pageTitleForm'>
        <img src={Star} alt="" />
    </div>

    <div className="containerForm">   
        <h2>Suas solicitações </h2>

        <div className='solicitacoesContainer'>
            <table>
                <tr>
                    <th>Status</th>
                    <th>ID da Solicitação</th>
                    <th>Data</th>
                    <th>Sala</th>
                    <th>Departamento</th>
                    <th>Universidade</th>
                </tr>
                <tr>
                    <td>Em análise</td>
                    <td>4683648</td>
                    <td>01/02/03</td>
                    <td>Sala 05</td>
                    <td>DC</td>
                    <td>UFRPE</td>
                </tr>
            </table>
        </div>
        
        
    </div>
    <h2 style={{color:'#003366',fontWeight:'bold',position:'relative', top:'1.5rem'}}>alocai</h2>
</div>
  )
}