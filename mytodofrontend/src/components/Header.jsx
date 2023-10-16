import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const Header=()=>{
    let {user,Logout}=useContext(AuthContext)
    return(
        <div>
        {user && <Link to='/'>Home <span> | </span></Link> }
        {user ? (
          <Link to='/login' onClick={Logout}>Logout</Link>
        ) : (
          <div>
            <Link to='/login'>Login</Link>
            <span> | </span>
            <Link to='/register'>Register</Link>
          </div>
        )}
      </div>
    );
}


export default Header;