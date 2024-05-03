import { default as React, useState } from "react";
import styled from "styled-components";
import { useSubjects } from "../contexts/SubjectContext/useSubjects";
import { useFetchData } from "../hooks/useFetchData";
import SubjectsTable from "./SubjectsTable";
import SubjectsYear from "./SubjectsYear";
import TableToolbar from "../elements/table_toolbar/TableToolbar";
<<<<<<< HEAD
=======
import './Home.css';
>>>>>>> rama_dev

const Header = styled.header`
height:100%;
top: 0;
left: 0;
bottom: 0;
width: 250px;
z-index: 2;
transition: all 0.5s;
background-color: #171719;
overflow: hidden;
border-right: 2px solid #272729; /* Color del borde más claro */
`;

function Home() {
  useFetchData();
  const [subjects, setSubjects] = useState([]);
  const [anio, setAnio] = useState(1);
  const { getSubjectsByYearFromContext } = useSubjects();
  const handleYearSelection = async (index) => {
    setAnio(index+1);
    setSubjects(getSubjectsByYearFromContext(index + 1));
  };
  return (
    <section className="home d-flex">
      <Header>
        <SubjectsYear onSelectYear={handleYearSelection}> </SubjectsYear>
      </Header>
      <div>
        <TableToolbar setSubjects={setSubjects} anio={anio}></TableToolbar>
        {subjects.length > 0 && <SubjectsTable subjects={subjects} />} {/* Mostrar la tabla solo si hay materias seleccionadas */}
      </div>

    </section>
  )
}

export default Home;