import { TbAsterisk } from 'react-icons/tb'
import geometricForm from '../../../assets/geometricForm.png'
import womanSite from '../../../assets/womanSite.png'
import womanSite from 
import './Solucao.css'


export default function Solucao() {
    return (
      <section className="solucao">
        <div className="header-solucao">
            <img src={geometricForm} />
            
            <div className="header-info">
            <hr style={{backgroundColor:'#033567', width:'10rem',height:'.3rem', borderRadius:'5px'}} />
            <h3>Solução</h3>
            <p>Entenda como a <span className='span'>alocai</span> pode <span className='span'>solucionar</span> seus problemas</p>
          </div>
  
        </div>
  
        <div className="content">
          <div className="info-content">
            <p>
              <span className='span'>alocai</span> tem o propósito de facilitar o trabalho de alocação e de democratizar o acesso aos espaços presentes nos centros acadêmicos tornando o processo cada vez mais transparente.
            </p>
  
            <ul>
              <li type = 'none'>
                <TbAsterisk style={{color:'lightblue'}}/> Quer <span className='span'>achar</span> suas salas de aula?
              </li>
  
              <li type = 'none'>
                <TbAsterisk style={{color:'lightblue'}}/> Gostaria de <span className='span'>saber</span> onde irá dar aula?
              </li>
  
              <li type = 'none'>
                <TbAsterisk style={{color:'lightblue'}}/> Pretende <span className='span'>reservar</span> uma sala
              </li>
             
              <li type = 'none'>
                <TbAsterisk style={{color:'lightblue'}}/> Deseja<span className='span'> alocar</span> salas em seu departamento?
              </li>
            </ul>
  
            <h3>Estamos aqui para <span className="span">resolver</span> seus problemas!</h3>
          </div>
  
          <img src={womanSite}  style={{height:'35rem'}}/>
        </div>            
      </section>
    )
  }


