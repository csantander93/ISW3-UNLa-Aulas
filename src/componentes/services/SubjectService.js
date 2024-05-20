import api from "./server";



export default class SubjectService {
    static subjectsController = "/materia";

    static getSubjects() {
        return api.get(`${this.subjectsController}/`);
    }
    static getSubjectByName(name) {
        return api.get(`${this.subjectsController}/name/${name}`);
    }
    static getSubjectsByYear(year) {
        return api.get(`${this.subjectsController}/traerMateriasPorAnio/${year}`);
    }

}