//wrapper component

import React from 'react'
import Container from 'react-bootstrap/Container' // or import {Container} from 'react-bootstrap'

const Layout = (props) => {

    return (
      
        <Container fluid className='p-0'>
            {props.children}

        </Container>
    
        
    )
/*  return (
    <Container>Layout
        {props.children}
    </Container>
  )
  */
}

export default Layout