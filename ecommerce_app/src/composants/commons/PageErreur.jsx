import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function PageErreur() {
    const erreur = useRouteError()
  return (
    <div>
        <h1 className="text-white">Il y a une erreur</h1>
        <p className="text-white">
            <i>{erreur.statusText || erreur.message}</i>
            <br/>
            <i>{erreur.statusText}</i>
            <br/>
            <i>{erreur.message}</i>
        </p>
    </div>
  )
}
