import React, {useState, useRef} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEventModal from '../calendar/AddEventModal'
import {Button, Container} from 'react-bootstrap';
import "../../components/calendar/Calendar.css"
import axios from "axios"
import moment from 'moment'
import Footer from "../footer/Footer";
import Sidebar from "../Sidebar";

export default function() {

    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([])
    const calendarRef= useRef(null)

    const onEventAdded = (event) => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent( {
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title

        });
    };


async function handleEventAdd(data) {
    await axios.post("http://localhost:5000/api/calendar/create-event", data.event);
}

async function  handleDateSet(data) {
    const response = await axios.get("http://localhost:5000/api/calendar/get-events?start="+
    moment(data.start).toISOString()+"&end="+moment(data.end).toISOString())
        setEvents(response.data);
}

    return (
        <>
        <div className="min-vh-100 d-flex p-0" >
        <Sidebar />
        <Container className="">
    
        <Container className="cal-container w-75 h-50 mt-5 p-0">
        <Button className="cal-btn" onClick={()=> setModalOpen(true)}>Add Event</Button>

        <div style= {{position: "relative", zIndex: 0}} >
            <FullCalendar
            ref={calendarRef}
            events={events}
            plugins = {[dayGridPlugin]}
            initialView='dayGridMonth'
            eventAdd={(event) => handleEventAdd(event)}
            datesSet = {(date) => handleDateSet(date)}   
            />
        </div>
        

        <AddEventModal isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onEventAdded={event => onEventAdded(event)} />
        
        </Container> <br/><br/>
        
       
        </Container>
        
        </div><Footer /> </>
    )
}