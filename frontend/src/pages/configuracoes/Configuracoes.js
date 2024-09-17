import Star from '../../assets/star.png';

import '../../styles/Cadastro.css';

export default function Configuracoes() {
  return (
    <div className="mainContainer">

        <div className='pageTitleForm'>
            <img src={Star} alt="" />
        </div>

        <div className="containerForm">   
            <h2 style={{color:'#003366',fontWeight:'bold'}}>Edite Suas Configurações!</h2>
            <form action="" className='formAlocar'>
                <label htmlFor="Nome">Nome
                    <input type="text" name="nome"/>
                </label>
                <label htmlFor="Senha">Senha
                    <input type="password" name="Senha"/>
                </label>
                <label htmlFor="Email">Email
                    <input type="text" name="Email"/>
                </label>
                <label htmlFor="ConfSenha">Confirmar Senha
                    <input type="text" name="ConfSenha"/>
                </label>
            </form>

            <button className='button'>Salvar</button>
        </div>
        <h2 style={{color:'#003366',fontWeight:'bold',position:'relative', top:'1.5rem'}}>alocai</h2>
    </div>
  )
}
