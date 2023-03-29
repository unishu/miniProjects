import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Footer from '../footer/Footer'
import boston from  '../../assets/boston.png'

const AboutUs = () => {
  return (
    <div>
        
<Container className='min-vh-100 font-link'><br/>
    <section class="section mt-4">
      <Container className='mb-4'>
        <Row>
          <Col md={6} lg={5} className='ml-auto d-flex align-items-center mt-4 mt-md-0'>  
         
            <div> 
              <h1 className='font-link mb-4' style={{ fontSize: "4rem" }}>A little about PetBook</h1>
                <p>Welcome to PETBOOK!</p>

                <p>  We understand that your pets are an important part of your family, which is why 
                  we created an easy-to-use platform to help you manage their health and schedule.<br/><br/>
    

                Our app is designed to make managing your pet's schedule and health a breeze. 
               With just a few clicks, you can schedule appointments, set reminders for important events, 
                and keep track of your pet's health. With our user-friendly interface and customizable 
                features, you can tailor the app to your pet's unique needs.<br/><br/>
   
                Whether you're a busy pet parent or just want to stay organized, PETBOOK has everything you 
                need to keep your furry friend happy and healthy. </p>
            </div>
            </Col>
          
          <Col md={6}>
            <div>
              <img alt="dog-image" className="img-fluid ms-5" src={boston} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
   


        </Container>
        <Footer />
    </div>
  )
}

export default AboutUs