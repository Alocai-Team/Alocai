import manSite from '../../../assets/manSite.png'
import './Welcome.css'



export default function Welcome() {
    return (
      <section className='home'>
          <div className='item-container'>
              <h1 className='home-title home-item' >alocai</h1>
              <h2 className='home-item' >Praticidade. Organização.</h2>
              <p className='home-item' >Confira, aloque e solicite espaços da sua universidade com apenas alguns cliques.</p>
          </div>
          <img src={manSite}  />     
      </section>
    )
  }