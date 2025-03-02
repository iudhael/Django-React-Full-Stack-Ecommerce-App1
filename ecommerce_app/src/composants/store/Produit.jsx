import React, { useState, useEffect } from 'react'
import './store_style.css'
import { FaCartShopping } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import shirtImage from '../../assets/shirt.jpg';
import { Link, useNavigate } from 'react-router-dom';

import {useForm} from "react-hook-form"

import { useQueryClient, useQuery } from 'react-query';

import { useDispatch } from 'react-redux'

import toast from 'react-hot-toast';

import ReactPaginate from 'react-paginate';
import Pagination from '../commons/Pagination';

import api from "../../api"



export default function Produit() {



  const navigate = useNavigate()
  const dispatch = useDispatch();

  const {handleSubmit,register, formState:{errors}} = useForm()
    const onSubmit = (data) => {
        //console.log(data)
        api.get(`api/list-produit/?search=${data.search}`)
        .then((res) => {
            //console.log(res.data)
            if(res.data.results.length === 0)
            {
              toast.error("Aucun élément n'a été trouvé")
            }
            else{
              navigate(`/store/produits/search/${data.search}`)
              toast.success("Votre recherche a été une réussite")
              
            }
  
        })
        .catch((error) => {
            //console.log(data)
            //console.error("Erreur lors de la requête :", error.response.data)

            toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")

        })

    }




  const base_url = "http://127.0.0.1:8000/api/"

  /*const [produits, setProduits] = useState([])
  useEffect(() =>{

    axios.get(base_url+"list-produit/").then((res) =>{
      setProduits(res.data)
    
    }).catch((error) => {
      console.log(data)
      
      toast.error("Une erreur est survenue")
    })

  }, [])*/

  const [page, setPage] = useState(1)


  const getProduits = (page) =>
  {
    return (api.get(`api/list-produit/?page=${page}`).then((res) =>res.data))
  }



  //const queryClient = useQueryClient()
  const {data:produits = [], isLoading} = useQuery({
    queryKey: ["produits", page],
    queryFn: () => getProduits(page),
    onerror: (error) => {
      toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
      navigate("/store/produits");
      //console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    },
    //onSuccess: () => toast.success("Succès")
    
  })



  const handlePageClick = (pageNumber) => {
    setPage(pageNumber.selected + 1)
    //console.log(pageNumber.selected + 1)
  }
 

//console.log(isLoading)

//console.log(produits)

const page_count = Math.ceil(produits.count/3)




  


//console.log(currentPageProducts)



  return (





    <div>
        <div className="container ">
          <div className="row col-md-6 mx-auto">
            <form className='form-group ' onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex align-items-center justify-content-between ">
                <div className="inputbox">
                    
                  <input name="search" id="search" type="text" className="input-group"  placeholder=' ' required
                  {...register("search",)}/>
                  
                  <label htmlFor="search">Recherche</label>

                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-light fw-bold">Chercher</button>

                </div>
              </div>
            
            </form>
          </div>
        </div>
      
      <div className="row mt-5 mx-5 d-flex justify-content-center">



        {produits && produits.results && produits.results.map(produit => ( 
            <div key={produit.id} className="col-lg-4 col-md-5 mb-4">
                <img className="thumbnail" alt="T-shirt" src={produit.image}/>
                <div className="box-element product">
                    <h6><strong>{produit.name}</strong></h6>
                    <hr/>
                    <div className="d-flex justify-content-between">
                      
                        <div>
                                                    
                          <Link to={"/store/produits/"+produit.id+"/"} >
                            <button className="btn eyeClass">
                              <i className="text-white h5"><FaEye /></i><span className="mx-2 h5 text-white">voir </span>
                            </button>
                          </Link>

                        </div>
                

                  
                      <div>
                        <h4 style={{display: "inline-block", float: "right"}}><strong>${produit.price}</strong></h4>
                      </div>
                    </div>
                    

                </div>
              
            </div>

            

            
        
      ))}
      </div>




    

      <Pagination pageCount={page_count} handlePageClick={handlePageClick} />



    </div>
  )
}
