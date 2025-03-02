
import React, { useEffect } from 'react'
import {useForm} from "react-hook-form"
import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { useQueryClient, useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux'
import { LogoutUser } from '../../Redux/UserSlice';
import  ChangePassword  from './ChangePassword';
import api from "../../api"

export default function Profil() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user) 
  //console.log(user.accessToken)
  


  
  const token = user.accessToken
  const headers = {'Authorization' : `Token ${token}`}
  //console.log(headers)
  const getUser = (headers) =>
  {
    
    return (api.get("api/dj-rest-auth/user/", { headers }).then((res) =>res.data))
  }


  //const queryClient = useQueryClient()
  const {data:user_detail = [], isLoading} = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(headers),
    onerror: (error) => {
        toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
        navigate("/store/produits")
        //console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      },
      onSuccess: () => toast.success("Succès")
    
  })

//console.log(user_detail)



//console.log(user_detail)


const {handleSubmit,register, watch, formState:{errors}} = useForm({
    values : {
        last_name: user_detail.last_name,
        first_name : user_detail.first_name,
        email : user_detail.email,
        tel : user_detail.user_info_tel,
    }
})
  const onSubmit = (data) => {
        //console.log(data)


        const profil = {first_name : data.first_name, last_name : data.last_name, email : data.email}

            
          api.put(`api/authentification/update-user/${user_detail.id}/`, profil)
          .then((res) => {
              //console.log(res)
              api.put(`api/authentification/update-user-tel/${user_detail.user_info_id}/`, {tel: data.tel})
              .then((res) => {
                //console.log(res)
                  //console.log(res.response.data.tel)
                  toast.success("Profil modifié")
                  
                  
              }).catch((error) => {
                //console.log(data)
                if(error.response){
                    //console.error("Erreur lors de la requête :", error.response.data)
    
                    let errorAucunChampMessages = []

                    let errorTelMessages = []
                    
                    let errorAutreMessages = []
    
                    if (error.response.data.non_field_errors) 
                    {
                        errorAucunChampMessages = errorAucunChampMessages.concat(error.response.data.non_field_errors.map((errorAucunChampMessage, index) => (
                            <li key={index} style={{ marginLeft: '20px' }}>{errorAucunChampMessage}</li>
                        )))
    
                    }
    
                    if (error.response.data.tel) 
                    {
                    errorTelMessages = errorTelMessages.concat(error.response.data.tel.map((errorTelMessage, index) => (
                            <li key={index} style={{ marginLeft: '20px' }}>{errorTelMessage}</li>
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
                        
                                {error.response.data.user_info_tel && (
                                        <>
                                            Email :
                                            {errorTelMessages}
                                        </>
                                    )}
                        
                            
                            </ul>
                        
                            {(error.response.status === 404 || error.response.status === 400 || error.response.status === 500) && (
                                <>
                                    Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.
                                </>
                            )}
                            
                            
                        </div>
    
                        
                    )
                
            }
    
                })
                
          })
          .catch((error) => {
            if(error.response){
                //console.log(data)
                //console.error("Erreur lors de la requête :", error.response.data)

                let errorAucunChampMessages = []
                let errorNomMessages = []
                let errorPrenomMessages = []
                let errorUsernameMessages = []
                let errorEmailMessages = []
                let errorTelMessages = []
                
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
            
                if (error.response.data.email) 
                {
                    errorEmailMessages = errorEmailMessages.concat(error.response.data.email.map((errorEmailMessage, index) => (
                        <li key={index} style={{ marginLeft: '20px' }}>{errorEmailMessage}</li>
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
                    
                            {error.response.data.email && (
                                <>
                                    Email :
                                    {errorEmailMessages}
                                </>
                            )}
                            
                    
                        
                            
                        </ul>
                        
                        {(error.response.status === 404 || error.response.status === 400 || error.response.status === 500) && (
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
    <div>


   
      <div className="container mx-auto mb-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="p-5  col-md-8 ">
            <h2 className="text-white">Profil </h2>
              

                <div className="col-md-12">
                {user_detail &&
                    <form className='form-group' onSubmit={handleSubmit(onSubmit)}>
                        
                    <div className="inputbox">         
                        <input name="last_name" id="last_name" type="text" className="input-group " defaultValue={user_detail.last_name} required
                        {...register("last_name", {minLength: {value: 3, message:"Veuillez saisir un nom de plus de 2 caracteres" }})}
                        aria-invalid={errors.last_name ? "true" : "false"}/>
                        <label htmlFor="">Nom *</label>
                    </div>
                    {errors.last_name && (
                        <span className="text-white" role="alert">{errors.last_name.message}</span>
                    )}

                    <div className="inputbox">
                        
                        <input name="first_name" id="first_name" defaultValue={user_detail.first_name} type="text" className="input-group " required  
                        {...register("first_name", {minLength: {value: 3, message:"Veuillez saisir un nom de plus de 2 caracteres" }})}
                        aria-invalid={errors.first_name ? "true" : "false"}/>
                        
                        <label htmlFor="first_name">Prénom *</label>
                    </div>
                    {errors.first_name && (
                        <span className="text-white" role="alert">{errors.first_name.message}</span>
                    )}
                    
                

                    <div className="inputbox">
                        
                        <input name="email" id="email" type="email" defaultValue={user_detail.email} className="input-group " required
                        {...register("email", {pattern:"/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/"})}
                        aria-invalid={errors.email ? "true" : "false"}/>
                        <label htmlFor="email">Email *</label>
                    </div>
                    {errors.email && (
                        <span className="text-white" role="alert">{errors.email.message}</span>
                    )}

                    <div className="inputbox">
                        
                        <input name="tel" id="tel" defaultValue={user_detail.user_info_tel} type="text" className="input-group " required
                        {...register("tel", {pattern:"/^\+\d{11}$/"})}
                        aria-invalid={errors.tel ? "true" : "false"}/>
                        <label htmlFor="tel">Tel *</label>
                    </div>
                    {errors.tel && (
                        <span className="text-white" role="alert">{errors.tel.message}</span>
                    )}

                    <div className="text-center mx-auto">
                        <button type="submit" className="btn btn-light btn-lg w-100">Editer</button>

                    </div>

                    </form>
                }
                <div>
                    <button type="button" className="btn btn-light btn-lg w-100 mt-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Modifier le mot de passe
                    </button>
                </div>
              </div>
            
            
          </div>

        </div>
      
      </div>






     <ChangePassword headers= {headers}/>




















    </div>
  )
}
