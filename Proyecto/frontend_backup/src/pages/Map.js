import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import './map.css'
import {NavLink} from 'react-router-dom';
import { Navbar, Button, Form , Col, Row,} from 'react-bootstrap';
import { MapContainer as LeafletMap, TileLayer,Marker,Popup  } from 'react-leaflet';
import { useState } from 'react';
import Icon from '../components/Marker/icon'
import {BsBookmarkPlus} from 'react-icons/bs'
import routes from '../helpers/routes';

const Map = () => {

  
   // Estados para controlar el término de búsqueda y la ubicación encontrada
   const [searchTerm, setSearchTerm] = useState("");
   const [searchLocation, setSearchLocation] = useState(null);
   
   // Estado para manejar errores
   const [Error, setError] = useState([])
 
   // Función para manejar el cambio en el campo de búsqueda
   const handleSearchInput = (event) => {
     setSearchTerm(event.target.value);
   };
 
   // Función para manejar el envío del formulario de búsqueda
   const handleSearchSubmit = () => {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      searchTerm
    )}`;
 
    fetch(geocodeUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setSearchLocation({ lat, lon, display_name });
        console.log("La dirección es " + display_name);
        console.log("El lugar es " + geocodeUrl);
      } else {
        setSearchLocation(null);
        alert("No se encontraron resultados para la búsqueda");
      }
    })
    .catch((error) => {
      // Manejar errores de red, etc.
      setError(Error);
      console.log("Error en la solicitud: ", Error);
    });
};

  return (
    <Row>
    <Col lg={1} offset-md={4} >
      {/* Barra de Navegación */}
      <Navbar expand="lg" variant="light" bg="light" className="mb-7 d-flex flex-column fluid" style={{width:'250px',height:'1000px'}}>
      <Form onSubmit={(e) => {
      e.preventDefault();
      handleSearchSubmit();
      }}>
        <Row>
          <Col xs="11">
            <Form.Control
              type="search"
              placeholder="Search"
              className="ms-2 mb-3"
              value={searchTerm}
              onChange={handleSearchInput}
              name='search'
            />
          </Col>
          <Col xs="auto" className='ms-1'>
            <Button type="submit"
            className='icon'>buscar</Button>
          </Col>
          
          <Navbar.Brand as={NavLink} to={routes.places}>
          <BsBookmarkPlus style={{cursor:'pointer'}}/>
          </Navbar.Brand>
          
        </Row>
      </Form>
      </Navbar>
    </Col>
    <Col>
       {/* Mapa */}
       <LeafletMap center={[4.62107, -74.14869]} zoom={13} className="leaflet-Map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Si se encuentra una ubicación, mostrar un marcador en el mapa */}
          {searchLocation && (
            <Marker position={[searchLocation.lat, searchLocation.lon]} icon={Icon}>
               <Popup>{searchLocation.display_name}</Popup>
            </Marker>
          )}
      </LeafletMap>
       </Col>
  </Row>
);
};

export default Map;