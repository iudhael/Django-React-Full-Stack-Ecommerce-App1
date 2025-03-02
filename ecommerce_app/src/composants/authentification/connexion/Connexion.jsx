import React, { useEffect } from 'react'
import '../ConnexionInscription.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

import {useForm} from "react-hook-form"
import toast from 'react-hot-toast';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { LoginUser } from '../../../Redux/UserSlice';
import api from "../../../api"

export default function Connexion() {


    /*const getCookie = (name) =>{
        const cookiString = document.cookie
        const cookies = cookiString.split('; ')
        for (let cookie of cookies){
            const [cookieName, cookieValue] = cookie.split('=')
            if(cookieName === name){
                return decodeURIComponent(cookieValue)
            }
        }
        return null
    }
    console.log(getCookie('my-app-auth'))
    */

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user) 
    //console.log(user.accessToken)
  
    
    const navigate = useNavigate()
    useEffect(() =>{
        if(localStorage.getItem("ConnecteKey"))
        {
            navigate("/store/produits")
            
        }
    })


    const {handleSubmit,register, formState:{errors}} = useForm()
    const onSubmit = (data) => {

        api.post("dj-rest-auth/login/", data)
        .then((res) => {
            //console.log(res)
            console.log(data.username)
            const access_info = {key : res.data.key, username: data.username}
            dispatch(LoginUser( access_info ))
            //localStorage.setItem("ConnecteKey", JSON.stringify(res.data.key))
            toast.success("Connexion réussi")
            navigate("/store/produits")
            
        })
        .catch((error) => {
            //console.log(data)
            //console.error("Erreur lors de la requête :", error.response.data)

            if(error.response){
                let errorAucunChampMessages = []
        
                //console.log(error)
                if (error.response.data.non_field_errors) 
                {
                    errorAucunChampMessages = errorAucunChampMessages.concat(error.response.data.non_field_errors.map((errorAucunChampMessage, index) => (
                        <li key={index} style={{ marginLeft: '20px' }}>{errorAucunChampMessage}</li>
                    )))

                }
                
                toast.error(
                    <div>
                        <ul>
                        
                            {error.response.data.non_field_errors && (
                                <>
                                    Non field error :
                                    {errorAucunChampMessages}
                                </>
                            )}
                            
                            
                        </ul>
                        
                        {(error.response.status === 404 || error.response.status === 500) && (
                            <>
                                Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.
                            </>
                        )}
                        
                        
                    </div>

                    
                )
                

            }
        })
    
        
    }


  return (
    <div className='bg-image'>
        <div className="container mx-auto ">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="form-box  p-5  col-md-6 ">
                    <h2 className="text-white">Connexion </h2>
                    <form className='form-group' onSubmit={handleSubmit(onSubmit)}>
                        <div className="inputbox">
                            <i className="text-white h5"><FaUser /></i>
                            <input name="username" id="username" type="text" className="input-group form-contro"  placeholder=' ' required
                            {...register("username", {required: "Ce champ est obligatoire", minLength: {value: 4, message:"Veuillez saisir un nom d'utilisateur plus de 3 caracteres" }})}
                            aria-invalid={errors.username ? "true" : "false"}/>
                            <label htmlFor="username">Nom d'utilisateur *</label>

                            
                        </div>
                        {errors.username && (
                            <span className="text-white" role="alert">{errors.username.message}</span>
                        )}
                        <div className="inputbox">
                            <i className="text-white h5"><FaLock /></i>
                            <input name="password" id="password" type="password" className="input-group form-contro "  placeholder=' ' required
                            {...register("password", {required: "Ce champ est obligatoire", minLength: {value: 8, message:"Veuillez utiliser un mot de passe de plus de 7 caracteres" }})}
                            aria-invalid={errors.password ? "true" : "false"}/>
                            <label htmlFor="">Mot de passe *</label>
                        </div>
                        {errors.password && (
                            <span className="text-white" role="alert">{errors.password.message}</span>
                        )}
                        
                        <div className="d-flex justify-content-end text-white mb-3">
                            <div className="text-white">
                                <Link className=" text-white text-decoration-none fw-bold" to="/reset-password-email" >Mot de passe oublier !</Link>
                            </div>
                            
                        
                        </div>
                        <div className="text-center mx-auto">
                            <button type="submit" className="btn btn-light btn-lg w-100">Connexion</button>

                        </div>
                        <div className="mt-4 text-white text-center">
                            <p >Vous n'avez pas de compte ! <Link className=" text-white text-decoration-none fw-bold" to="/authentification/inscription">Inscription</Link></p>
                        </div>
                    </form>
                </div>
       
            </div>
        </div>

    </div>
  )
}
