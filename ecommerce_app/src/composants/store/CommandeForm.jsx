import React, { useEffect } from 'react'

import {useForm} from "react-hook-form"
import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useQueryClient, useQuery } from 'react-query';
import api from "../../api"


import './store_style.css'
export default function CommandeForm({ produit_detail }) {
    


    const navigate = useNavigate()
    const cartitems = useSelector((state) => state.cart)  
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user)
   
    const token = user.accessToken
    const headers = {'Authorization' : `Token ${token}`}
    //console.log(headers)
    const getUser = (headers) =>
    {
      
      return (api.get("api/dj-rest-auth/user/", { headers }).then((res) =>res.data).catch((error) => {
        
        //toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
        console.log(error.response)
        //navigate("/store/produits");
  
  
      }))
    }
    const {data:user_detail = [], isLoading} = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(headers),
        onerror: (error) => console.log(error),
        //onSuccess: () => 
        
      })

  
    const {handleSubmit,register, reset, formState:{errors}} = useForm()
  
        const onSubmit = (data) => {
            if(user.isAuthenticated){
            //reset()
        
                let PrixTotalParItem = parseFloat(data.quantity * produit_detail.price).toFixed(2)
                const commande_info = {user: user_detail.id, address: data.address, city: data.city, state: data.state, total_price : PrixTotalParItem}
                //console.log(commande_info)
                api.post("api/create-commande/", commande_info, { headers })
                .then((res) => {
                    //console.log(res.data)
                    
                    
                        const donne = { produit: produit_detail.id , order:res.data.id, quantity: data.quantity, total_price_per_item: PrixTotalParItem}
                        api.post("api/create/commande-item/", donne, { headers }).then((res) => {
                            //console.log(res.data)
                            toast.success("Commande lancé")
                            
                        }).catch((error) => {
                            toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")


                        })



                
                })
                .catch((error) => {
                    //console.log(error.response.data)
                    toast.error("Une erreur erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
                    
                })
            }
            else{
                navigate("/authentification/connexion")
                toast.error("Veuillez d'abord vous connecter.")
        
            }
        }




  

  return (
    <div className="container mt-5">
        <div className="row  d-flex justify-content-center align-items-center">
            <div className="col-lg-6 ">
                <div className="box-element" id="form-wrapper">
                    <form id="CommandeForm" onSubmit={handleSubmit(onSubmit)} >
                      
                        <div id="shipping-info">
                            <p>Information de commande:</p>
                            <hr/>
                            <div className=" my-2">
                                <input className="form-control" min="1" type="number" name="quantity" placeholder="Quantité.."
                                {...register("quantity", {required: "Ce champ est obligatoire", valueAsNumber: true,} )}
                                aria-invalid={errors.quantity ? "true" : "false"}/>
    
                            </div>
                            {errors.quantity && (
                            <span className="text-danger" role="alert">{errors.quantity.message}</span>
                            )}
                            
                            <div className=" my-2">
                                <input className="form-control" type="text" name="address" placeholder="Address.."
                                {...register("address", {required: "Ce champ est obligatoire", minLength: {value: 10, message:"Veuillez saisir une adresse de plus de 10 caracteres" }, 
                                maxLength: {value: 200, message:"Veuillez saisir une adresse de moins de 200 caracteres" }})}
                                aria-invalid={errors.address ? "true" : "false"}/>
    
                            </div>
                            {errors.address && (
                            <span className="text-danger" role="alert">{errors.address.message}</span>
                            )}

                            <div className=" my-2">
                                <input className="form-control" type="text" name="city" placeholder="City.."
                                {...register("city", {required: "Ce champ est obligatoire", minLength: {value: 2, message:"Veuillez saisir une adresse de plus de 2 caracteres" }, 
                                maxLength: {value: 20, message:"Veuillez saisir une adresse de moins de 20 caracteres" }})}
                                aria-invalid={errors.city ? "true" : "false"}/>
    
                            </div>
                            {errors.city && (
                            <span className="text-danger" role="alert">{errors.city.message}</span>
                            )}

                            <div className=" my-2">
                                <input className="form-control" type="text" name="state" placeholder="State.."
                                {...register("state", {required: "Ce champ est obligatoire", minLength: {value: 2, message:"Veuillez saisir une adresse de plus de 2 caracteres" }, 
                                maxLength: {value: 20, message:"Veuillez saisir une adresse de moins de 20 caracteres" }})}
                                aria-invalid={errors.state ? "true" : "false"}/>
    
                            </div>
                            {errors.state && (
                            <span className="text-danger" role="alert">{errors.state.message}</span>
                            )}



              

                          

                            
                        </div>
                        <hr/>
                        <input id="form-button" className="btn btn-success btn-block" type="submit" value="Lancer la commande"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
