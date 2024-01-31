import './App.css';
import { AuthProvider } from './context/AuthContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
function App() {
  const { pathname } = useLocation()

  return (
      <AuthProvider>
        {pathname === '/login' || pathname === '/signup'
          ?
          <Outlet />
          :
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
        }
      </AuthProvider>
  );
}

export default App;
