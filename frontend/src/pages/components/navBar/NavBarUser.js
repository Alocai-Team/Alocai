import Logo from '../../../assets/alocaiLogo.png'
import {Link, useNavigate} from 'react-router-dom'
import { TiHomeOutline } from "react-icons/ti";
import { FaGear } from "react-icons/fa6";
import { PiBookmarkBold } from "react-icons/pi";
import { MdExitToApp } from "react-icons/md";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { RiArrowGoBackFill } from "react-icons/ri";


import './NavBarUser.css'

export default function NavBarUser() {

  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1); // -1 faz voltar à página anterior
  };

  return (
    <div className='headerContainer'>
       <nav className='header'>
          <img src={Logo} className='logo' alt="Logo Empresa " />
          <ul className='linkContainer'>
              <Link to='/Calendario' className='linkLogado'> <TiHomeOutline className='iconNavBarLogado'/> Home</Link>
              <Link to='/Alocar' className='linkLogado'><PiBookmarkBold className='iconNavBarLogado'/> Alocar</Link>
              <Link to='/SolicitacoesUser' className='linkLogado'><HiOutlineClipboardDocumentCheck className='iconNavBarLogado'/> Solicitações</Link>
              <Link to='/ConfigUsers' className='linkLogado'> <FaGear className='iconNavBarLogado'/> Configurações</Link>
              <Link to='#' onClick={handleBack} className='linkLogado'><RiArrowGoBackFill className='iconNavBarLogado'/> Voltar</Link>
              <Link to='/' className='linkLogado'><MdExitToApp className='iconNavBarLogado'/> Sair</Link>
          </ul>
          <div></div>
      </nav>
    </div>
  )}
