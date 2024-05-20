import { useContext } from 'react';
import { SubjectContext } from './SubjectContext';




export const useSubjects = () => {

    const {
        updateSubjectFromContext,
        deleteSubjectFromContext,
        setSubjectsToContext,
        addSubjectToContext,
        subjectState,
        fetchSubjects,
        filterSubjects,
        assignSubjectToClassRoom,
        getSubjectsByName,
        getSubjectsByYearFromContext } = useContext(SubjectContext);
    const { subjects } = subjectState;

    return {
        subjects,
        getSubjectsByName,
        assignSubjectToClassRoom,
        fetchSubjects,
        updateSubjectFromContext,
        deleteSubjectFromContext,
        setSubjectsToContext,
        addSubjectToContext,
        filterSubjects,
        getSubjectsByYearFromContext

    }
}


