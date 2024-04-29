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
    const filterSubjects = (filters, anio) => {
        let filteredSubject = getSubjectsByYearFromContext(anio);
        filters.forEach((filter) => {
            filteredSubject = filteredSubject.filter((subject) => subject[filter.key] === filter.value)
        })

        return filteredSubject;
    }

    const assignSubjectToClassRoom = async (idAulaAsignada, nombreMateria) => {
        setLoadingScreen(true);
        try {
            const response = await ClassRoomService.assignSubjectToClassRoom(idAulaAsignada, nombreMateria);
            updateSubjectFromContext(response.data);
            setScreenMessage({ message: "Materia: " + nombreMateria + ", asignada a aula con id: " + idAulaAsignada + " exitosamente", status: 200 });
        } catch (error) {
            setScreenMessage({ message: "Error al asignar materia a aula", status: 400 });
            console.error("Error al asignar materia a aula:", error);
        }
        setLoadingScreen(false);
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

        }}>
            {children}
        </SubjectContext.Provider>
    );
};