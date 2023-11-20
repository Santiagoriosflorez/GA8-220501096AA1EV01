import {Container,Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import routes from '../helpers/routes'

import React from 'react'



export default function HomePages() {

    const gradientBackground = {
      fontFamily:'Georgia,monospace',
      fontSize:'24px',
      background: '#D2D3DB',
      padding: '10px', // Agrega relleno para dar espacio alrededor de los enlaces
    };
  return (
    <Container> 
        <Row className='mt-5'>
            <Col xs={{span:12}} md={{span:6}} className='mb-5'>
              <h2>Bienvenid@ a la Aplicacion de AudioGuia</h2>
              <p>¡Aqui podras buscar lugares cercanos donde quieres dirijirte!</p>
              <p>
                      Comenzemos
              </p>
              <div className='container' style={gradientBackground}>
              <Link to={routes.login}>Ingresa</Link> o 
              <Link to={routes.register}>  registrar</Link>
              </div>
            </Col>
        </Row>                           
    </Container>
  )
}

