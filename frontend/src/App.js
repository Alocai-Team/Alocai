import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';


import NavBarSite from './pages/components/navBar/NavBarSite';
import NavBarAdm from './pages/components/navBar/NavBarAdm';
import NavBarUser from './pages/components/navBar/NavBarUser';
import Site from './pages/site/Site';
import Login from './pages/login/Login';
import CadastroSala from './pages/cadastroSalas/CadastroSala';
import CadastroPredio from './pages/cadastroPredio/CadastroPredio';
import CadastroDepartamento from './pages/cadastroDepartamento/CadastroDepartamento';
import MenuCadastro from './pages/menuCadastro/MenuCadastro';
import Registro from './pages/Registro/Registro';
import Alocar from './pages/alocar/Alocar';
import Calendario from './pages/calendario/Calendario';
import Configuracoes from './pages/configuracoes/Configuracoes';
import SolicitacoesUser from './pages/solicitacoesUser/SolicitacoesUser';
import SolicitacoesAdm from './pages/solicitacoesAdm/SolicitacoesAdm';

function App() {
  const location = useLocation();
  
  // Lógica para decidir qual NavBar mostrar
  const showNavBar = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/Cadastro';
  const isLoggedIn = true;  // Simula que o usuário está logado
  const isAdmin = true;     // Simula que o usuário é admin

  // Função que retorna a NavBar correta
  const getNavBar = () => {
    if (showNavBar) {
      return <NavBarSite />;
    } else if (isLoggedIn && isAdmin) {
      return <NavBarAdm />;
    } else {
      return <NavBarUser />;
    }
  };

  return (
    <div>
      {getNavBar()}  {/* Aqui chamamos a função para renderizar a NavBar correta */}
      <Routes>
        <Route path='/' element={<Site />} />
        <Route path='login' element={<Login />} />
        <Route path='Cadastro' element={<Registro />} />
      
        {isLoggedIn && (
          <>
            <Route path='Calendario' element={<Calendario />} />
            <Route path='Alocar' element={<Alocar />} />
            <Route path='ConfigUsers' element={<Configuracoes />} />
            <Route path = 'SolicitacoesUser' element={<SolicitacoesUser/>} />
            
            {isAdmin && (
              <>
                <Route path='CadastroPred' element={<CadastroPredio />} />
                <Route path='CadastroSala' element={<CadastroSala />} />
                <Route path='CadastroDep' element={<CadastroDepartamento />} />
                <Route path='SolicitacoesAdm' element={<SolicitacoesAdm />} />
                <Route path='MenuCadastro' element={<MenuCadastro />} />
              </>
            )}
          </>
        )}

        {/* Redirecionar usuários não autenticados para login */}
        <Route path='*' element={<Navigate to={isLoggedIn ? '/' : '/login'} />} />
      </Routes>
    </div>
  );
}


function MainApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default MainApp;