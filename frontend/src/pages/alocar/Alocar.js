import Star from '../../assets/star.png';

import '../../styles/Alocar.css';

export default function Alocar() {
  return (
    <div className="mainContainer">

        <div className='pageTitleForm'>
            <img src={Star} alt="" />
        </div>

        <div className="containerForm">   
            <h2 style={{color:'#003366',fontWeight:'bold'}}>Qual sala você deseja alocar?</h2>
            <form  className='formAlocar'>
                <label htmlFor="universidade">Universidade
                    <select id="universidade" >
                        <option value="">Selecione...</option>
                        <option value="opcao1">Opção 1</option>
                        <option value="opcao2">Opção 2</option>
                        <option value="opcao3">Opção 3</option>
                    </select>
                </label>
    
                <label htmlFor="departamento">Predio
                    <select id="departamento" >
                        <option value="">Selecione...</option>
                        <option value="opcao1">Opção 1</option>
                        <option value="opcao2">Opção 2</option>
                        <option value="opcao3">Opção 3</option>
                    </select>
                </label>

                <label htmlFor="Campus">Campus
                    <select id="Campus" >
                        <option value="">Selecione...</option>
                        <option value="opcao1">Opção 1</option>
                        <option value="opcao2">Opção 2</option>
                        <option value="opcao3">Opção 3</option>
                    </select>
                </label>

                <label htmlFor="sala">Sala
                    <select id="sala" >
                        <option value="">Selecione...</option>
                        <option value="opcao1">Opção 1</option>
                        <option value="opcao2">Opção 2</option>
                        <option value="opcao3">Opção 3</option>
                    </select>
                </label>

                <label htmlFor="turno">Turno
                    <select id="turno" >
                        <option value="">Selecione...</option>
                        <option value="opcao1">Manhã</option>
                        <option value="opcao2">Tarde</option>
                        <option value="opcao3">Noite</option>
                    </select>
                </label>

                <label htmlFor="data">Data
                    <input type="date" name="" id="data" />
                </label>
            </form>
            <button className='button'>Alocai!</button>
        </div>
        <h2 style={{color:'#003366',fontWeight:'bold',position:'relative', top:'1.5rem'}}>alocai</h2>
    </div>
  )
}
