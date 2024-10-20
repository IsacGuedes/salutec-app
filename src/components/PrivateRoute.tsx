import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('token');

  // Verifica se o token é undefined ou null. Se for, redireciona para a página de login.
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Se o token existir, renderiza o componente filho
  return children;
};

export default PrivateRoute;
