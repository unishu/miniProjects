import React from "react";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from "../Sidebar";
import axios from "axios";

export const UpdateRecord = () => {


    const [file, setFile] = useState(null);
    const [petName, setPetName] = useState('');
    const [address, setAddress] = useState('');
    const [vet, setVet] = useState('');
    const [name, setName] = useState('');
    const [recordImage, setRecordImage] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [contact, setContact] = useState('');
    const [healthConcerns, setHealthConcerns] = useState('');
    const [allergies, setAllergies] = useState('');
    const [medication, setMedication] = useState('');
    const [history, setHistory] = useState('');
    const [exisitingConditions, setExistingConditions] = useState('');
    const [vaccinations, setVaccinations] = useState('');
    const [spayedOrNeutered, setSpayedOrNeutered] = useState('')
    const [loading, setLoading] = useState(false);
    const [picMessage, setPicMessage] = useState();
    const [ cancelEdit, setCancelEdit ] = useState(false);
    const [ edit, setEdit ] = useState(false);
 

    const [error, setError] = useState(false)

    const recordId = localStorage.getItem("record")


/* const handleSubmit =   (e) => {
      e.preventDefault();
      //console.log(name, breed, gender, weight, address, city, postcode);
    }*/
  const navigate =useNavigate();
const params = useParams();



 useEffect(() => {
   getRecords();
 }, [])
 

const getRecords = async (e) => {
    //const recordId= JSON.parse(localStorage.getItem('record'))._id;
    
 console.log(params); 
 console.log( `RECORD ID IS` + recordId)


 setLoading(false)
 let result = await fetch(`http://localhost:5000/api/petrecords/${params.recordId}`); 
 result = await result.json();
 localStorage.setItem("pet", JSON.stringify(result))
 console.warn(result); 

 setPetName(result.petName);
 setVet(result.vet);
 setName(result.name);
 setContact(result.contact);
 setAllergies(result.healthConcerns);
 setMedication(result.healthConcerns);
 setExistingConditions(result.healthConcerns);
 setHistory(result.history);
 setVaccinations(result.vaccinations);

}


    const updateRecord = async (e)=> {
      e.preventDefault();
      console.warn( vet, healthConcerns, vaccinations);
      const userId= JSON.parse(localStorage.getItem('user'))._id
      const petId= JSON.parse(localStorage.getItem('pet'))._id
      
     
      console.warn(userId, petId, recordId)
    

try {
      let result = await fetch(`http://localhost:5000/api/petrecords/${params.recordId}`, {
        method: "PUT",
        body: JSON.stringify({ petName, recordImage, vet: [{name, contact}], healthConcerns:[{allergies, medication, exisitingConditions, history }], vaccinations, userId, petId}),
        headers: {
          "Content-type": "application/json"
        }
      });
      setLoading(true)
      result = await result.json();
      localStorage.setItem("record", JSON.stringify(result))
      console.log(result);
      if (result){
        alert("Pet has been updated!");
    
      navigate("/mypets") }
   
      
      } catch (error) {
        setError(error.response.data.message);
     
        setLoading(false)
        
      }}
     /*const upload =  async (e) => {
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
        
        
        .then((res) => {
          console.log("Success ", res);
          console.log(res)
          localStorage.setItem("record", JSON.stringify(res)) 
      
          
        };*/
        


        const upload = (pics) => {
          setPicMessage(null);
          if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/pdf") {
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
                setRecordImage(data.url.toString());
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

        const handleCancelEdit = () => {
          setCancelEdit(!cancelEdit);
          setEdit(!edit);
          navigate("/mypets")
          
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
            accept ='application/pdf, image/png, image/jpeg'
            onChange= {(e) => upload(e.target.files[0])}/>
           

           <label for="formFileMultiple" className="form-label ">Upload Documents</label><br/>
            <input 
            className='upload ' 
            type="file"
            id="formFileMultiple" 
            multiple
            accept ='application/pdf, image/png, image/jpeg'
            onChange= {(e) => upload(e.target.files[0])}/>

<label for="formFileMultiple" className="form-label ">Upload Documents</label><br/>
            <input 
            className='upload ' 
            type="file"
            id="formFileMultiple" 
            multiple
            accept ='application/pdf, image/png, image/jpeg'
            onChange= {(e) => upload(e.target.files[0])}/>
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
      <Button variant="primary" type="submit" className="register-btn col-sm-3" onClick={updateRecord}>
        Update
      </Button>
      <Button variant="danger" type="submit" className="register-btn col-sm-3 ms-4" onClick={handleCancelEdit}>
        Cancel
      </Button>
      </div>
    </Form>
    </div>
    </div>
    <br/>
    
    
    </>
  );
  }

    