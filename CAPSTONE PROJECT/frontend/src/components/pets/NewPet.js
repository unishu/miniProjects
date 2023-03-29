import React from "react";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from "../Sidebar";
import axios from "axios";

export const NewPet = () => {


    const [name, setName] = useState(' ');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [birthday, setBirthday] = useState('');
    const [sex, setSex] = useState('');
    const [weight, setWeight] = useState('');
    const [registrationId, setRegistrationId] = useState('')
 

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);

/* const handleSubmit =   (e) => {
      e.preventDefault();
      //console.log(name, breed, gender, weight, address, city, postcode);
    }*/
  const navigate =useNavigate();

  /*useEffect(() => {
    const petInfo = localStorage.getItem("pet");
    if(petInfo) {
       //navigate("/dashboard") 
       console.log("Success!")
    }
    
},[]) */

    const addPet = async (e)=> {
      e.preventDefault();
      console.warn(name, species, breed, sex, birthday, weight, registrationId);
      const userId= JSON.parse(localStorage.getItem('user'))._id;
      const userAddress= JSON.parse(localStorage.getItem('user')).address;
      const token= JSON.parse(localStorage.getItem('user')).token
      console.warn({userId})
      console.warn({userAddress})

    


  /*    try { 
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                //"Content-type": "applications/json",
                
            }
        };
        

        //setLoading(true);
        let { data } = await axios.post("http://localhost:5000/api/pets/register", {
          name, breed, birthday, gender, registrationId, userId 
        }, config
        );
        
console.log(data)
        
        localStorage.setItem("user", JSON.stringify(data));
        //navigate('/dashboard');
        //setLoading(false);
    } catch (error) {
        setError(error?.response?.data?.message);
        //setLoading(false)
    }
};
*/
try {
      let result = await fetch("http://localhost:5000/api/pets/register", {
        method: "POST",
        body: JSON.stringify({name, species, breed, birthday, sex, weight, registrationId, userId, userAddress }),
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`,
        }
      });
      setLoading(true)
      result = await result.json();
      console.log(result);
      localStorage.setItem("pet", JSON.stringify(result))
      alert("Pet has been added!")
      navigate("/mypets")
   
      
      } catch (error) {
        setError(error.response.data.message);
     
        setLoading(false)
        
      }}
      
                
    
  return (
    <> 

    <div className=" min-vh-100 d-flex m-0 p-0">
    <Sidebar />
 
   <div className="container min-vh-100 d-flex align-items-center justify-content-center">
    <Form className="" //onSubmit={handleSubmit}
    >
        <h2 className="mb-5">Register new pet</h2>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type="text"
          className="form-control mt-1"
          //className={`${}`}
         
          name="name"
          value={name}
          placeholder= "e.g Jane Doe "
          onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Upload a photo</Form.Label>
          
          <input type="file" id="myFile" classname="petphoto" ></input>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridBreed">
          <Form.Label>Species</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Pet's breed"
          className="inputBox"
          value= {species}  
          onChange={(e) => {setSpecies(e.target.value)}} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridBreed">
          <Form.Label>Breed</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Pet's breed"
          className="inputBox"
          value= {breed}  
          onChange={(e) => {setBreed(e.target.value)}} />
        </Form.Group>

        
      </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Sex</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Pet's sex"
          className="inputBox"
          value= {sex}  
          onChange={(e) => {setSex(e.target.value)}} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridBreed">
          <Form.Label>Birthday</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Date of birth"
          className="inputBox"
          value= {birthday}  
          onChange={(e) => {setBirthday(e.target.value)}} />
        </Form.Group>
        
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Weight</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Pet's weight" 
          className="inputBox"
          value= {weight}  
          onChange={(e) => {setWeight(e.target.value)}} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridBreed">
          <Form.Label>Registration ID</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Registration ID"
          className="inputBox"
          value= {registrationId}  
          onChange={(e) => {setRegistrationId(e.target.value)}} />
        </Form.Group>
        
        </Row>
      

      <div className="text-end">
      <Button variant="primary" type="submit" className="register-btn col-sm-3" onClick={addPet}>
        Register
      </Button>
      </div>
    </Form>
    </div>
    </div>
    <br/>
    
    
    </>
  );
  }

    