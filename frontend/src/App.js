import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Site from './pages/site/Site';
import NavBarSite from './pages/components/navBar/NavBarSite';
import NavBarAdm from './pages/components/navBar/NavBarAdm';
import NavBarUser from './pages/components/navBar/NavBarUser';


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