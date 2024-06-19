import React, { createContext, useReducer } from 'react';
import SubjectService from '../../services/SubjectService';
import { SubjectReducer } from './SubjectReducer';
import useCommon from '../CommonContext/useCommon';
import ClassRoomService from '../../services/ClassRoomService';

export const SubjectContext = createContext();


const INITIAL_STATE = {
    subjects: []
}


export const SubjectProvider = ({ children }) => {
    const [subjectState, dispatch] = useReducer(SubjectReducer, INITIAL_STATE);
    const { setScreenMessage, setLoadingScreen } = useCommon();
    const fetchSubjects = async () => {
        setLoadingScreen(true);
        try {
            const response = await SubjectService.getSubjects();
            setSubjectsToContext(response.data);
        } catch (error) {
            setScreenMessage({ message: "¡Error al obtener las materias!", status: 400 });
            console.error("Error al obtener las materias:", error);
        }
        setLoadingScreen(false);

    }

    const getSubjectsByYearFromContext = (anio) => {
        return subjectState.subjects.filter((s) => s.anioPertenece === anio)
    }
    const getSubjectsByName = async (name,turno) => {
        setLoadingScreen(true);
        try {
            let response = await SubjectService.getSubjectByName(name,turno);
            setLoadingScreen(false);
            return response.data;
        } catch (error) {
            setScreenMessage({ message: `¡${error.response.data.mensaje}!`, status: 400 });
            console.error("Error al obtener la materia:", error);
            setLoadingScreen(false);
            return undefined;
        }


    }
    const filterSubjects = (filters, anio) => {
        let filteredSubject = getSubjectsByYearFromContext(anio);
        filters.forEach((filter) => {
            filteredSubject = filteredSubject.filter((subject) => subject[filter.key] === filter.value)
        })

        return filteredSubject;
    }

    const assignSubjectToClassRoom = async (idAulaAsignada, nombreMateria, turno) => {
        setLoadingScreen(true);
        try {
            const response = await ClassRoomService.assignSubjectToClassRoom(idAulaAsignada, nombreMateria, turno);
            let anio = subjectState.subjects.find(s => s.nombre === nombreMateria).anioPertenece;
            setScreenMessage({ message: "Materia: " + nombreMateria + ", asignada a aula con id: " + idAulaAsignada + " exitosamente", status: 200,returnPath:`/home/subjects/${anio}` });
        } catch (error) {
            setScreenMessage({ message: "Error al asignar materia a aula", status: 400 });
            console.error("Error al asignar materia a aula:", error);
        }
        setLoadingScreen(false);
    }

    const unassignSubjectToClassRoom = async (idAulaAsignada, nombreMateria, turno) => {
        if(window.confirm("Esta seguro que desea desasignar la materia del aula?")){
            setLoadingScreen(true);
            try {
                const response = await ClassRoomService.unassignSubjetToClassRoom(idAulaAsignada, nombreMateria, turno);
                let anio = subjectState.subjects.find(s => s.nombre === nombreMateria).anioPertenece;
                setScreenMessage({ message: "Materia: " + nombreMateria + ", desasignada a aula con id: " + idAulaAsignada + " exitosamente", status: 200,returnPath:`/home/subjects/${anio}` });
            } catch (error) {
                setScreenMessage({ message: "Error al desasignar materia a aula", status: 400 });
                console.error("Error al asignar materia a aula:", error);
            }
            setLoadingScreen(false);
     }
    }
    const addSubjectToContext = (subject) => {
        dispatch({ type: 'addSubject', payload: subject })
    }

    const setSubjectsToContext = (subjects) => {
        dispatch({ type: 'setSubjectsToContext', payload: subjects })
    }
    const deleteSubjectFromContext = (idSubject) => {
        dispatch({ type: 'deleteSubject', payload: idSubject })
    }
    const updateSubjectFromContext = (subject) => {
        dispatch({ type: 'updateSubject', payload: subject })
    }
    //deberia ir en Classroom context


    return (
        <SubjectContext.Provider value={{
            updateSubjectFromContext,
            deleteSubjectFromContext,
            setSubjectsToContext,
            addSubjectToContext,
            subjectState,
            fetchSubjects,
            getSubjectsByYearFromContext,
            filterSubjects,
            assignSubjectToClassRoom,
            unassignSubjectToClassRoom,
            getSubjectsByName
        }}>
            {children}
        </SubjectContext.Provider>
    );
};