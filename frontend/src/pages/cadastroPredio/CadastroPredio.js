import Star from '../../assets/star.png';

import '../../styles/Cadastro.css';

export default function CadastroPredio() {
  return (
    <div className="mainContainer">

        <div className='pageTitleForm'>
            <img src={Star} alt="" />
        </div>

        <div className="containerForm">   
            <h2>Cadastro de Prédios</h2>
            <form action="" className='formAlocar'>
                <label htmlFor="Nome">Nome
                    <input type="text" name="nome"/>
                </label>
                <label htmlFor="Universidade">Universidade
                    <input type="text" name="Universidade"/>
                </label>
                <label htmlFor="Logradouro">Logradouro
                    <input type="text" name="Logradouro"/>
                </label>
                <label htmlFor="Cidade">Cidade
                    <input type="text" name="Cidade"/>
                </label>
                <label htmlFor="CEP">CEP
                    <input type="text" name="CEP"/>
                </label>
                <label htmlFor="Estado">Estado
                    <input type="text" name="Estado"/>
                </label>
            </form>

            <button className='button'>Salvar</button>
        </div>
        <h2 style={{color:'#003366',fontWeight:'bold',position:'relative', top:'1.5rem'}}>alocai</h2>
    </div>

  )
}
