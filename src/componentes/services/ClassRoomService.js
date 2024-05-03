import api from "./server";



export default class ClassRoomService {
    static classroomsController = "/aula";

    static assignSubjectToClassRoom(idAulaAsignada, nombreMateria) {
        return api.post(`${this.classroomsController}/${idAulaAsignada}/asignarMateriaAula/${nombreMateria}`);
    }
    static findAulasForMateria(cantEstudiantes, turnoMateria){
        return api.get(`${this.classroomsController}/traer/${turnoMateria}/${cantEstudiantes}`);
    }
}