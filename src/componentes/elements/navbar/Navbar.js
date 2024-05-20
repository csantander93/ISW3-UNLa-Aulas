
import { memo } from 'react';
import { useUsers } from '../../contexts/UserContext/useUsers';
import './Navbar.css';
function Navbar() {
    const { logout, userLogged } = useUsers();

    return (
        <section className='navbar d-flex flex-j-a-end'>
            {userLogged && <button onClick={() => logout()} className="btn-cmn">Cerrar sesión</button>}
        </section>
    );
}

export default memo(Navbar);