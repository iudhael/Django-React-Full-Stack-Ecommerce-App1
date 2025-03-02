import React, { useEffect, useState } from 'react'

import shirtImage from '../../assets/shirt.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {useForm} from "react-hook-form"
import { useQueryClient, useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import api from "../../api"

export default function ItemCommande() {

const navigate = useNavigate()
const datas = useParams()
const commande_id = datas.id_commande

const user = useSelector((state) => state.user) 
const token = user.accessToken
const headers = {'Authorization' : `Token ${token}`}

//update eta de la commande
const {handleSubmit,register, formState:{errors}} = useForm()
const onSubmit = (data) => {
   //console.log(data)
   const donne = {"eta" : data.eta}
   api.patch(`api/update-commande/${commande_id}/`, donne, {headers}).then((res) =>{
    navigate("/admin-ecommerce/commande-list")
   })

 }


 

 const getCommandeItems = (id, headers) =>
 {
   return (api.get(`api/detail/commande-item/?order=${id}`, { headers }).then((res) =>res.data)).catch(errors => {
    toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
    navigate("/store/produits")
   })
 }

//const [commandes, setCommandes] = useState([])
 const queryClient = useQueryClient()
 const {data:items = [], isLoading} = useQuery({
    queryKey: ["commandes"],
    queryFn: () => getCommandeItems(commande_id, headers),
    onerror: (error) => {
        toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
        navigate("/store/produits")
        //console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    },
    onSuccess: () => toast.success("Succès")
   
 })
 //console.log(items)


  return (
    <div className="container mt-5 ">
          
        <div className="row">
            <div className="col-lg-12">
                <div className="box-element"> 
                    <div className="">
                        <h5 >username</h5>
                    </div>
                    <div className=" p-5 d-flex justify-content-between align-items-center">
                     
                        <div>
                            <h5>Total:<strong> $total price</strong></h5>
                        </div>
                        <div>
                            <form className=' form-group' onSubmit={handleSubmit(onSubmit)}>
                                <div className="d-flex justify-content-between">
                                    <div className="mx-2">
                                        <select className="form-select" name="eta" id="eta" {...register("eta")}>
                                            <option value="livrer">LIVRER</option>
                                            <option value="non-livrer">NON LIVRER</option>
                                        </select>

                                    </div>

                                    <div className="text-center ">
                                        < button type="submit" className="btn eyeClass text-white ">OK</button>

                                    </div>
                                </div>
                    
                            </form>
                      
                        </div>
                        
                    </div>
                </div>

                <br/>

                    <div className="box-element ">
                    <div className="table-responsive">
                        <table className="table text-center">
                        <thead className="thead-dark">
                            <tr>
                            
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">Nom produit</th>
                            <th scope="col">quantité</th>
                            <th scope="col">prix</th>
                            <th scope="col">Total</th>
                            
                            </tr>
                        </thead>
                        <tbody >
                            
                            {items.map((item) => 
                                <tr key={item.id}>
                                
                                    <td><div className="mt-3" >1</div></td>
                                    <th scope="row" ><div><img className="row-image" alt={item.produit_image} src={item.produit_image}/></div></th>
                                    <td><div className="mt-3" >{item.produit_name}</div></td>
                                    <td><div className="mt-3" >{item.quantity}</div></td>
                                    <td><div className="mt-3" >{item.produit_price}</div></td>
                                    <td><div className="mt-3" >{item.total_price_per_item}</div></td>
                                </tr>

                            )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
