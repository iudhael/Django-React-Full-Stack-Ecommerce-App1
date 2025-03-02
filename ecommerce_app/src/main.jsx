import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './Redux/StoreRedux.jsx'


//import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import { QueryClient,QueryClientProvider } from 'react-query'



//import Connexion from './composants/authentification/connexion/Connexion'
//import CommandeForm from './composants/store/CommandeForm.jsx'
//import Profil from './composants/profil/Profil.jsx'
//import CommandeList from './composants/store/CommandeList.jsx'
//import Inscription from './composants/authentification/inscription/Inscription'
//import Panier from './composants/store/Panier'
//import Produit from './composants/store/Produit'
//import DetailProduit from './composants/store/DetailProduit'
//import PageErreur from './composants/commons/PageErreur.jsx'
//import Erreur404 from './composants/commons/Erreur404.jsx'
//import Protege from './composants/commons/Protege.jsx'
//import Logout from './composants/authentification/Logout.jsx'

const queryClient = new QueryClient()


//const Connecte = true
//const Admin = false

/*const route = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    errorElement: <PageErreur/>,
    children : [
      {
        path : "/authentification/connexion",
        element : <Connexion/>
      },
      {
        path : "/authentification/inscription",
        element : <Inscription/>
      },
      {
        path : "/authentification/logout",
        element : <Logout/>
      },
      {
        path : "/profil",
        element : <Protege estConnecte={Connecte}> <Profil /> </Protege>
      },
      {
        path : "/store/produits",
        element : <Produit/>,
    
      },
      {
        path : "/store/produits/:id",
        element : <DetailProduit/>
      },
    
      {
        path : "/store/panier",
        element : <Panier/>
      },
      {
        path : "/store/formulaire-de-commande",
        element : <Protege estConnecte={Connecte} > <CommandeForm /> </Protege>
      },

      {
        path : "/admin/commande-list",
        element : <Protege estConnecte={Connecte} > <CommandeList /> </Protege>
      },


    
    ]

  },

  {
    path : "*",
    element : <Erreur404/>
  }

  ])*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      <Provider store={store}>
        <App/>
      </Provider>
    </QueryClientProvider>
    
  </React.StrictMode>,
)
