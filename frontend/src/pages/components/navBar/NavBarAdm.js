import Logo from '../../../assets/alocaiLogo.png'
import {Link} from 'react-router-dom'
import { TiHomeOutline } from "react-icons/ti";
import { PiBookmarkBold } from "react-icons/pi";
import { GrConfigure } from "react-icons/gr";
import { MdExitToApp } from "react-icons/md";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

export default function NavBarAdm() {
  return (
    <div className='headerContainer'>
        <nav className='header'>
            <img src={Logo} className='logo' alt="Logo Empresa " />
            <ul className='linkContainer'>
                <Link to='/Calendario' className='linkLogado'> <TiHomeOutline className='iconNavBarLogado'/> Home</Link>
                <Link to='/Alocar' className='linkLogado'><PiBookmarkBold className='iconNavBarLogado'/> Alocar</Link>
                <Link to='/SolicitacoesAdm' className='linkLogado'><HiOutlineClipboardDocumentCheck className='iconNavBarLogado'/> Solicitações</Link>
                <Link to='/MenuCadastro' className='linkLogado'> <GrConfigure className='iconNavBarLogado'/> Configurações</Link>
                <Link to='/' className='linkLogado'><MdExitToApp className='iconNavBarLogado'/> Sair</Link>
            </ul>
        </nav>
    </div>
  )
}