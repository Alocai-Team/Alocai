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
        <Route path='cadastroSala' element={<CadastroSala />} />
        <Route path='cadastroPredio' element={<CadastroPredio />} />
        <Route path='cadastroDepartamento' element={<CadastroDepartamento />} />
        <Route path='menuCadastro' element={<MenuCadastro/>} />
        <Route path='registro' element={<Registro/>} />
        <Route path='alocar' element={<Alocar/>} />
        <Route path='calendario' element={<Calendario/>} />
       
        

        {isLoggedIn && (
          <>
            {isAdmin && (
              <>

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