import Star from '../../assets/star.png';

import '../../styles/Cadastro.css';

export default function CadastroSala() {
  return (
    <div className="mainContainer">

        <div className='pageTitleForm'>
            <img src={Star} alt="" />
        </div>

        <div className="containerForm">   
            <h2 style={{color:'#003366',fontWeight:'bold'}}>Cadastro de Salas</h2>
            <form action="" className='formAlocar'>
                <label htmlFor="NomeSala">Nome da Sala
                    <input type="text" name="NomeSala"/>
                </label>
                <label htmlFor="NumAssentos">Número de Assentos Disponíveis
                    <input type="number" name="NumAssentos"/>
                </label>
                <label htmlFor="IdSala">ID da Sala
                    <input type="text" name="IdSala"/>
                </label>
                <label htmlFor="Departamento">Departamento
                    <input type="text" name="Departamento"/>
                </label>
                <label htmlFor="TipoSala">Tipo da Sala
                    <input type="text" name="TipoSala"/>
                </label>
                <label htmlFor="Universidade">Universidade
                    <input type="text" name="Universidade"/>
                </label>
                <label htmlFor="RecursosSala">Recursos da Sala
                    <input type="text" name="RecursosSala"/>
                </label>
                <label htmlFor="DescricaoSala">Descrição da Sala
                    <input type="text" name="DescricaoSala"/>
                </label>       
            </form>

            <button className='button'>Salvar</button>
        </div>
        <h2 style={{color:'#003366',fontWeight:'bold',position:'relative', top:'1.5rem'}}>alocai</h2>
    </div>

  )
}
