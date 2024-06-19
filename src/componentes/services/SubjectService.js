import api from "./server";



export default class SubjectService {
    static subjectsController = "/materia";

    static getSubjects() {
        return api.get(`${this.subjectsController}/`);
    }
    static getSubjectByName(name,turno) {
        return api.get(`${this.subjectsController}/name/${name}?turno=${turno}`);
    }
    static getSubjectsByYear(year) {
        return api.get(`${this.subjectsController}/traerMateriasPorAnio/${year}`);
    }

}