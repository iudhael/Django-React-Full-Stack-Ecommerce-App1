import { createSlice } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast"


const loadUserState = () => {
  try {
    const serializedUserState = localStorage.getItem('userState');
    if (serializedUserState === null) {
      return {
        accessToken: "",
        username: "",
        isAuthenticated: false,
      };
    }
    return JSON.parse(serializedUserState);
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    return {
      accessToken: "",
      username: "",
      isAuthenticated: false,
    };
  }
};
  
  const saveUserState = (state) => {
    try {
      const serializedUserState = JSON.stringify(state);
      localStorage.setItem('userState', serializedUserState);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }
  };
  
  

/*   initialState: {
        items : [],
        totalPriceCart: 0,
    },*/



const UserSlice = createSlice({
    name: "user",
    initialState: loadUserState(),

    reducers : {
        LoginUser: (state, action) =>{
          state.accessToken = action.payload.key
          state.username = action.payload.username
          state.isAuthenticated = true
          saveUserState(state)
            
        },

        LogoutUser: (state) =>{
          state.accessToken = ""
          state.isAuthenticated = false;
          saveUserState(state)
          localStorage.removeItem('userState')
            
        },









    }


})

export const { LoginUser, LogoutUser } = UserSlice.actions
export default UserSlice

