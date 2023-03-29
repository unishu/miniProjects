import React, {useState, useEffect} from 'react'
import {useNavigate}  from 'react-router-dom';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import MainScreen from '../MainScreen';
import Sidebar from '../Sidebar';
import profilePic from '../../assets/profilePic.jpg'


//import styled from 'styled-components';




function Dashboard(props) {


  const [user, setUser] = useState([])

  useEffect(() => {
        
    fetchUser();
  }, []);


  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  // handle click event of logout button
  const handleLogout = () => {    
    localStorage.clear();
        navigate("/login")
  }

  const fetchUser = async () => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    console.log({userID: userId})
    const token = JSON.parse(localStorage.getItem('user')).token;
    console.log({TOKEN: token})
    let result = await fetch (`http://localhost:5000/api/users/${userId}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})
  
    result = await result.json()
    setUser(result)  
    console.log(result)
  /*  const {data} = await axios.get('http://localhost:5000/api/pets')
    setPets(data) */
};







 
  return (
    <div className=" min-vh-100 d-flex p-0">
    <Sidebar />
    

  
    
   
    <div className='container  mt-5'> 
    <MainScreen title= {`Welcome Back ${JSON.parse(auth).name}!`} > 
    

 
      <Container className="py-5 h-100">

     
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="6" className="mb-4 mb-lg-0">
            <Card className="mb-3" style={{ borderRadius: '.5rem' }}>
              <Row className="g-0">
                <Col md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                     <Card.Body className="p-4">
                  <Card.Img src= {profilePic}
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <h5></h5>
                  <Card.Text>Web Designer</Card.Text>
                  <i class="bi bi-pencil-square"></i>
                  </Card.Body>
                </Col>
                <Col md="8">
                  <Card.Body className="p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <Row className="pt-1">
                      <Col size="6" className="mb-3">
                        <h6>Name</h6>
                        <Card.Text className="text-muted">{user.name}</Card.Text>
                      </Col>
                      <Col size="6" className="mb-3">
                        <h6>Email</h6>
                        <Card.Text className="text-muted">{user.email}</Card.Text>
                      </Col>
                    </Row>

                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <Row className="pt-1">
                      <Col size="6" className="mb-3">
                        <h6>Email</h6>
                        <Card.Text className="text-muted">{user.email}</Card.Text>
                      </Col>
                      <Col size="6" className="mb-3">
                        <h6>Phone</h6>
                        <Card.Text className="text-muted">123 456 789</Card.Text>
                      </Col>
                    </Row>

                    


                    <div className="d-flex justify-content-start">
                      <a href="#!"><FaFacebook/></a>
                      <a href="#!"><FaTwitter/></a>
                      <a href="#!"><FaInstagram/></a>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>

      
      
      My pets</MainScreen>
      Welcome User!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
    </div>
  );
}
 
export default Dashboard;