import React, { useEffect, useState } from 'react'

import { FaCartShopping } from "react-icons/fa6";

import shirtImage from '../../assets/shirt.jpg';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import toast from 'react-hot-toast';
import { useQueryClient, useQuery } from 'react-query';
import CommandeForm from './CommandeForm';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import api from "../../api"






export default function DetailProduit() {
 


  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleAddItem = (produit) => {
    dispatch(addItem( produit ));
  };
  
  const datas = useParams()
  //console.log(datas)
  const id_produit = datas.id_produit


  /*const [produit_detail, setProduitDetail] = useState([])
  useEffect(() =>{

    axios.get(base_url+"detail/produit/"+id_produit+"/").then((res) =>{
      setProduitDetail(res.data)
      }).catch((error) => {
        console.log(data)
        console.error("Erreur lors de la requête :", error.response.data)

        toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
        navigate("/store/produits");


    })

  }, [])*/


  const getProduitDetail = (id) =>
  {
    return (api.get("api/detail/produit/"+id+"/").then((res) =>res.data))
  }


  //const queryClient = useQueryClient()
  const {data:produit_detail = [], isLoading} = useQuery({
    queryKey: ["produit_detail"],
    queryFn: () => getProduitDetail(id_produit), 
    onerror: (error) => {
      toast.error("Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.")
      navigate("/store/produits");
      //console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    },
    //onSuccess: () => toast.success("Succès")
    
  })





    
  return (
    <div className="container mt-5 ">

      {
      <div className="row  d-flex justify-content-between">
        
          
          
        <div className="col-lg-5 col-md-12  mb-4 ">
          
          <div className="row d-flex justify-content-center mt-4">
            <Carousel 
              
              infiniteLoop thumbWidth={100}
              showIndicators={false}
              showStatus={false}
              dynamicHeight={true}
              animationHandler="fade" 
              swipeable={false}

              renderArrowPrev ={ (clickHandler, hasPrev, label) => 
                (
                  <span type="button" onClick={clickHandler}  className="custom-arrow custom-arrow-prev d-flex p-1 h2 text-secondary">
                    
                    <FaCircleChevronLeft />
                  </span>
                )
                }
          
                renderArrowNext ={ (clickHandler, hasNext, label) => 
                  (
                    <span type="button" onClick={clickHandler} className="custom-arrow custom-arrow-next d-flex p-1  h2 text-secondary">
                      
                      <FaCircleChevronRight />
                    </span>
                  )
                  }

              
              >


              {produit_detail && produit_detail.detail_produit_images && produit_detail.detail_produit_images.map(image_detail => (
                <div key={image_detail.id} className="">
                  
                    <img className="" alt={produit_detail.name} src={image_detail.image}/>
                
                </div>
                
            
              ))}    

            </Carousel>
            <div className="mx-2 mt-4" >
              <a href="#CommandeForm">
                <button className="btn eyeClass text-white fw-bold btn-lg w-100" >
                  Acheter maintenant
                </button>
              </a>
            </div>

          </div>                
        </div>
            
              
              
        <div className="fw-bold fs-5   text-white col-lg-6 col-md-12" >
          <h2><strong>{produit_detail.name}</strong></h2>
          
          <p className="" style={{textAlign : "justify"}}>{produit_detail.description}</p>
          <div className="box-element product text-dark">
            
            
            <div className="d-flex justify-content-center">
                      
              <div className='pt-2'>
                <h4 ><strong>${produit_detail.price}</strong></h4>
              </div>
            </div>
          </div> 
          
        </div>
        
        
      </div>}

      <CommandeForm produit_detail={ produit_detail }/>


    </div>
  )
}
