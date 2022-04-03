import axios from 'axios';
import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserContext } from './context/UserContext';
import Header1 from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Footer from './Components/Footer/Footer';
import Questions from './Components/QuesitonsP/Questions';
import Que from '../src/Components/Question/Que'
import DashBoard from './Pages/Dashboard/DashBoard'
import Ans from './Components/Answer/Ans'
function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem('auth.token');
    if (token === null) {
      localStorage.setItem('auth-token', '');
      token = '';
    } else {
      const userRes = await axios.get('http://localhost:4000/api/users', {
        headers: { 'x-auth-token': token }
      });

      setUserData({
        token,
        user:userRes.data
      })
    }
  }
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };
  useEffect(() => {
   checkLoggedIn();
  }, []);
  return (
    <Router>
         <Header1 logout={logout}/>
        <Routes>
          <Route path="/signup" element={<SignUp /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home logout={logout}/>} />
        </Routes>
        <Ans/>
        <Footer/>
    </Router>
   

 
  )
}
export default App;
