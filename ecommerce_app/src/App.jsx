import { useEffect, useState } from 'react'
import "./App.css"

import {BrowserRouter, Outlet} from 'react-router-dom'
import { FaChevronCircleUp } from "react-icons/fa"


import NavBar from './composants/commons/NavBar'
import Footer from './composants/commons/Footer'

import Rout from './composants/commons/Rout'


function App() {
  
  const [BackToTopButton, setBackToTopButton] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 150)
      {
        setBackToTopButton(true)
      }
      else{
        setBackToTopButton(false)
      }
    })
  }, [])
  
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    
    })
  }

  return (
    <>
   
   <BrowserRouter>
    <NavBar />
    <Rout/>
   </BrowserRouter>



   {BackToTopButton && (<span onClick={() => scrollUp()}  id="myBtn" title="Go to top"><i className="text-white h1"><FaChevronCircleUp /></i></span>) }


   <Footer/>



      
     

    </>
  )
}

export default App
