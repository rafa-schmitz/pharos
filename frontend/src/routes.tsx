import React, { useLayoutEffect } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/Signup';
import { Jobs } from './pages/Jobs';
import { Profile } from './pages/Profile';
import { useAuth } from './context/AuthContext';
import { JobCreation } from './pages/JobCreation';
import { Job } from "./pages/Job";
import { useNavigate } from "react-router-dom";
import { ProfileByUserId } from './pages/Profile/components/ProfileByUserId';

interface IPrivateRoute {
  children: React.ReactElement
}

const PrivateRoute = ({ children }: IPrivateRoute) => {
  const { isAuthenticated, setLoading } = useAuth()
  const navigate = useNavigate()
  useLayoutEffect(() => {
    if (!isAuthenticated) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        navigate("/login")
      }, 1000)
      return
    }
  }, [isAuthenticated])
  return children
}

const loadTitle = (title: string) => document.title = title;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => loadTitle('Home')
      },
      {
        path: "/login",
        element: <Login />,
        loader: () => loadTitle('Login')
      },
      {
        path: "/signup",
        element: <SignUp />,
        loader: () => loadTitle('Cadastro')
      },
      {
        path: "/jobs",
        element: <Jobs />,
        loader: () => loadTitle('Vagas')
      },
      {
        path: "/jobs/creation",
        element: <PrivateRoute><JobCreation /></PrivateRoute>,
        loader: () => loadTitle('Criar vaga')
      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
        loader: () => loadTitle('Perfil')
      },
      {
        path: "/job/:id",
        element: <Job />,
        loader: () => loadTitle('Vaga')
      },
      {
        path: "profile/user/:id",
        element: <ProfileByUserId />,
        loader: () => loadTitle('Perfil')
      },
    ]
  }
]);
