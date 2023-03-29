import React from 'react';
import {Container, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className='text-center text-white bg-light' >
      <Container className='pt-4'>
        <section className='mb-4'>

            <a href="#!" className='m-4' ><FaFacebook/></a>
            <a href="#!" className='m-4'><FaTwitter/></a>
            <a href="#!" className='m-4'><FaInstagram/></a>

        </section>
      </Container>

      <div className='text-center text-dark p-3 small' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      {'Copyright © '}
        <a className='text-dark text-decoration-none ' href=''>{' '} {' '}
          Marlanda Mar {' '}
      {new Date().getFullYear()}
      {'.'}
        </a>
      </div>
    </footer>
  );
}