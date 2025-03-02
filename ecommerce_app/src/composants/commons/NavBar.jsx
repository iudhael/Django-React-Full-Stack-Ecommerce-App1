import React, { useState } from 'react'
import './NavbarFooter.css'
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { LogoutUser } from '../../Redux/UserSlice';
import { LoginUser } from '../../Redux/UserSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import api from "../../api"

export default function NavBar() {

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const Logout = () =>
    {
        
        let headers = {
            'Authorization' : `Token ${user.accessToken}`
        }
        api.post("api/dj-rest-auth/logout/", {}, {headers})
        .then((res) =>
        {
            dispatch(LogoutUser())
            //console.log(res)
            toast.success("Déconnexion réussie")
            navigate("/store/produits")

            
        })
        .catch((error) =>
        {
            //console.log(error.response.data)
            toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard."
 
            )
        })
    }



    
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg  pt-4 pb-4">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="#">Ecommerce</a>

                <button className="navbar-toggler navbar-light bg-white" type="button" data-toggle="collapse" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <ul className="navbar-nav m-auto ">
                        <li className="nav-item"  >
                            <NavLink to="/store/produits" className={({ isActive }) => isActive ? "nav-link text-white active" : "nav-link text-white"} >Accueil </NavLink>
                            
                        </li>

                
           
                        
                    </ul>

                    <ul className="navbar-nav ">
                        
                        
                            
                        {! user.isAuthenticated ?
                        (<>
                                <li className="nav-item" >

                                    <NavLink to="/authentification/connexion" className={({ isActive }) => isActive ? "nav-link text-white active" : "nav-link text-white"}   >Connexion</NavLink>

                                </li>
                                <li className="nav-item" >

                                    <NavLink to="/authentification/inscription" className={({ isActive }) => isActive ? "nav-link text-white active" : "nav-link text-white"}  >Inscription</NavLink>
                            
                                </li>
                      
                            </>) :( <>
                                <li className="nav-item" >
                                    <NavLink to="/profil" className={({ isActive }) => isActive ? "nav-link text-white active" : "nav-link text-white"} >
                                        <i className="fa-solid fa-user text-white"></i>
                                        {user.username}
                                    </NavLink>
                                </li>
                                <li className="nav-item" >
                                    <span  className="nav-link text-white" style={{cursor : "pointer"}} onClick={() => Logout()} >
                                        <i className="text-white h5 "><FiLogOut /></i> LogOut
                                    </span>
                                </li>
                            </>
                        )}


                    
                


                
                

                    </ul>
                </div>
            </div>
        </nav>


    </header>


    </div>
  )
}
