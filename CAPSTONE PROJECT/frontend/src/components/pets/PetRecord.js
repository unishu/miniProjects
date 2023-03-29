import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import { FaFile } from "react-icons/fa";
import axios from 'axios'
import { Button, Card, Badge, Accordion } from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import MainScreen from '../MainScreen'
import Sidebar from '../Sidebar'
import Footer from '../footer/Footer'


const PetRecord = () => {

    const [records, setRecords] = useState([]);
    const params = useParams()


    
    useEffect(() => {
        
      fetchRecords();
    }, []);


    //gets list of pets
    const fetchRecords = async () => {
        const userInfo = JSON.parse(localStorage.getItem('user')).token;
        console.log(userInfo)

     /*   const recordId= JSON.parse(localStorage.getItem('record'))._id;
       console.log(`recordID is` + recordId); */  

        let result = await fetch ("http://localhost:5000/api/petrecords", //(`http://localhost:5000/api/petrecords/${recordId}`)
        {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo}`
        } }) 
        result = await result.json()
        localStorage.setItem("record", JSON.stringify(result))
        setRecords(result)
      /*  const {data} = await axios.get('http://localhost:5000/api/pets')
        setPets(data) */
    };
   // console.log(pets);

   const deleteRecord = async (id) => {
    console.log(id)
    if (window.confirm("Are you sure?")) {     
    }

    let result = await fetch(`http://localhost:5000/api/petrecords/${id}`, {
        method: "DELETE",

    });
    result = await result.json();
    if (result){
        alert("Record deleted");
        localStorage.removeItem('record');
       
    //navigate("/")
        fetchRecords()
    }
   
};

const searchHandler = async(event) => {
    let key = event.target.value;
    console.log({key: key})
    if (key){

    let result = await fetch(`http://localhost:5000/api/petrecords/search/${key}`);
    result = await result.json()
    if (result) {
        setRecords(result)
       
    }
}else{
    fetchRecords();
}
}


  return (
<>
  <Container className='min-vh-100'> 

    <div className='mt-4 '>

    <Button variant = "info" className='mb-2' href= '/mypets'>Back to Dashboard</Button><br/>

    <input type="" className='search-record-box rounded w-20 p-1 mb-2 mt-5' placeholder='Search Record' 
    onChange={searchHandler}/><br/><br/>
    
    

<div>

    
{
            records.length >0 ? records.map((record, index) => (
                <Accordion flush key={record._id}> 
                    <Accordion.Item eventKey="0">
                <Card>
                <Card.Header style={{display:"flex"}}>
                    <Accordion.Header><span >{record.petName}</span></Accordion.Header>
                    <div> {' '}
                    
                   
                    <Button variant = "success" className='ms-4'> Schedule</Button> {' '}
                    <Button href={`update/${record._id}`} //or {"/update/"+pet.id}
                    >Update</Button>{' '}
                    <Button 
                    variant="danger"
                    onClick= {() => deleteRecord(record._id)}
                    >
                        Delete
                    </Button>
                </div>
                </Card.Header>
                <Accordion.Body>
                <Card.Body>
                    <h4>
                        <Badge bg= "info">
                            Record - {record._id}
                        </Badge>
                    </h4>

                
                < blockquote className="blockquoite mb-0">
                    
                    <p>
                      
                        <h4>Vet</h4>
                        {record.vet.map ((c, i) =>
                        <div>
                        <h6></h6>{c.name} 
                        <h6></h6> {c.contact}
                        </div>
                        )} <br/>
                     
                        <h4>Health Concerns</h4>
                        {record.healthConcerns.map ((c, i) =>
                        <div>
                        <h6>Allergies:</h6>{c.allergies}
                        <h6>Medication:</h6> {c.medication}
                        <h6>Existing Conditions:</h6> {c.exisitingConditions} 
                        <h6>History:</h6> {c.history}
                        </div>
                        )} <br/>
                    
                        <h4>Vaccinations:</h4> {record.vaccinations}
                        <br/><br/>
                        <h4>Records:</h4> <a href={record.recordImage} className="btn btn-primary stretched-link mb-4"> <FaFile/></a>
                    </p>
                    
                    <footer className='blockquote-footer'> Created On - {new Date().toLocaleDateString('en-nz', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</footer>
                </blockquote>
                </Card.Body>
                </Accordion.Body>
            </Card>
            </Accordion.Item>
            </Accordion>
            ))
            :<h1>No Record Found</h1>

            }
</div>
    </div>
    </Container>
    <Footer />
    </>
  )
}

export default PetRecord