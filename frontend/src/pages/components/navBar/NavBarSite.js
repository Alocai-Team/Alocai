import Logo from '../../../assets/alocaiLogo.png'
import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className='header'>
      <div className='alocai'>
        <img src={Logo} className='logo' alt="Logo Empresa" />
      </div>

      <div className='buttonsCenter'>
        <Link to='/Solucao' className='linkButton'>Solução</Link>
        <Link to='/Equipe' className='linkButton'>Equipe</Link>
      </div>

      <div className='buttonsRight'>
        <Link to='/login' className='linkButton'>Logar</Link>
        <Link to='/Cadastro' className='commonButton'>Cadastre-se</Link>
      </div>
    </nav>
  )
}
