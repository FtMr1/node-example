
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/Register';
import LoginPage from './components/LoginPage';
import UserLogin from './components/UserLogin';
import AdminPanel from './components/AdminPanel';

function App() {
 

  return (
        <Router>
            <Routes>
                <Route path="/" element={<RegisterForm/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/userLogin" element={<UserLogin/>}/>
                <Route path="/admin" element={<AdminPanel/>}/>
            </Routes>
        </Router>
  )
}

export default App
