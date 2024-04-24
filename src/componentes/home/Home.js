import styled from "styled-components";
import SubjectsYear from "./SubjectsYear";
import SubjectsTable from "./SubjectsTable";
import React, { useState } from "react";
import axios from "axios";
import Loading from "../loading/Loading";

const Header = styled.header `
position: fixed;
top: 0;
left: 0;
bottom: 0;
width: 250px;
z-index: 2;
transition: all 0.5s;
padding: 0 15px;
background-color: #171719;
overflow: hidden;
border-right: 2px solid #272729; /* Color del borde más claro */
`;

function Home () {

  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(subjects);

  const handleYearSelection = async (index) => {
    setIsLoading(true); // Activamos el cartel de carga al iniciar la petición
    try {
      const response = await axios.get(`http://localhost:8080/materia/traerMateriasPorAnio/${index + 1}`); // Ajustar la URL para enviar el año seleccionado
      setSubjects(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener las materias:", error);
    }
  };

  return(
    <>
    <Header>
      <SubjectsYear onSelectYear={ handleYearSelection }> </SubjectsYear>
    </Header>
    {subjects.length > 0 && <SubjectsTable subjects={subjects} />} {/* Mostrar la tabla solo si hay materias seleccionadas */}
    <Loading isLoading={isLoading}></Loading>
    </>
  )
}

export default Home;