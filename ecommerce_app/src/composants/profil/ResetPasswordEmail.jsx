import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import toast from 'react-hot-toast';

import { useNavigate, } from 'react-router-dom';
import api from "../../api"


export default function ResetPasswordEmail() {

    const navigate = useNavigate()



    const {handleSubmit,register, watch, formState:{errors}} = useForm()
    const onSubmitPasswordReset = (data) => {
        //console.log(data)
            toast.success("Un instant !")
               api.post("dj-rest-auth/password/reset/", data,)
               .then((res) => {
                   //console.log(res)
                   toast.success("Vérifier votre boite email")

                   
               })
               .catch((error) => {
                   //console.log(data)
                   //console.error("Erreur lors de la requête :", error.response.data)
                   toast.success("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
   
                   let errorAucunChampMessages = []
                   let errorOldPasswordMessages = []
                   let errorPassword1Messages = []
                   let errorPassword2Messages = []

   
                   /*if (error.response.data.non_field_errors) 
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

                                {error.response.data.old_password && (
                                   <>
                                       Mot de passe :
                                       {errorOldPasswordMessages}
                                   </>
                               )}
                               
                              
   
                             
                           </ul>
                          
                           {(error.response.status === 404 || error.response.status === 500) && (
                               <>
                                   Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.
                               </>
                           )}
                           
                           
                       </div>
   
                       
                   )*/
                  
   
   
               })
       
           


  }




  return (
    <div>


<div className="container mx-auto ">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="form-box  p-5  col-md-6 ">
                    <h2 className="text-white">Réinitialisation du mot de passe </h2>
                    <form className='form-group' onSubmit={handleSubmit(onSubmitPasswordReset)}>

                        <div className="inputbox">
                            
                            <input name="email" id="email" type="email" className="input-group " placeholder=' ' required
                            {...register("email", {required: "Ce champ est obligatoire", pattern:"/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/"})}
                            aria-invalid={errors.email ? "true" : "false"}/>
                            <label htmlFor="email">Email *</label>
                        </div>
                        {errors.email && (
                            <span className="text-white" role="alert">{errors.email.message}</span>
                        )}
                    
                        

                        <div className="text-center mx-auto">
                            <button type="submit" className="btn btn-light btn-lg w-100">Envoyer</button>

                        </div>
                        
                    </form>
                </div>
       
            </div>
        </div>


    </div>
  )
}
