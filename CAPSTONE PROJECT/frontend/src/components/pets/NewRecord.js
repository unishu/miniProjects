import React from "react";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from "../Sidebar";
import axios from "axios";

export const NewRecord = () => {


    const [file, setFile] = useState(null);
    const [petName, setPetName] = useState('');
    
    const [address, setAddress] = useState('');
    const [vet, setVet] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [healthConcerns, setHealthConcerns] = useState('');
    const [allergies, setAllergies] = useState('');
    const [medication, setMedication] = useState('');
    const [history, setHistory] = useState('');
    const [exisitingConditions, setExistingConditions] = useState('');
    const [vaccinations, setVaccinations] = useState('');
    const [loading, setLoading] = useState(false);
 

    const [error, setError] = useState(false)

    const recordId = localStorage.getItem("record")


/* const handleSubmit =   (e) => {
      e.preventDefault();
      //console.log(name, breed, gender, weight, address, city, postcode);
    }*/
  const navigate =useNavigate();
const params = useParams();

useEffect(() => {
  getDetails();
}, [])

const getDetails = async (e) => {
 
  console.log(params); 
 

  setLoading(false)
  let result = await fetch(`http://localhost:5000/api/pets/${params.petid}`); 
  result = await result.json();
  localStorage.setItem("pet", JSON.stringify(result)) 
  console.warn(result); 

}




    const addRecord = async (e)=> {
      e.preventDefault();
      
      const userId= JSON.parse(localStorage.getItem('user'))._id
      const petId= JSON.parse(localStorage.getItem('pet'))._id
      const token = JSON.parse(localStorage.getItem('user')).token;
      
     
      //console.warn({petid: petId})
    
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
      let result = await fetch(`http://localhost:5000/api/petrecords/add/${params.petId}`, {
        method: "POST",
        body: JSON.stringify({ petName, vet: [{name, contact}], healthConcerns:[{allergies, medication, exisitingConditions, history }], vaccinations, userId, petId}),
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      setLoading(true)
      result = await result.json();
      localStorage.setItem("record", JSON.stringify(result))
      localStorage.setItem("pet", JSON.stringify(result))
      console.log(result);
      
      navigate("/mypets")
      
      
   
      
      } catch (error) {
        setError(error.response.data.message);
     
        setLoading(false)
        
      }}


      const upload =  async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("uploads", file);
       let result = await fetch("http://localhost:5000/api/petrecords/", formData, {
          method: 'POST',  
          headers: {
            "Content-Type": "multipart/form-data"
          },
        })
        result =  await result.json();
        console.log(result);
        localStorage.setItem("record", JSON.stringify(result))
        navigate('/dashboard')
        
        
        /*.then((res) => {
          console.log("Success ", res);
          console.log(res)
          localStorage.setItem("record", JSON.stringify(res)) */
      
          
        };
      
                
      

  return (
    <> 


    

    <div className=" min-vh-100 d-flex m-0 p-0">
    <Sidebar />

    
 
   <div className=" min-vh-100 d-flex align-items-center justify-content-center">
   <div className=''>
            <label for="formFileMultiple" className="form-label ">Upload Documents</label><br/>
            <input 
            className='upload ' 
            type="file"
            id="formFileMultiple" 
            multiple
            onChange= {(e) => {setFile(e.target.files[0])}}/>
            <button 
            className="btn btn-outline-primary"
            onClick={(e) => upload(e)}>Upload</button>
          </div>
    <Form className="" //onSubmit={handleSubmit}
    >
       


       <Row className="mb-3 mt-5">
        <Form.Group as={Col} controlId="formGridBreed">
          <h5>Pet </h5>
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type="text" 
          placeholder=""
          className="inputBox"
          value= {petName}  
          onChange={(e) => {setPetName(e.target.value)}} />
        </Form.Group>
        </Row>
      <Row className="mb-3 mt-5">
        <Form.Group as={Col} controlId="formGridBreed">
          <h5>Vet Details</h5>
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type="text" 
          placeholder=""
          className="inputBox"
          value= {name}  
          onChange={(e) => {setName(e.target.value)}} />
        </Form.Group>
        </Row>

        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridBreed">
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Contact Details</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e) => {setContact(e.target.value)}}
        />
      </Form.Group>
          
        </Form.Group>
        </Row>

      <Row classname="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <h5>Health Concerns</h5>
          <Form.Label>Allergies</Form.Label>          
          <Form.Control 
          type="text" 
          placeholder=""
          className="inputBox"
          value= {allergies}  
          onChange={(e) => {setAllergies(e.target.value)}} />
          <Form.Label className="mt-2">Medication</Form.Label>          
          <Form.Control 
          type="text" 
          placeholder=""
          className="inputBox "
          value= {medication}  
          onChange={(e) => {setMedication(e.target.value)}} />
          <Form.Label className="mt-2">Existing Conditions</Form.Label>
          <Form.Control 
          type="text" 
          placeholder=""
          className="inputBox"
          value= {exisitingConditions}  
          onChange={(e) => {setExistingConditions(e.target.value)}} />
        </Form.Group>
        

    <Form.Group className="mb-3 mt-2" controlId="exampleForm.ControlTextarea1">
        <Form.Label>History</Form.Label>
        <Form.Control 
        as="textarea" 
        rows={3} 
        placeholder=""
        value= {history}  
        onChange={(e) => {setHistory(e.target.value)}}
         />
      </Form.Group>
        
        </Row>

        <Row classname="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Vaccination Status</Form.Label>
          <Form.Control 
          type="text" 
          placeholder=""
          className="inputBox"
          value= {vaccinations}  
          onChange={(e) => {setVaccinations(e.target.value)}} />
        </Form.Group>

      </Row>


      <div className="text-end mt-4">
      <Button variant="primary" type="submit" className="register-btn col-sm-3" onClick={addRecord}>
        Confirm
      </Button>
      </div>
    </Form>
    </div>
    </div>
    <br/>
    
    
    </>
  );
  }

    