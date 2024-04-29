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
        getSubjectsByYearFromContext } = useContext(SubjectContext);
    const { subjects } = subjectState;

    return {
        subjects,
        fetchSubjects,
        updateSubjectFromContext,
        deleteSubjectFromContext,
        setSubjectsToContext,
        addSubjectToContext,
        filterSubjects,
        getSubjectsByYearFromContext

    }
}


