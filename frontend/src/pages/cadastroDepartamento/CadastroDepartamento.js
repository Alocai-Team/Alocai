import Star from '../../assets/star.png';

import '../../styles/Cadastro.css';

export default function CadastroDepartamento() {
  return (
    <div className="mainContainer">

        <div className='pageTitleForm'>
            <img src={Star} alt="" />
        </div>

        <div className="containerForm">   
            <h2 style={{color:'#003366',fontWeight:'bold'}}>Cadastro de Departamentos</h2>
            <form action="" className='formAlocar'>
            <label htmlFor="Area">Área
                    <input type="text" name="Area"/>
                </label>
                <label htmlFor="Nome">Nome
                    <input type="text" name="nome"/>
                </label>
                <label htmlFor="Universidade">Universidade
                    <input type="text" name="Universidade"/>
                </label>
                <label htmlFor="Nsalas">Número de Salas Disponíveis
                    <input type="Number" name="Nsalas"/>
                </label>
                <label htmlFor="Diretor">Diretor do Departamento
                    <input type="text" name="Diretor"/>
                </label>
                <label htmlFor="Descricao">Descrição do Departamento
                    <input type="text" name="Descricao"/>
                </label>
                
              
            </form>

            <button className='button'>Salvar</button>
        </div>
        <h2 style={{color:'#003366',fontWeight:'bold',position:'relative', top:'1.5rem'}}>alocai</h2>
    </div>

  )
}
