import React from 'react'

import '../ConnexionInscription.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa";


import {useForm} from "react-hook-form"
import toast from 'react-hot-toast';

import { Link, useNavigate } from 'react-router-dom';
import api from "../../../api"

export default function Inscription() {

    

    
    const navigate = useNavigate()

    const {handleSubmit,register, formState:{errors}} = useForm()
    const onSubmit = (data) => {
        
        if (data.password1 !== data.password2) {
         toast.error("Les mots de passe ne correspondent pas ")
        }
        else{
            api.post("api/dj-rest-auth/registration/", data)
            .then((res) => {
                //console.log(res)
                toast.success("Inscription réussi")
                navigate("/authentification/connexion")
                
            })
            .catch((error) => {
                if(error.response){
                    //console.log(data)
                    //console.error("Erreur lors de la requête :", error.response.data)
                   
                    let errorAucunChampMessages = []
                    let errorNomMessages = []
                    let errorPrenomMessages = []
                    let errorUsernameMessages = []
                    let errorTelMessages = []
                    let errorEmailMessages = []
                    let errorPassword1Messages = []
                    let errorPassword2Messages = []
                    let errorAutreMessages = []

                    if (error.response.data.non_field_errors) 
                    {
                        errorAucunChampMessages = errorAucunChampMessages.concat(error.response.data.non_field_errors.map((errorAucunChampMessage, index) => (
                            <li key={index} style={{ marginLeft: '20px' }}>{errorAucunChampMessage}</li>
                        )))

                    }
                    if (error.response.data.first_name) 
                    {
                        errorNomMessages = errorNomMessages.concat(error.response.data.last_name.map((errorNomMessage, index) => (
                            <li key={index} style={{ marginLeft: '20px' }}>{errorNomMessage}</li>
                        )))

                    }
                    if (error.response.data.last_name) 
                    {
                        errorPrenomMessages = errorPrenomMessages.concat(error.response.data.first_name.map((errorPrenomMessage, index) => (
                            <li key={index} style={{ marginLeft: '20px' }}>{errorPrenomMessage}</li>
                        )))

                    }
                    if (error.response.data.username) 
                    {
                        errorUsernameMessages = errorUsernameMessages.concat(error.response.data.username.map((errorUsernameMessage, index) => (
                            <li key={index} style={{ marginLeft: '20px' }}>{errorUsernameMessage}</li>
                        )))

                    }
                    if (error.response.data.user_info_tel) 
                    {
                        errorTelMessages = errorTelMessages.concat(error.response.data.user_info_tel.map((errorTelMessage, index) => (
                            <li key={index} style={{ marginLeft: '20px' }}>{errorTelMessage}</li>
                        )))

                    }
                    if (error.response.data.email) 
                    {
                        errorEmailMessages = errorEmailMessages.concat(error.response.data.email.map((errorEmailMessage, index) => (
                            <li key={index} style={{ marginLeft: '20px' }}>{errorEmailMessage}</li>
                        )))

                    }
                    if (error.response.data.password1) 
                    {
                        errorPassword1Messages = errorPassword1Messages.concat(error.response.data.password1.map((errorPassword1Message, index) => (
                            <li key={index} style={{ marginLeft: '20px' }}>{errorPassword1Message}</li>
                        )))

                    }
                    if (error.response.data.password2) 
                    {
                        errorPassword2Messages = errorPassword2Messages.concat(error.response.data.password2.map((errorPassword2Message, index) => (
                            <li key={index} style={{ marginLeft: '20px' }}>{errorPassword2Message}</li>
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
                                {error.response.data.first_name && (
                                    <>
                                        Nom :
                                        {errorNomMessages}
                                    </>
                                )}
                                {error.response.data.last_name && (
                                    <>
                                        Prénom :
                                        {errorPrenomMessages}
                                    </>
                                )}
                                {error.response.data.username && (
                                    <>
                                        Nom d'utilisateur :
                                        {errorUsernameMessages}
                                    </>
                                )}
                                {error.response.data.user_info_tel && (
                                    <>
                                        Tel :
                                        {errorTelMessages}
                                    </>
                                )}
                                {error.response.data.email && (
                                    <>
                                        Email :
                                        {errorEmailMessages}
                                    </>
                                )}
                                {error.response.data.password1 && (
                                    <>
                                        Mot de passe :
                                        {errorPassword1Messages}
                                    </>
                                )}
                                {error.response.data.passworde2 && (
                                    <>
                                        Confirmation du mot de passe :
                                        {errorPassword2Messages}
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
    }
    

  return (
    <div>
        <div className="container mx-auto mb-5">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="form-box p-5  col-md-6 ">
                    <h2 className="text-white">Inscription </h2>
                    <form className='form-group' onSubmit={handleSubmit(onSubmit)}>
                       
                        <div className="inputbox">
                            <i className="text-white h5"><FaUser /></i>
                            <input name="last_name" id="last_name" type="text" className="input-group " placeholder=' ' required
                            {...register("last_name", {required: "Ce champ est obligatoire", minLength: {value: 3, message:"Veuillez saisir un nom de plus de 2 caracteres" }})}
                            aria-invalid={errors.last_name ? "true" : "false"}/>
                            <label htmlFor="">Nom *</label>
                        </div>
                        {errors.lastname && (
                            <span className="text-white" role="alert">{errors.last_name.message}</span>
                        )}

                        <div className="inputbox">
                            <i className="text-white h5"><FaUser /></i>
                            <input name="first_name" id="first_name" type="text" className="input-group " placeholder=' ' required  
                            {...register("first_name", {required: "Ce champ est obligatoire", minLength: {value: 3, message:"Veuillez saisir un nom de plus de 2 caracteres" }})}
                            aria-invalid={errors.first_name ? "true" : "false"}/>
                            
                            <label htmlFor="first_name">Prénom *</label>
                        </div>
                        {errors.first_name && (
                            <span className="text-white" role="alert">{errors.first_name.message}</span>
                        )}
                        
                        <div className="inputbox">
                            <i className="text-white h5"><FaUser /></i>
                            <input name="username" id="username" type="text" className="input-group " placeholder=' ' required
                            {...register("username", {required: "Ce champ est obligatoire", minLength: {value: 4, message:"Veuillez saisir un nom d'utilisateur plus de 3 caracteres" }})}
                            aria-invalid={errors.username ? "true" : "false"}/>
                            <label htmlFor="username">Nom d'utilisateur *</label>
                        </div>
                        {errors.username && (
                            <span className="text-white" role="alert">{errors.username.message}</span>
                        )}

                        <div className="inputbox">
                            <i className="text-white h5"><FaPhone /></i>
                            <input name="user_info_tel" id="user_info_tel" type="tel" className="input-group " placeholder=' ' required
                            {...register("user_info_tel", {required: "Ce champ est obligatoire", pattern:"/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/"})}
                            aria-invalid={errors.user_info_tel ? "true" : "false"}/>
                            <label htmlFor="user_info_tel">Tel *</label>
                        </div>
                        {errors.user_info_tel && (
                            <span className="text-white" role="alert">{errors.user_info_tel.message}</span>
                        )}

                        <div className="inputbox">
                            <i className="text-white h5"><IoMdMail /></i>
                            <input name="email" id="email" type="email" className="input-group " placeholder=' ' required
                            {...register("email", {required: "Ce champ est obligatoire", pattern:"/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/"})}
                            aria-invalid={errors.email ? "true" : "false"}/>
                            <label htmlFor="email">Email *</label>
                        </div>
                        {errors.email && (
                            <span className="text-white" role="alert">{errors.email.message}</span>
                        )}

                        <div className="inputbox">
                            <i className="text-white h5"><FaLock /></i>
                            <input name="password1" id="password1" type="password" className="input-group  "  placeholder=' ' required
                            {...register("password1", {required: "Ce champ est obligatoire", 
                            pattern: "(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}",
                            
                            minLength: {value: 8, message:"Veuillez utiliser un mot de passe de plus de 7 caracteres" }})}
                            aria-invalid={errors.password1 ? "true" : "false"}/>
                            <label htmlFor="password1">Mot de passe *</label>
                        </div>
                        {errors.password1 && (
                            <span className="text-white" role="alert">{errors.password1.message}</span>
                        )}

                        <div className="inputbox">
                            <i className="text-white h5"><FaLock /></i>
                            <input name="password2" id="password2" type="password" className="input-group  " placeholder=' ' required 
                            {...register("password2", {required: "Confirmez votre mot de passe", minLength: {value: 8, message:"Veuillez utiliser un mot de passe de plus de 7 caracteres" }})}
                            aria-invalid={errors.password2 ? "true" : "false"}/>
                            
                            <label htmlFor="password2">Confirmation du mot de passe *</label>
                        </div>
                        {errors.password2 && (
                            <span className="text-white" role="alert">{errors.password2.message}</span>
                        )}

                        <div className="mt-4 text-white mb-3 text-end">
                            <p>Vous avez déjà un compte ! <Link className=" text-white text-decoration-none fw-bold" to="/authentification/connexion">Connexion</Link></p>
                        </div>
                        <div className="text-center mx-auto">
                            <button type="submit" className="btn btn-light btn-lg w-100">Inscription</button>

                        </div>

                    </form>
                </div>
       
            </div>
        </div>


    </div>
  )
}
