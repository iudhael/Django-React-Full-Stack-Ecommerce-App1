import React, { useState } from 'react'

import {useForm} from "react-hook-form"
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useNavigate, useParams, } from 'react-router-dom';
import api from "../../api"



export default function ResetPasswordConfirm() {
    const navigate = useNavigate()
    const datas = useParams()
    const uid = datas.uid
    const token = datas.token

    const {handleSubmit,register, watch, formState:{errors}} = useForm()
    const onSubmitPasswordReset = (data) => {
        //console.log(data)
        const reset_password_data = {new_password1 : data.new_password1, new_password2 : data.new_password2, uid : uid, token : token}
        //console.log(reset_password_data)

        if (data.new_password1 !== data.new_password2) {
            toast.error("Les mots de passe ne correspondent pas ")
           }
           else{
 
               api.post("dj-rest-auth/password/reset/confirm/", reset_password_data,)
               .then((res) => {
                   //console.log(res.data)
                   toast.success("Mot de passe réinitialisé")

                   
               })
               .catch((error) => {
               
                   //console.log(error.response)
                   toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
                   
                })
       
            }


  }




  return (
    <div>


<div className="container mx-auto ">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="form-box  p-5  col-md-6 ">
                    <h2 className="text-white">Réinitialisation du mot de passe</h2>
                    <form className='form-group' onSubmit={handleSubmit(onSubmitPasswordReset)}>
                        <div className="inputbox">
                            
                            <input name="new_password1" id="new_password1" type="password" className="input-group form-contro "  placeholder=' ' required
                            {...register("new_password1", {required: "Ce champ est obligatoire", minLength: {value: 8, message:"Veuillez utiliser un mot de passe de plus de 7 caracteres" }})}
                            aria-invalid={errors.new_password1 ? "true" : "false"}/>
                            <label htmlFor="">Mot de passe *</label>
                        </div>
                        {errors.new_password1 && (
                            <span className="text-white" role="alert">{errors.new_password1.message}</span>
                        )}

                        <div className="inputbox">
                            
                            <input name="new_password2" id="new_password2" type="password" className="input-group form-contro "  placeholder=' ' required
                            {...register("new_password2", {required: "Ce champ est obligatoire", minLength: {value: 8, message:"Veuillez utiliser un mot de passe de plus de 7 caracteres" }})}
                            aria-invalid={errors.new_password2 ? "true" : "false"}/>
                            <label htmlFor="">Confirmation du mot de passe *</label>
                        </div>
                        {errors.new_password2 && (
                            <span className="text-white" role="alert">{errors.new_password2.message}</span>
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
