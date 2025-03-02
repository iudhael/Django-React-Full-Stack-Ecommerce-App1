import React, { useState } from 'react'

import {useForm} from "react-hook-form"
import toast from 'react-hot-toast';

import { useNavigate, } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { LogoutUser } from '../../Redux/UserSlice';
import api from "../../api"

export default function ChangePassword({ headers }) {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user) 


    const {handleSubmit,register, watch, formState:{errors}} = useForm()
    const onSubmitPasswordChange = (data) => {
        //console.log(data)

        if (data.new_password1 !== data.new_password2) {
            toast.error("Les mots de passe ne correspondent pas ")
           }
           else{
               api.post("api/rest-auth/password/change/", data, { headers })
               .then((res) => {
                   //console.log(res)
                   toast.success("Modification du mot de passe réussie")
                   dispatch(LogoutUser())
                   
                   

                   window.location.reload()
                   
               })
               .catch((error) => {
                    if(error.response){
                        //console.log(data)
                        //console.error("Erreur lors de la requête :", error.response.data)
        
                        let errorAucunChampMessages = []
                        let errorOldPasswordMessages = []
                        let errorPassword1Messages = []
                        let errorPassword2Messages = []

        
                        if (error.response.data.non_field_errors) 
                        {
                            errorAucunChampMessages = errorAucunChampMessages.concat(error.response.data.non_field_errors.map((errorAucunChampMessage, index) => (
                                <li key={index} style={{ marginLeft: '20px' }}>{errorAucunChampMessage}</li>
                            )))
        
                        }

                        if (error.response.data.old_password) 
                        {
                            errorOldPasswordMessages = errorOldPasswordMessages.concat(error.response.data.old_password.map((errorOldPasswordMessage, index) => (
                                <li key={index} style={{ marginLeft: '20px' }}>{errorOldPasswordMessage}</li>
                            )))
        
                        }

                        if (error.response.data.password1) 
                        {
                            errorPassword1Messages = errorPassword1Messages.concat(error.response.data.new_password1.map((errorPassword1Message, index) => (
                                <li key={index} style={{ marginLeft: '20px' }}>{errorPassword1Message}</li>
                            )))
        
                        }
                        if (error.response.data.password2) 
                        {
                            errorPassword2Messages = errorPassword2Messages.concat(error.response.data.new_password2.map((errorPassword2Message, index) => (
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

                                        {error.response.data.old_password && (
                                        <>
                                            Mot de passe :
                                            {errorOldPasswordMessages}
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
        
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modifier le Mot de passe</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                <form id="form" onSubmit={handleSubmit(onSubmitPasswordChange)}  >
                    
                    <div id="">

                        <div className=" my-2">
                            <input className="form-control" type="password" name="old_password" placeholder="old password.."
                            {...register("old_password", {required: "Ce champ est obligatoire", minLength: {value: 3, message:"Veuillez saisir une taille valide" }, 
                            })}
                            aria-invalid={errors.old_password ? "true" : "false"}/>

                        </div>
                        {errors.old_password && (
                        <span className="text-danger" role="alert">{errors.old_password.message}</span>
                        )}

                        <div className=" my-2">
                            <input className="form-control" type="password" name="new_password1" placeholder="new password.."
                            {...register("new_password1", {required: "Ce champ est obligatoire", minLength: {value: 3, message:"Veuillez saisir une taille valide" }, 
                            })}
                            aria-invalid={errors.new_password1 ? "true" : "false"}/>

                        </div>
                        {errors.new_password1 && (
                        <span className="text-danger" role="alert">{errors.new_password1.message}</span>
                        )}

                        <div className=" my-2">
                            <input className="form-control" type="password" name="new_password2" placeholder="new password.."
                            {...register("new_password2", {required: "Ce champ est obligatoire", minLength: {value: 3, message:"Veuillez saisir une taille valide" }, 
                            })}
                            aria-invalid={errors.new_password2 ? "true" : "false"}/>

                        </div>
                        {errors.new_password2 && (
                        <span className="text-danger" role="alert">{errors.new_password2.message}</span>
                        )}

                        

                

                        
                    </div>
                    <hr/>
                    <input id="form-button" className="btn btn-success btn-block" type="submit" value="Modifier"/>
                </form>






                </div>
                
                </div>
            </div>
            </div>

    </div>
  )
}
