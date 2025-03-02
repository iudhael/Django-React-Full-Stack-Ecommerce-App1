import React from 'react'
import { Navigate, } from 'react-router-dom'

export default function Protege({estConnecte, children}) {

    if(!estConnecte) 
    {
        return <Navigate to="/authentification/connexion"/>
        
        
        
    }

    
    
    
  return (

    <div>{children}</div>
  )
}
