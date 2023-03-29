import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import axios from 'axios'
import { Button, Card, Badge, Accordion } from 'react-bootstrap'
import MainScreen from '../MainScreen'
import Sidebar from '../Sidebar'
import Footer from  '../footer/Footer'
import "../screens/profileScreen/ProfileScreen.css"
import TaskApp from '../TaskApp/TaskApp'


const MyPets = () => {

    const [pets, setPets] = useState([]);
    
    useEffect(() => {
        
      fetchPets();
    }, []);

   

    const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  // handle click event of logout button
  const handleLogout = () => {    
    localStorage.clear();
        navigate("/login")
  }


    //gets list of pets
    const fetchPets = async () => {
        const userInfo = JSON.parse(localStorage.getItem('user')).token;
        console.log(userInfo)
        
        let result = await fetch ('http://localhost:5000/api/pets', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo}`
        }
    })
      
        result = await result.json()
        setPets(result)  
        //localStorage.setItem("pet", JSON.stringify(result))
        console.log(result)
      /*  const {data} = await axios.get('http://localhost:5000/api/pets')
        setPets(data) */
    };
   // console.log(pets);


   

    
    //deleting pet
    const deletePet = async (id) => {
        console.log(id)
        const userInfo = JSON.parse(localStorage.getItem('user')).token;
        console.log(userInfo)
        if (window.confirm("Are you sure?")) {     
        }

        let result = await fetch(`http://localhost:5000/api/pets/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo}`
            }

        });
        
        result = await result.json();
        if (result){
            alert("Pet deleted");
            localStorage.removeItem('pet');
            fetchPets()
        }
       
    };

    const editPet =() => {
        navigate('/update/:id')
    }

    const searchHandler = async(event) => {
        let key = event.target.value;
        console.log({key: key})
        const userInfo = JSON.parse(localStorage.getItem('user')).token;
        if (key){
    
        let result = await fetch(`http://localhost:5000/api/pets/search/${key}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo}`
            }


        })
        result = await result.json()
        if (result) {
            setPets(result)
        }
    }else{
        fetchPets();
    }}

  return (
    <>

    <div className=" min-vh-100 d-flex p-0 ">
       
    <Sidebar/>
    

    
    <div className=' m-auto w-50 mt-5'>
  

  
   
    <MainScreen className="mt-4 mb-2" title= {`Welcome Back ${JSON.parse(auth).name}!`} > 
    



    <input type="" className='search-record-box rounded w-25 p-1 mb-2 mt-5 ' placeholder=' Search Pets' 
    onChange={searchHandler}/><br/><br/>

            {
            pets.map(pet => (
                <Accordion className= "petContainer" flush key={pet._id}> 
                    <Accordion.Item eventKey="0">
                <Card>
                <Card.Header style={{display:"flex"}}>
                    <Accordion.Header>
                    <span>{pet.name}</span>
                    </Accordion.Header>
                    <div> {' '}
                   
                    <Button href={`/update/${pet._id}`} 
                    className="ms-4"//or {"/update/"+pet.id}
                   
                    >Update</Button>{' '}
                    <Button 
                    className='ms-2'
                    variant="danger"
                    onClick={() => deletePet(pet._id)}>
                        Delete
                    </Button>
                </div>
                </Card.Header>
                <Accordion.Body>
                <Card.Body>
                    <h4>
                        <Badge bg= "info">
                            ID - {pet._id}
                        </Badge>
                    </h4>

                
                < Row className="blockquote mb-0">
                    <p> <Col className="flex" sm= {12} md={12} lg={12}>{' '}<img className="petpic mt-2 inline-flexbox w-50" src={pet.pic} /></Col><br/>
                        Species: {" "} {pet.species}<br/>
                        Breed: {" "} {pet.breed}<br/>
                        Sex: {" "} {pet.sex}<br/>
                        Birthday: {" "} {pet.birthday}<br/>
                        Weight: {" "} {pet.weight}<br/>
                        RegistrationId: {" "} {pet.registrationId}<br/>
                        
                    </p>

                    <Button 
                    variant = "primary" 
                    className='mb-4' 
                    href={`/petrecord/new-record/${pet._id}`}> 
                    Add Record
                    </Button> {' '}

                    <Button variant= "info" className='mb-4' 
                    href= {`/petrecord/${pet._id}`} //{`/petrecords/${pet.name}/records`}
                    > View Records</Button> {' '}
                    <Button 
                    variant = "success" 
                    className='mb-4' href="/petcalendar"> View Schedule</Button> {' '}


                    <footer className='blockquote-footer'> <small> Created On - {new Date().toLocaleDateString('en-nz', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</small></footer>
                </Row>
                </Card.Body>
                </Accordion.Body>

                
            </Card>
            </Accordion.Item>
            <br/>

            
            </Accordion>
            
            
            ))
            

            }

            
            
             <div className='mt-3 text-end'>
            <Link to="/newpet">
            <Button className='mb-4 '>Add Pet</Button><br></br>
        </Link> 
      


        </div> 
        
    </MainScreen>
    </div>
    
   
    </div><Footer />
    </>
  )
}

export default MyPets