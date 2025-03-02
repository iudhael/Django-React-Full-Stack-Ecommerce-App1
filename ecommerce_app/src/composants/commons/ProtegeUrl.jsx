import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtegeUrl({estConnecte, children}) {

    if(estConnecte) 
    {
        return <Navigate to="/store/produits"/>
    }


  return (
    <div>{children}</div>
  )
}
