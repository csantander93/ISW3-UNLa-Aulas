export const SubjectReducer = (state, action) => {
    switch (action.type) {
        case 'addSubjectToContext':
            return {
                ...state,
                subjects: [...state.subject, action.payload]
            }

        case 'deleteSubjectToContext':
            return {
                ...state,
                subjects: state.subject.filter((n, i) => n.idSubject !== action.payload)
            }
        case 'setSubjectsToContext':
            return {
                ...state,
                subjects: action.payload
            }
        case 'updateSubjectToContext':
            let subjects = state.subjects;
            debugger;
            for (let i = 0; i < subjects.length; i++) {
                if (subjects[i].idSubject === action.payload.idSubject)
                    subjects[i] = action.payload;
            }
            return {
                ...state,
                subjects
            }

        default:
            return state;
    }

}