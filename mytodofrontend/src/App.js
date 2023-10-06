import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Homepage from './Pages/Homepage';
import PrivateRoute from './utils/PrivateRoute';
import Header from './components/Header'
import { AuthProvider } from './context/AuthContext';


const App=() =>{
  return (
    <Router>
      <AuthProvider>
      <Header/>
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route path="/" exact element={<Homepage/>} ></Route>
            </Route>
            <Route path="/login" exact element={<Login/>} ></Route>
        </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
