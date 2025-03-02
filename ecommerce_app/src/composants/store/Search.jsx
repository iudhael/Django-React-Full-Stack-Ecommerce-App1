import React, {useEffect, useState } from 'react'
import { useQueryClient, useQuery } from 'react-query';
import { useDispatch } from 'react-redux'
import { FaEye } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";


import { Link, redirect, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useForm} from "react-hook-form"
import toast from 'react-hot-toast';
import Pagination from '../commons/Pagination';
import api from "../../api"


export default function Search() {

    const navigate = useNavigate()
    const dispatch = useDispatch();


      
      const datas = useParams()
      //console.log(data)
      
      const [search, setSearch] = useState(datas.search)
      
      
    
    /*const [produits, setProduits] = useState([])
    useEffect(() =>{
  
        axios.get(`http://127.0.0.1:8000/api/list-produit/?search=${search}`)
        .then((res) => {
            console.log(res.data)
            setProduits(res.data)
            if(res.data.length === 0)
            {
              
              navigate("/store/produits/");
            }


        })
        .catch((error) => {
            
            

            toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
            
        })
    
    }, [])*/

    const [page, setPage] = useState(1)
    const {handleSubmit,register,watch , formState:{errors}} = useForm()
    const onSubmit = async (data) => {
      const newSearch = data.search;
      setSearch(newSearch); // Mettre à jour l'état avec le nouveau terme de recherche
    
      // Mettre à jour l'URL avec le nouveau terme de recherche
      navigate(`/store/produits/search/${newSearch}`);
    

      window.location.reload()

    

    }
    
    const getProduitsSearch =  async (search, page) =>
    {
        //console.log(search)

      const res = await api.get(`api/list-produit/?search=${search}&page=${page}`);
      return (res.data);


    }

    //const queryClient = useQueryClient()
    const {data:produits_search = [], isLoading} = useQuery({
      queryKey: ["produits_search", page],
      queryFn: () => getProduitsSearch(search, page),
      onerror: (error) => {
        toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
        //console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      },
      //onSuccess: () => toast.success("Succès")
      
    })




    
    const handlePageSearchClick = (pageNumber) => {
      setPage(pageNumber.selected + 1)
      //console.log(pageNumber.selected + 1)
    }
    const page_search_count = Math.ceil(produits_search.count/1)
  
    if(produits_search && produits_search.results && produits_search.results.length === 0)
    {
      navigate("/store/produits/")
      toast.error("Aucun élément n'a été trouvé")
    }





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



        {produits_search && produits_search.results && produits_search.results.map(produit=> ( 
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




    

    

        
    <Pagination pageCount={page_search_count} handlePageClick={handlePageSearchClick} />
   


    </div>

  )
}
