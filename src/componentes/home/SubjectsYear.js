import React, { useState } from "react";
import styled from "styled-components";

const Ul = styled.ul`
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrar el contenido horizontalmente */
`;

const Li = styled.li`
  position: relative;
  color: ${(props) => (props.clicked === "true" ? "#ffc2c2" : "#c9c9c9")};
  background-color: ${(props) => (props.clicked === "true" ? "#8f0d0d" : "none")};
  overflow: hidden;
  white-space: nowrap;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 25px; /* Tamaño de fuente aumentado */
  margin: 1px;
  display: flex;
  justify-content: center; /* Centro del texto */
  align-items: center;
  padding: 4px 6px 6px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translate(10px);
    background-color: #ae0606;
  }
`;

const Span = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%; /* Span ocupa todo el ancho del Li */
`;

function SubjectsYear({ onSelectYear }) {
  const [selectedIdItem, setSelectedIdItem] = useState(null);

  const handleClick = async (index) => {
    setSelectedIdItem(index);
    onSelectYear(index); // Llamar a la función onSelectYear con el índice seleccionado
  };

  // Opciones por defecto
  const defaultOptions = [
    { id: 1, nombre: "Materias 1er año" },
    { id: 2, nombre: "Materias 2do año" },
    { id: 3, nombre: "Materias 3er año" },
    { id: 4, nombre: "Materias 4to año" },
    { id: 5, nombre: "Materias 5to año" }
  ];

  return (
    <>
    <Ul>
      {defaultOptions.map((obj, index) => (
        <Li
          key={obj.id}
          onClick={() => handleClick(index)}
          clicked={index === selectedIdItem ? "true" : "false"}
        >
          <Span>{obj.nombre}</Span>
        </Li>
      ))}
    </Ul>
    </>
  );
}

export default SubjectsYear;
