import styled from "styled-components";
import AssignOrUnassign from "../elements/actions/AssignOrUnassign";

const Table = styled.table`
  width: 100%; /* Ajustar el ancho de la tabla según tus necesidades */
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: black; /* Cambiar el color de fondo a negro */
  color: white;
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const SubjectsTable = ({ subjects }) => {

  return (
    <Table>
      <thead>
        <tr>
          <Th>Materia</Th>
          <Th>Turno</Th>
          <Th>Cantidad de Alumnos</Th>
          <Th>Docente a Cargo</Th>
          <Th>Aula Asignada</Th>
          <Th>Edificio</Th>
          <Th>Asignar/Desasignar</Th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((subject, index) => (
          <tr key={index}>
            <Td>{subject.nombre}</Td>
            <Td>{subject.turno}</Td>
            <Td>{subject.cantidadEstudiantes}</Td>
            <Td>{subject.docenteACargo}</Td>
            <Td>{subject.aulaAsignada === 0 ? 'Sin asignar' : subject.aulaAsignada}</Td>
            <Td>{subject.edificio}</Td>
            <Td><AssignOrUnassign
              aulaAsignada={subject.aulaAsignada}
              idAulaAsignada={subject.idAulaAsignada}
              nombreMateria={subject.nombre}
               />
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SubjectsTable;
