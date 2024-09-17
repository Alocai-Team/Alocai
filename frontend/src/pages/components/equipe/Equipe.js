import Louise from '../../../assets/louise.png'
import Rodrigo from '../../../assets/rodrigo.png'
import Rafael from '../../../assets/rafael.png'
import Thiago from '../../../assets/thiago.png'
import Bruno from '../../../assets/bruno.png'
import Vinicius from '../../../assets/vinicius.png'
import Vector from '../../../assets/vector.png'
import './Equipe.css'



export default function Equipe() {
    return (
  
      <section className="equipe">
        <div className="equipe-header">
          <div className="equipe-info">
            <hr style={{backgroundColor:'#033567', width:'10rem',height:'.3rem', borderRadius:'5px'}}/>
            <h3>Equipe</h3>
            <p>Conheça um pouco nosso <span className='span'>Time!</span></p>
          </div>
  
          <img src={Vector}  />
        </div>   
        
        <div className="equipe-content">
          <div className='pessoa'>
            <img src={Rodrigo}  className='pessoa-img'/>
            <p>Rodrigo</p>
          </div>
  
          <div className='pessoa'>
            <img src={Thiago} className='pessoa-img' />
            <p>Thiago</p>
          </div>
  
           <div className='pessoa'>
            <img src={Louise} className='pessoa-img' />
            <p>Louise</p>
          </div>
  
          <div className='pessoa'>
            <img src={Rafael} className='pessoa-img'/>
            <p>Rafael</p>
          </div>
  
          <div className='pessoa'>
            <img src={Bruno} className='pessoa-img'/>
            <p>Bruno</p>
          </div>
  
          <div className='pessoa'>
            <img src={Vinicius} className='pessoa-img' />
            <p>Vinicius</p>
          </div>
        </div>
      </section>
    )
  }
  