import { Link } from 'react-router-dom'
import Star from '../../assets/star.png';
import '../../styles/Cadastro.css';

export default function MenuCadastro() {
  return (
    <div className="mainContainer">

        <div className='pageTitleForm'>
            <img src={Star} alt="" />
        </div>

        <div className="containerForm">   
            <h2 style={{color:'#003366',fontWeight:'bold'}}>O que você deseja cadastrar?</h2>


            <Link to='/CadastroDep' className='menuCadBtn'> Departamento</Link>
            <Link to='/CadastroPred' className='menuCadBtn'> Prédio</Link>
            <Link to='/CadastroSala' className='menuCadBtn'> Sala</Link>
            
        </div>
        <h2 style={{color:'#003366',fontWeight:'bold',position:'relative', top:'1.5rem'}}>alocai</h2>
    </div>
  )
}