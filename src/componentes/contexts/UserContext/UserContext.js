import React, { createContext, useReducer } from 'react';
import UserService from '../../services/UserService';
import useCommon from '../CommonContext/useCommon';
import { UserReducer } from './UserReducer';
export const UserContext = createContext();

const INITIAL_STATE = {
  loggedUser: null
}
export const UserProvider = ({ children }) => {
  const [usersState, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  const { setScreenMessage, setLoadingScreen } = useCommon();

  const login = async (formData) => {
    let success = false;
    setLoadingScreen(true);
    try {
      const response = await UserService.login(formData);
      setUserLogged(response.data);
      window.localStorage.setItem('token', response.data.token);
      // Guarda los datos del usuario en localStorage
      window.localStorage.setItem("user", JSON.stringify(response.data));
      setScreenMessage({ message: "¡Datos enviados con éxito!", status: 200 });
      setUserLogged(response.data)
      success = true;
    } catch (error) {
      setScreenMessage({ message: "Usuario/contraseña incorrecta", status: 400 });
    }
    setLoadingScreen(false);
    return success;
  }

  const logout = () => {
    setLoadingScreen(true);
    setUserLogged(null);
    window.localStorage.removeItem('token');
    window.localStorage.removeItem("user");
    setLoadingScreen(false);
    window.location.href = "/login"
  }

  const signUp = async (formData) => {
    setLoadingScreen(true);
    let success = false;
    try {
      const response = await UserService.signUp(formData);
      response && setScreenMessage({ message: "¡Datos enviados con éxito!", status: 200 });
      success = true;
    } catch (error) {
      setScreenMessage({ message: "Error al enviar los datos", status: 400 });
    }

    setLoadingScreen(false);
    return success;

  }

  const setUserLogged = (user) => {
    dispatch({ type: 'setUserLogged', payload: user })
  }


  return (
    <UserContext.Provider value={{
      signUp,
      login,
      usersState,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};