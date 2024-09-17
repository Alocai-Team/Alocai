import {Link} from 'react-router-dom';

import Star from '../../assets/star.png';
import WomanLogin from '../../assets/woman.png';
import '../../styles/Login.css';

export default function Login() {

  const WomanLoginImg ={
    position:'relative',
    top:'5rem',
    height:'30rem'
  }

  return (
    <div className="containerLogin">
      
      <div className='pageTitleLogin'>
          <h2 style={{color:'#003366',fontWeight:'bold'}}>Login</h2>
          <img src={Star} alt="" />
      </div>
      <div className="form-containerLogin">
        <img src={WomanLogin} style={WomanLoginImg} alt="" />
        <div className="info">
          <img src="" alt="" />
          <h2>Seja</h2>
          <h2 style={{color:'#003366',fontWeight:'bold'}}>Bem-Vindo</h2>
        </div>

        <form  className='form'>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" />
          <label htmlFor="password">Password</label>
          <div className='password-container'><input type="password" id="password"  /></div>

          <div className="btn-containerLogin">
            <Link to='/Alocar' className='btn'>Entrar</Link>
            <p>Ainda não possui conta? <span style={{color:'#003366',fontWeight:'bold', cursor:'pointer'}}>Cadastrar</span></p>
          </div>
        </form>
      </div>

      <h2 style={{color:'#003366',fontWeight:'bold',position:'relative', top:'1.5rem'}}>alocai</h2>
    </div>
  )
}
