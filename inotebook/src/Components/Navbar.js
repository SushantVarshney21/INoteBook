import React, { useContext,useEffect } from 'react'
import noteContext from "../context/notes/noteContext";
import {Link , useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
function Navbar(props) {
  const location = useLocation();
  const context = useContext(noteContext);
  const { userData } = context;

  let history = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    history("/login")
    props.showAlert("Logout Successfully", "success")
  }
 

  useEffect(() => {
    if(localStorage.getItem('token')){
      userData();
    }
    else{
      history("/login")
    }
      // eslint-disable-next-line
    },[]);
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme={"dark"}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">INoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/"? "active" : ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about"? "active" : ""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem("token")? <form className="d-flex" role="search">
      <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-1" to="/singup" role="button">Singup</Link>
      </form>:
      <div> 
      <button onClick={handleLogout} className="btn btn-primary mx-1" >Logout</button>
      <Link onClick={userData} className="btn btn-primary mx-1 " to="/user" role="button">
        <i  class="fa-solid fa-user mt-2 mx-2" style={{"color":" #fff" }}></i>
      </Link>
      </div>
      }
    </div>
  </div>
</nav>
</>
  )
}

export default Navbar
