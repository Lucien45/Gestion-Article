import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import { ToastContainer } from 'react-bootstrap';
import AuthRoute from './routes/AuthRoute';
import AppRoute from './routes/AppRoute';
import { isAuthenticated } from './context/AuthContext';

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <BrowserRouter>
      {loading && <LoadingSpinner/>}
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path='/' element={
          isAuthenticated() ? <Navigate to="/admin" replace /> : <AuthRoute setLoading={setLoading}/>
        }/>
        <Route path='/admin/*' element={<AppRoute setLoading={setLoading}/>}/>
        <Route path='*' element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
