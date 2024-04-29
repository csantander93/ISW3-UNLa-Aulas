import { useContext } from 'react';
import { CommonContext } from './CommonContext';




const useCommon = () => {

    const { commonState, setLoadingScreen, setScreenMessage } = useContext(CommonContext);
    const { loadingScreen, screenMessage } = commonState;

    return {
        screenMessage,
        setScreenMessage,
        loadingScreen,
        setLoadingScreen,
    }
}

export default useCommon;


