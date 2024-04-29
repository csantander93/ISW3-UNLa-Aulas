import { useEffect } from "react";
import useCommon from "../contexts/CommonContext/useCommon";
import { useSubjects } from "../contexts/SubjectContext/useSubjects";


export const useFetchData = () => {
    const { fetchSubjects } = useSubjects();
    const { setScreenMessage } = useCommon();
    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchSubjects();
            }
            catch (error) {
                setScreenMessage({ message: "Hubo un problema", status: 500 })
            }
        }
        fetchData();
    }, [])
}