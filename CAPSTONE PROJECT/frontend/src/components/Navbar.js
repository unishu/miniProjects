import React from 'react';
import { Button, Container, ToggleButton } from 'react-bootstrap';
import {useNavigate}  from 'react-router-dom';
import './Navbar.css';



const Navbar = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout=()=> {
        localStorage.clear();
        navigate("/")

    }
    return (
        <div className='container-fluid p-0'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Container fluid>
                <a className="navbar-brand ms-4" href="/">PetBook</a>   
                <Button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </Button>
  
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    {

                        auth ?
                    
                    <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                    
                        <li className="nav-item">
                            <a className="nav-link" href="/about-us">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">Our Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/mypets ">Dashboard</a>
                            </li>
                       <li><a  href="/register" className="nav-link" onClick={logout}>Logout
                            ({JSON.parse(auth).name})</a></li>
                            </ul>
                        :
                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto me-4">
                            
                        <li className="nav-item">
                            <a className="nav-link" href="/about-us">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">Our Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">Contact</a>
                        </li>
                        <li><a className="nav-link" href="/register">Register</a></li>
                            <li><a className='nav-link' href='/login'>Log In</a></li>
                            </ul>
                        }



                </div>
            </Container>
        </nav>
        </div>
    );
  };
  
  export default Navbar;