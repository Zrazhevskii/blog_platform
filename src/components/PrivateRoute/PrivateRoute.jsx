import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
    const inAccount = useSelector((state) => state.articles.inAccount);
    return inAccount ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
