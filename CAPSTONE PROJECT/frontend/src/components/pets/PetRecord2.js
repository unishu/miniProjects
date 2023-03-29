import * as React from 'react';
import  {useEffect, useState} from 'react'
import {useParams } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Button from 'react-bootstrap/Button';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Footer from '../footer/Footer';





export default function Album() {

  const theme = createTheme();

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
  }}
   

  return (
< >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          
          <Typography variant="h6" color="inherit" noWrap>
           Pet Records
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Button variant='primary'
          sx={{ color: 'white', backgroundColor: 'blue', borderColor: '' }}
          className='mt-4 mb-3 ms-5' href= '/mypets'>Back to Dashboard</Button><br/>

 <div className='ms-5'>
  <input type="" className='search-record-box rounded w-20 p-1 mt-4 ms-5' placeholder='Search Record' 
    onChange={searchHandler}/>
 </div>

        <Container sx={{ py: 8 }} maxWidth="md" className='min-vh-100'>
          {/* End hero unit */}
 
        
          <Grid container spacing={4}>
            { records.length >0 ?records.map((record) => (
              <Grid item key={record} xs={10} sm={6} md={4}
              >
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
                  
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '10%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                  {record.petName} 
                    <span> <h6 className='text-muted'>{record._id}</h6> </span>
                       
                      
                    </Typography><br/>
                    <Typography>
                    <h4>Vet</h4>
                        {record.vet.map ((c, i) =>
                        <div>
                        <h6></h6>{c.name} 
                        <h6></h6> {c.contact}
                        </div>)} <br/>

                        <h4>Health Concerns</h4>
                        {record.healthConcerns.map ((c, i) =>
                        <div>
                        <h6>Allergies:</h6>{c.allergies}
                        <h6>Medication:</h6> {c.medication}
                        <h6>Existing Conditions:</h6> {c.exisitingConditions} 
                        <h6>History:</h6> {c.history}
                        </div>
                        )}
                      
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button className="ms-3 mb-4" size="small" href={`petrecord/update/${record._id}`}>Update</Button>
                    <Button className="ms-3 mb-4" size="small" variant="danger"
                    onClick= {() => deleteRecord(record._id)}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
            :<h1>No Record Found</h1>

          }
          </Grid>
        </Container>
      </main>
       <Footer />
    </ThemeProvider>
   
    </>
  );
}