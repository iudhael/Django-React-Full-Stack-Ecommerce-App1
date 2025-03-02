import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useQueryClient, useQuery } from 'react-query';
import toast from 'react-hot-toast';

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import api from "../../api"

export default function CommandeList() {

  

 /* const [commandes, setCommandes] = useState([])
  //afficher commande en attente
  useEffect(() =>{

    axios.get("http://127.0.0.1:8000/api/list-commande/?eta=attente").then((res) =>{
      setCommandes(res.data)
      console.log(res.data)
    }).catch((error) => {
      console.log(error.response.data)
      
      toast.error("Une erreur est survenue")
    })

  }, [])
  */

  const navigate = useNavigate()
  const user = useSelector((state) => state.user) 
  const token = user.accessToken
  const headers = {'Authorization' : `Token ${token}`}
  
const getCommandes = (headers) =>
{
  return (api.get("api/list-commande/?eta=attente", { headers }).then((res) =>res.data)).catch(errors => {
    toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
    navigate("/store/produits")
   })
}

//const [commandes, setCommandes] = useState([])
  const queryClient = useQueryClient()
  const {data:commandes = [], isLoading} = useQuery({
    queryKey: ["commandes"],
    queryFn: () => getCommandes(headers),
    onerror: (error) => {
      toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
      navigate("/store/produits")
      //console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    },
    onSuccess: () => toast.success("Succès")
    
  })
  


  return (
    <div>
      
      <div className="box-element ">
        <div className="table-responsive">
            <table className="table text-center">
              <thead className="thead-dark">
                <tr>
                  
                  <th scope="col"></th>
                  <th scope="col">Username</th>
                  <th scope="col">date</th>
                  
                  <th scope="col">Numero</th>
                  <th scope="col">Adresse</th>
                  <th scope="col">Total</th>
                  <th scope="col">Voir</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody >
              {commandes.map((commande) => ( 
                    <tr key={commande.id}>
                      
                      <td><div className="mt-4" >1</div></td>
                      <td><div className="mt-4" ><p>{commande.username}</p></div></td>
                      
                      <td><div className="mt-4" ><p>{commande.date_ordered}</p></div></td>
                      
                      <td><div className="mt-4" ><p>+229 50698745</p></div></td>
                      <td><div className="mt-4" ><p>{commande.address}</p></div></td>
                      <td><div className="mt-4" ><p>${commande.total_price}</p></div></td>
                      <td>
                        <div className="mt-3" >
                          <Link to={"/admin-ecommerce/commande-list/items/"+ commande.id} >
                            <button className="btn eyeClass">
                              <i className="text-white h5"><FaEye /></i>
                            </button>
                          </Link>
                        </div>
                      </td>

                      <td>
                        <div className="mt-3 fw-bold" >
                          {commande.eta}
                        </div>
                      </td>
                      
      
                      
                    </tr>
              ))}
                

              </tbody>
            </table>
        </div>
    </div>

    </div>
  )
}
