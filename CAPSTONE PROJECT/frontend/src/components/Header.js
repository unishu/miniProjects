import React from 'react';
import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';
import dogImage from '../assets/dogImage.jpg'

export const Header = () => {
  return (
    <Container fluid className='p-0'>   
      <div className='bg-secondary p-5 rounded-lg m-0 text-center' 
        style={{backgroundImage: `url(${dogImage})`, backgroundSize: 'cover', minHeight:'400px'}}>
        <h1 style={{color: 'black'}}>PetBook </h1>
          <p>One Safe Place for all your Pets. </p>

        <p>
          <a href="/login">
          <Button bsStyle="primary">Learn more</Button>
          </a>
        </p>
      </div>
      </Container>
  )
}
  //<Container fluid className='bg-secondary'>