import React, { useState } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Button  from "react-bootstrap/Button"
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Container } from "react-bootstrap";
import Footer from "./footer/Footer";

const locales = {
    "en-NZ": require("date-fns/locale/en-NZ")
}

const localizer = dateFnsLocalizer ({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})


const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2023,2,2),
        end: new Date(2023,2,4)
    },
    {
        title: "Vet Appointment",
        start: new Date(2023,2,2),
        end: new Date(2023,2,3)
    }
]

const PetCalendar = () => {

    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""}) 
    const [allEvents, setAllEvents] = useState(events) 

    function handleEvent () {
        setAllEvents([...allEvents, newEvent])
        localStorage.setItem("record", JSON.stringify(newEvent))
    }

  return (
    <>
    <AppBar position="relative">
        <Toolbar>
          
          <Typography variant="h5" color="inherit" noWrap>
           Calendar
          </Typography>
        </Toolbar>
      </AppBar><br/>
      
      <Button
    className="ms-5"
    href="/mypets"> 
    Back to Dashboard</Button>
    <Container className="mb-4 d-flex "> 
    

    
        <div className="text-center m-auto mt-2 min-vh-100">
            <h1 >Calendar</h1>
            <h4 className="mt-4">Add New Event</h4>

        < div className="text-center m-auto mt-2  ">

            <input 
            type="text" 
            placeholder="Add title" 
            style={{width: "20%", marginRight: "10px"}}
            value={newEvent.title} 
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            /> 
        
            <DatePicker 
            placeholderText="Start Date" 
            style={{marginRight: "10px", }}
            className="mt-2 "
            selected={newEvent.start}
            onChange={(start) => setNewEvent({...newEvent, start})}/>

            <DatePicker 
            placeholderText="End Date" 
            className="mt-2"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({...newEvent, end})}/>  
        

            <Button style={{marginTop: "10px"}} onClick={handleEvent}>
            Add event
            </Button>
        </div>
        
            <Calendar 
            localizer={localizer} 
            events={allEvents} 
            startAccessor="start" 
            endAccessor="end" 
            className="mt-5"
            style={{height: 500, margin: "auto"}}/>
        </div>
     <br/>
    </Container><br/>
    <Footer />
    </>
  )
}

export default PetCalendar


