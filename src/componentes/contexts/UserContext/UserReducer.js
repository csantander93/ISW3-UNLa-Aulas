export const UserReducer = (state, action) => {

    switch (action.type) {
        case 'addUser':
            return {
                ...state,
                users: [...state.subject, action.payload]
            }

        case 'setUserLogged':
            return {
                ...state,
                userLogged: action.payload
            }
        case 'deleteUser':

            return {
                ...state,
                users: state.subject.filter((n, i) => n.idUser !== action.payload)
            }
        case 'setUsers':
            return {
                ...state,
                users: action.payload
            }
        case 'updateUser':
            let users = state.users;
            for (let i = 0; i < users.length; i++) {
                if (users[i].idUser === action.payload.idUser)
                    users[i] = action.payload;
            }
            return {
                ...state,
                users
            }
        default:
            return state;
    }

}