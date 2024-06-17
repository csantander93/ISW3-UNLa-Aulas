import api from "./server";



export default class ClassRoomService {
    static classroomsController = "/aula";

    static assignSubjectToClassRoom(idAulaAsignada, nombreMateria, turno) {
        return api.post(`${this.classroomsController}/${idAulaAsignada}/asignarMateriaAula/${nombreMateria}/${turno}`);
    }
    static unassignSubjetToClassRoom(idAulaAsignada, nombreMateria, turno){
        return api.delete(`${this.classroomsController}/desasignarMateria/${idAulaAsignada}/${nombreMateria}/${turno}`)
    }
    static findAulasForMateria(cantEstudiantes, turnoMateria, tipoAula){
        return api.get(`${this.classroomsController}/traer/${cantEstudiantes}/${turnoMateria}/${tipoAula}`);
    }
}