import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import logo from './logo.svg';
import './App.css';


import Navbar from "./components/Navbar"
import Layout from "./components/Layout"

import {Login} from "./components/screens/loginScreen/Login"
import {Register} from './components/screens/registerScreen/Register'
import Home from "./components/screens/Home"
import Dashboard from "./components/screens/Dashboard"
//import { Router } from 'express';
import {Auth} from "./components/Auth"
import {NewPet} from "./components/pets/NewPet"
import PrivateComponent from './components/PrivateComponent';
import MyPets from './components/pets/MyPets';
import UpdatePet from './components/pets/UpdatePet';
import PetRecord from './components/pets/PetRecord';
import PetRecord2 from './components/pets/PetRecord2';
import { NewRecord } from './components/pets/NewRecord';
import {UpdateRecord} from './components/pets/UpdateRecord'
import ProfileScreen from './components/screens/profileScreen/ProfileScreen';
import Calendar from './components/calendar/Calendar';
import AboutUs from './components/screens/AboutUs';
import ReminderWrapper from './components/ReminderWrapper';
import  Tasks from './components/TaskApp/Tasks'
import TaskApp from './components/TaskApp/TaskApp';
import Modal from 'react-modal';


Modal.setAppElement('#root')


function App() {

/*  const [user, setLoginUser] = useState([]);

  useEffect (() => {
    setLoginUser(localStorage.getItem("user"))
  }, [])

  const updateUser = (user) => {
    localStorage.setItem("user", Json.stringfy(user))
    setLoginUser(user)
  } */
  

  return (
    <div className="App">
     
      <BrowserRouter> 
      <Navbar />  
      <Layout>       
        <Routes>
          <Route element ={<PrivateComponent />}> 
          
           
            <Route path='/dashboard' element={<Dashboard />} />  
            <Route path ='/edit-profile' element={<ProfileScreen />} />
            <Route path='/mypets' element={<MyPets />} /> 
            <Route path='/update/:petid' element={<UpdatePet />} />  
            <Route path='/newpet' element={<NewPet />} /> 
            <Route path='/petrecord/:recordId' element={<PetRecord />} /> 
            <Route path='/petrecord/update/:recordId' element={<UpdateRecord />} /> 
            <Route path='/petrecord/new-record/:petid' element={<NewRecord />} /> 
            

          </Route>
          
          <Route exact path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about-us' element={<AboutUs />} />

          <Route exact path="/tasks" element={<TaskApp />} />

          <Route path='/petrecord2' element={<PetRecord2 />} /> 
          <Route path='/calendar' element={<Calendar />} /> 
          
        </Routes>
      </Layout>
      </BrowserRouter>
      
    </div>
  );
  
}

export default App;


/*
 
<Route path='/petrecords/:petname/records' element={<PetRecord />} /> 

const [currentForm, setCurrentForm] = useState('login');

  const toogleForm = (formName) => {
    setCurrentForm(formName);
  }
  {
        currentForm == "login" ? <Login onFormSwitch={toogleForm} /> : <Register onFormSwitch={toogleForm} />
      }
      */

     