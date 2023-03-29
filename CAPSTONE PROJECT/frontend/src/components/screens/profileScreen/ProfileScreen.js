import React, {useState, useEffect} from 'react';
import { Row, Col, Button, Form, Container} from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MainScreen from '../../MainScreen';
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";
import Sidebar from '../../Sidebar';
import Footer from '../../footer/Footer';


const ProfileScreen = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    //const [result, setResult] = useState([]);
    const [message, setMessage] = useState(null);
  

    

    const params = useParams();
   const navigate = useNavigate();



    useEffect(() => {
        const userInfo = localStorage.getItem("user")
      getUserDetails();

      console.log(userInfo)
    }, [])
    
 
  const getUserDetails = async (e) => {
    console.log({params})
  
    //const recordId= JSON.parse(localStorage.getItem('record'))._id;
    const user= JSON.parse(localStorage.getItem('user'))._id
    const user2= JSON.parse(localStorage.getItem('user'))


    //console.log({recordId});
    console.log({user});
    console.log({user2});
  


    //setLoading(false)
    let result = await fetch(`http://localhost:5000/api/users/${user}`);; 
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result)) 
    console.warn({result}); 

    setName(result.name);
    setEmail(result.email);
    setAddress(result.address);
    setPassword(result.password);
    setConfirmPassword(result.confirmPassword);
    
    
   
  

  }
 
  const updateUser = async (e) => {
    
    e.preventDefault();
    console.warn(name, email, address);
    const userId= JSON.parse(localStorage.getItem('user'))._id
    const token= JSON.parse(localStorage.getItem('user')).token
    console.log(token)


    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
        setLoading(false)
       } else {
        setMessage(null);

        try {
        
    let result =  await fetch(`http://localhost:5000/api/users/update/${userId}`, {
      method: "PUT",
      body: JSON.stringify({name, email, address, password, pic}),
      headers: {

        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      }
    });
    setLoading(true)
    setSuccess ("Update successful")
    result = await result.json();

    localStorage.setItem("user", JSON.stringify(result)) 
    //localStorage.setItem("token", JSON.stringify(token)) 
//console.log(token)
    console.log(result);
    //if (result){
      alert("Your Profile has been updated!");
      setLoading(false)
       navigate('/mypets');
       //setLoading(false)
    }catch(error){
      setError(error.response.data.message);
    }
  }};



  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "PetBook");
      data.append("cloud_name", "mmar");
      fetch("https://api.cloudinary.com/v1_1/mmar/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data);
          localStorage.setItem("pic", JSON.stringify(data)) 
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };
    
  const submitHandler = (e) => {
    e.preventDefault();


  }


  return (

    <>
    <AppBar position="relative">
        <Toolbar>
          
          <Typography variant="h6" color="inherit" noWrap>
           Edit Profile
          </Typography>
        </Toolbar>
      </AppBar><br/>
    
<Button className='mb-5 ms-5' href="/mypets"> Back to dashboard</Button>
  <MainScreen title="" >    
  
      <Container className='min-vh-100 '>
        <Row className="profileContainer ms-4 mb-5">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
             {loading && <Loading />}
              {message && <ErrorMessage variant="danger">{message} </ErrorMessage>}
              
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="adress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              {picMessage && ( <ErrorMessage variant="danger">{picMessage}</ErrorMessage>)}
              <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control
                  onChange={(e) => postDetails(e.target.files[0])}
                  //id="custom-file"
                  type= "file"
                  //type="image/png"
                  label="Upload Profile Picture"
                  custom
                />
              </Form.Group>{" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              
              <div className='mt-3 text-end'>
              <Button type="submit" varient="primary" size="md" onClick={updateUser} >
                Update
              </Button>
              </div>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </Container>
    </MainScreen>
    <div><Footer /> </div>
    
    </>
  
  )
        };

export default ProfileScreen