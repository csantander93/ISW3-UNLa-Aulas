import { useContext } from 'react';
import { UserContext } from './UserContext';




export const useUsers = () => {

    const {
        login,
        usersState,
        signUp,
        logout
    } = useContext(UserContext);
    const { users,userLogged } = usersState;

    return {
        userLogged,
        logout,
        users,
        login,
        signUp
    }
}


