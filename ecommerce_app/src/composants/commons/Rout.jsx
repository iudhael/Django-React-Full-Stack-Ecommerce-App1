import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Produit from '../store/Produit'
import Connexion from '../authentification/connexion/Connexion'
import Inscription from '../authentification/inscription/Inscription'

import Profil from '../profil/Profil'
import DetailProduit from '../store/DetailProduit'
import CommandeForm from '../store/CommandeForm'
import CommandeList from '../admin/CommandeList'
import Erreur404 from './Erreur404.jsx'
import ItemCommande from '../admin/ItemCommande'
import Search from '../store/Search'
import { useSelector } from 'react-redux'
import Protege from './Protege'
import ProtegeUrl from './ProtegeUrl'
import ResetPasswordEmail from '../profil/ResetPasswordEmail'
import ResetPasswordConfirm from '../profil/ResetPasswordConfirm'

export default function Rout() {
  const user = useSelector((state) => state.user)


  return (
    <>
        <Routes>
            {/*<switch>*/}
              <Route index element={<Produit/>}/>
              
              <Route path="/authentification/connexion" element={<ProtegeUrl  estConnecte={user.isAuthenticated}> <Connexion/> </ProtegeUrl>}/>
              <Route path="/authentification/inscription" element={<ProtegeUrl  estConnecte={user.isAuthenticated}> <Inscription/> </ProtegeUrl>}/>
             
              

              <Route path="/profil" element={<Protege  estConnecte={user.isAuthenticated} > <Profil/> </Protege>}/>
              <Route path="/reset-password-email" element={<ProtegeUrl  estConnecte={user.isAuthenticated}>  <ResetPasswordEmail/> </ProtegeUrl>}/>
              <Route path="/reset-password-confirm/:uid/:token" element={<ProtegeUrl  estConnecte={user.isAuthenticated}>  <ResetPasswordConfirm/> </ProtegeUrl>}/>


              <Route path="/store/produits" element={<Produit/>}/>
              <Route path="/store/produits/search/:search" element={<Search/>}/>
              <Route path="/store/produits/:id_produit" element={<DetailProduit/>}/>
              <Route path="/store/formulaire-de-commande" element={<Protege  estConnecte={user.isAuthenticated} > <CommandeForm/> </Protege>}/>

              <Route path="/admin-ecommerce/commande-list" element={<Protege  estConnecte={user.isAuthenticated} > <CommandeList/> </Protege>}/>
              <Route path="/admin-ecommerce/commande-list/items/:id_commande" element={<Protege  estConnecte={user.isAuthenticated} > <ItemCommande/> </Protege>}/>

              
            {/*</switch>*/}
            <Route path="*" element={<Erreur404/>} />
              
        
        </Routes>
    </>
  )
}
