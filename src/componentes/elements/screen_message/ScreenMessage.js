import { useEffect } from "react";

import useCommon from "../../contexts/CommonContext/useCommon";
import './ScreenMessage.css'
import { UtilService } from "../../services/utilService";


const DEFAULT_MESSAGE = {
    message: "",
    status: 0,
    returnPath: ""
}


const ScreenMessage = () => {
    const { screenMessage, setScreenMessage } = useCommon();

    useEffect(() => {
    }, [screenMessage])
    const close = (e) => {
        e.preventDefault();
        setScreenMessage(DEFAULT_MESSAGE);
        if (screenMessage.returnPath !== undefined && screenMessage.returnPath !== "") {
            window.location.href = screenMessage.returnPath;
        }
    }

    const displayMessage = () => {

        if (screenMessage.status === 600) {
            return "¡Cuidado!";
        }
        if (screenMessage.status >= 200 && screenMessage.status <= 226) {
            return "¡Todo ha salido perfecto!";
        }
        if (screenMessage.status >= 400 && screenMessage.status <= 451) return "¡Un problema ha ocurrido!";
        return "¡Se ha producido con error!";
    }
    const displayIcon = () => {
        if (screenMessage.status >= 200 && screenMessage.status <= 226)
            return "tick.png";
        if ((screenMessage.status >= 400 && screenMessage.status <= 451) || screenMessage.status === 600) return "warning.png";
        return "deny.png";
    }
    const displayPopUp = () => {
        return (
            <div className="d-flex  flex-d-c flex-j-a-c br-rd">
                <img src={UtilService.resolveIconImage(displayIcon())} alt="Icono de respuesta" width={30} />
                <h3>{displayMessage()}</h3>
                <p>{screenMessage.message}</p>
                <button type="button" className="btn-cmn" onClick={(e) => close(e)}>Cerrar</button>
            </div>)
    }
    return (
        screenMessage.status > 0 ?
            <section className="screen-message d-flex  flex-d-c flex-j-a-c">
                {screenMessage.status > 0 && displayPopUp()}
            </section> : <></>
    );
}

export default ScreenMessage;