import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "../features/auth/Login";
import Dashboard from "../features/dashboard/Dashboard";
import SignUp from '../features/auth/SignUp';
import Users from "../features/users/Users";
import { useAuth } from "../hooks/useAuth";
import Layout from '../layouts/Layout';
import Products from '../features/products/Products';
import NewProduct from '../features/products/NewProduct';
import Lotes from '../features/lotes/Lotes';
import NewLote from '../features/lotes/NewLote';

const AppRouter = () => {

    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>

            <Route path="/" element={isAuthenticated ? <Layout/> : <Navigate to="/login"/>}>
                <Route path="/dashboard" element={ <Dashboard/>}/>
                <Route path="/users" element={ <Users/>}/>
                <Route path='/products' element={<Products/>}/>
                <Route path="/products/new" element={<NewProduct/>}/>
                <Route path="/products/edit/:id" element={<NewProduct/>}/>
                <Route path="/lotes" element={<Lotes/>}/>
                <Route path="/lotes/new" element={<NewLote/>}/>
            </Route>
            
            <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
    );


}

export default AppRouter;