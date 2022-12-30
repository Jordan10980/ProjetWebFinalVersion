import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import aviongif from './image/avion.gif'
import image1 from './image/image1.jpeg'
import avion from './image/avion.png'
import airplane from './image/airplane.png'
import './Accueil.css'
import React, { useEffect, useRef, useState } from 'react';
import {FaBars , FaTimes} from "react-icons/fa"
import {ChakraProvider, Box, Text, Avatar, AvatarBadge, Stack } from '@chakra-ui/react'


const Accueil=()=>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  if (window.myGlobalLogin === true) {
    setIsLoggedIn(true);
  }
}, []);

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
        

        <section className="home" id="home">
            <a href="#"/>
            <div className="content">
                <h3>Suivez n'importe quel avion</h3>
                <Link to="/api" className="btn">En savoir plus</Link>
            </div>

            <div className="image">   
                <img src={aviongif} alt=""/>
            </div>

            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>

        </section>
       
        <section className="second">
            <h3>Bienvenue dans le suivi des vols en temps réel </h3>
            <p>Vous recherchez un avion ? Vous voulez savoir la position exacte d'un avion? Grâce à notre site web, accéder aux informations en temps réel de la position de l'avion sur la carte, le temps de trajet restant, le point de départ et d'arrivée,
                et tant d'autres en 1 clic. </p>
        </section>

        <section className="third">
            <div className="text">
                <h3>Restez informé sur l'évolution d'un vol</h3>
                <p>Suivez de bout en bout les trajets des avions de type commerciaux, cargo ou encore privés. Consultez tout l'actualité liée à votre vol en un clic. </p>
            </div>
            <div className="images">
                <img src={image1} alt=""/>
            </div>
        </section>

        <section className="fourth">
            <div className="text">
            <h3> Comment ça marche ? </h3>
            <p>Grâce à notre page API et notre carte intégrer, vous pouvez voir l'icone de l'avion et suivre son avancé.
                De plus en cliquant sur l'icone de l'avion, vous pouvez voir ses informations tel que son point de départ et d'arrivé.  
                </p>
            </div>
            <div className="images">
                <img src={avion} alt=""/>
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


export default Accueil;