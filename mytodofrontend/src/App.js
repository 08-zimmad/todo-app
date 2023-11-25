import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Homepage from './Pages/Homepage';
import PrivateRoute from './utils/PrivateRoute';
import Header from './components/Header'
import { AuthProvider } from './context/AuthContext';
import Register from './Pages/Register'
import Testing from './Pages/Testing';

const App=() =>{





  return (
    <div>
      
    <Router>
      <AuthProvider>
      <Header/>
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route path="/" exact element={<Homepage/>} ></Route>
            </Route>
            <Route path="/login" exact element={<Login/>} ></Route>
            <Route path="/register" exact element={<Register/>} ></Route>
            <Route path="/testing" exact element={<Testing/>} ></Route>
        </Routes>
        </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
