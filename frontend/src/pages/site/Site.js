import Welcome from '../components/welcome/Welcome';
import Solucao from '../components/solucao/Solucao';
import Equipe from '../components/equipe/Equipe';
import Footer from '../components/footer/Footer';

import '../../styles/Site.css'


export default function Home() {
  return (
    <div className="mainpage-container">
      <Welcome />
      <Solucao />
      <Equipe />
      <Footer />
    </div>
  )
}
