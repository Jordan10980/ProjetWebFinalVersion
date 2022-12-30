import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import airplane from './image/airplane.png'
import './Api.css'
import React, { useEffect, useRef, useState } from 'react';
import {FaBars , FaTimes} from "react-icons/fa"
import LE from "leaflet";
import { OpenSkyApi } from 'opensky-api';
import {Marker} from "react-leaflet";
import * as L from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import RotatedMarker from 'leaflet-rotatedmarker';
import {ChakraProvider, Box, Text, Avatar, AvatarBadge, Stack } from '@chakra-ui/react'


const Api=()=>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      if (window.myGlobalLogin === true) {
        setIsLoggedIn(true);
      }
    }, []);
    

    const [planes, setPlanes] = useState([]);
    const [center] = useState([48.86411350753889, 2.328941978549886]);
    const planeIcon = new LE.Icon({
        iconUrl: require("./static/icons/plane.png"),
        iconSize: [10, 10]
    });
    const [search, setSearch] = useState('');
    const [result, setResult] = useState('France');
    const [searchResult, setSearchResult] = useState(null);
    //const [selectedPlaneTrajectory, setSelectedPlaneTrajectory] = useState(null);


    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setResult(search);
        console.log(result);
    };



    useEffect(() => {
        const api = new OpenSkyApi();
        api
            .getStates()
            .then((response) => {
                setPlanes(response.states);
                console.log(response.states);
            });
    }, []);


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       const api = new OpenSkyApi();
    //       api
    //         .getStates()
    //         .then((response) => {
    //           setPlanes(response.states);
    //           console.log(response.states);
    //         });
    //     }, 60000);
      
    //     return () => clearInterval(interval);
    //   }, []);


    const markers = planes.length > 0 && planes.map((plane) => {
        if (plane.latitude && plane.longitude && plane.originCountry===result) {
            const rotationAngle = 360 - plane.heading;
            return (
                    <Marker
                        key={plane.icao24}
                        position={[plane.latitude, plane.longitude]}
                        icon={planeIcon}
                        rotationAngle={rotationAngle}
                        //onClick={() => setSelectedPlaneTrajectory(plane.icao24)}
                        >
                        <L.Popup>
                            <div>
                                <h2>Informations sur le vol</h2>
                                <p className='info'>Numéro de vol: {plane.callsign}</p>
                                <p className='info'>Pays d'origine: {plane.originCountry}</p>
                                <p className='info'>Altitude: {plane.geoAltitude} mètres</p>
                                <p className='info'>Vitesse: {plane.velocity} km/h</p>
                                <p className='info'>Cap: {plane.heading} degrés</p>
                            </div>
                        </L.Popup>
                    </Marker>
                );
        }
        return null;
    });


    const navRef =useRef();

    const showNavbar =  ()=>{
        navRef.current.classList.toggle("responsive_nav"); 
    }
    return( 
        <>

        <ChakraProvider>
        <header>
            <a href="" className="logo"><img src={airplane} alt=""/>Flight Tracker</a>

            <nav ref={navRef }>
                {/* Show different links based on the user's login status */}
                {isLoggedIn ? (
                <>
                    <Link to="/ProjetWeb" class="nav-link">Accueil</Link>
                    <Link to="/api" class="nav-link">Carte</Link>
                    <Link to="/contact" class="nav-link">Contact</Link>
                    <Link to="/apropos" class="nav-link">A propos</Link>
                    <Link to={`/profil?id=${window.myGlobalLoginId}`} class="nav-link">
                        <Avatar src='https://bit.ly/broken-link' size="lg" >
                            <AvatarBadge boxSize="1em" bg="green.300"/>
                        </Avatar>
                    </Link>
                </>
                ) : (
                <>
                    <Link to="/ProjetWeb" class="nav-link">Accueil</Link>
                    <Link to="/api" class="nav-link">Carte</Link>
                    <Link to="/contact" class="nav-link">Contact</Link>
                    <Link to="/apropos" class="nav-link">A propos</Link>
                    <Link to="/connexion" class="nav-link">
                        <Avatar src='https://bit.ly/broken-link' size="lg" >
                            <AvatarBadge boxSize="1em" bg="tomato"/>
                        </Avatar>
                    </Link>
                        
                    
                </>
                )}
                <button className='nav-btn nav-close-btn' onClick={showNavbar}> 
                    <FaTimes /> 
                </button>
            </nav>
            <button className='nav-btn'  onClick={showNavbar} > 
            <FaBars /> 
            </button>     
            </header>
            </ChakraProvider>

         <section className="contain">
        

            <div>

            <L.MapContainer
                center={center}
                zoom={5}
                style={{ height: '65vh', width: '100wh', }} >
                <L.TileLayer
                    url="https://api.maptiler.com/maps/voyager-v2/{z}/{x}/{y}.png?key=cYHT2pYOApRNeD4phpPT"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />
                {markers}
                {/* ))} */}
            </L.MapContainer>

            <br />
            <br />
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Rechercher par pays d'origine"
                />

                <br />
                <br />
                <button type="submit" className='btn'>Rechercher</button>
            </form>


            </div>
        </section>

    <footer className="footer">
        <div className="box-container">

            <div className="box">
                <h3>navigation</h3>
                <Link to="/ProjetWeb" className="fas fa-arrow-right">Accueil</Link>
                <Link to="/api" className="fas fa-arrow-right">Carte</Link>
                <Link to="/contact" className="fas fa-arrow-right">Contact</Link>
                <Link to="/apropos" className="fas fa-arrow-right">A propos</Link>
                <Link to="/connexion" className="fas fa-arrow-right">Se connecter</Link>
            </div>

            <div className="box">
                <h3>Contact</h3>
                <p> 01 02 03 04 05</p>
                <p>143 avenue de Versaille, 75016 Paris</p>
                <p>jms@voirdesavions.fr</p>
            </div>

            <div className="box">
                <h3>Suivez-nous</h3>
                <a href="#"><i className="fab fa-linkedin-in"></i>linkedin</a>
                <a href="#"><i className="fab fa-facebook-f"></i>facebook</a>
                <a href="#"><i className="fab fa-instagram"></i>instagram</a>
                <a href="#"><i className="fab fa-twitter"></i>twitter</a>
            </div>
        </div>
        <div align="center"><div className="log"><a href="#" className="logo"><img src={airplane} alt=""/></a></div></div>
        <div className="credit">created by <span> Jordan | Sathusan | Mathis | </span></div>

    </footer>

    <script src="Home.js"></script>

        </>
    )
}

export default Api;