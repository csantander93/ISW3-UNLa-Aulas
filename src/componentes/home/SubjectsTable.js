import styled from "styled-components";

const Table = styled.table`
  width: 83%; /* Ajustar el ancho de la tabla según tus necesidades */
  margin-left: 300px; /* Centrar la tabla horizontalmente */
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

  console.log(subjects);
  
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
          <Th>Funciones</Th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((subject, index) => (
          <tr key={index}>
            <Td>{subject.nombre}</Td>
            <Td>{subject.turno}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SubjectsTable;
