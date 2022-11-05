import React from 'react'
import {GiClothes} from "react-icons/gi"
import { Link } from 'react-router-dom';
import "./Home.scss";
import heroImg from "../../assets/inv-img.png"


const Home = () => {
  return (
    <div className="home">
        <nav className="container --flex-between">
        <div className="logo">
            <GiClothes size={35}/>
        </div>
        <ul className="home-links">
            <li>
                <Link to ="/register">
                    Register
                  </Link>  
            </li>
            <li>
                <button className="--btn --btn-primary">
                <Link to ="/login"> Login </Link>  
                </button>
            </li>
            <li>
                <button className="--btn --btn-primary">
                <Link to ="/dashboard"> Dashboard </Link>  
                </button>
            </li>
            </ul>
        </nav>
 {/* HERO SECTION */}
 <section className="container hero">
        <div className="hero-text">
          <h2>Transport Management</h2>
          <p>
Transportation management systems play a central role in supply chains, affecting every part of the process from 
planning and procurement to logistics and lifecycle management. The broad and deep visibility afforded by a powerful 
system leads to more efficient transportation planning and execution, which results in higher customer satisfaction. 
That, in turn, leads to more sales, helping businesses grow. With such a dynamic global trade environment that we live 
and transact in, it is important to have a system that will allow you to successfully navigate complicated processes 
around trade policies and compliance.
          </p>
          <img src={heroImg} alt="Inventory" />
          </div>
          <div className="hero-image">
          
        </div>
     </section>
    </div>
  );
};

export default Home;