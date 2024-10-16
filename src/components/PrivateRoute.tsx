import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const token = localStorage.getItem('token');

  // Verifica se o token é undefined ou null. Se for, redireciona para a página de login.
  if (token === null || token === undefined) {
    return <Navigate to="/login" />;
  }

  // Se o token existir, renderiza o componente
  return <>{element}</>;
};

export default PrivateRoute;
