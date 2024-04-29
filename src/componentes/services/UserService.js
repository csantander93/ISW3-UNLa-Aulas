import api from "./server";



export default class UserService {
    static loginController = "/login";
    static usersController = "/usuario";
    static studentsController = "/estudiante";
    static professorsController = "/docente";

    static login(formData) {
        return api.post(`${this.loginController}`, formData);
    }

    static signUp(formData) {
        return api.post(`${this.usersController}/registro`, formData);
    }

    static getProfessors() {
        return api.get(`${this.professorsController}/`);
    }

    static createProfessor(formData) {
        return api.post(`${this.professorsController}/altaDocente`, formData);
    }
    static createProfessors(formData) {
        return api.post(`${this.professorsController}/AltaDocentes`, formData);
    }

    static getStudents() {
        return api.get(`${this.studentsController}/`);
    }
    static createStudent(formData) {
        return api.post(`${this.studentsController}/altaEstudiante`, formData);
    }
    static createStudents(formData) {
        return api.post(`${this.studentsController}/AltaEstudiantes`, formData);
    }


}