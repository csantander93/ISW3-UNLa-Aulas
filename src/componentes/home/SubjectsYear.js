import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Ul = styled.ul`
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap:5px;
  align-items: center; /* Centrar el contenido horizontalmente */
`;

const LiParent = styled.li`
  position: relative;
  color: ${(props) => (props.clicked === "true" ? "#ffc2c2" : "#c9c9c9")};
  background-color: #8f0dFF;
  overflow: hidden;
  white-space: nowrap;

  font-size: 1.3rem; /* Tamaño de fuente aumentado */
  display: flex;
  padding:10px 0;
  width:100%;
  text-align:center;
  justify-content: center; /* Centro del texto */
  align-items: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
`;

const LiChild = styled.li`
  position: relative;
  color: ${(props) => (props.clicked === "true" ? "#ffc2c2" : "#c9c9c9")};
  background-color: ${(props) => (props.clicked === "true" ? "#8f0d0d" : "none")};
  overflow: hidden;
  white-space: nowrap;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.3rem; /* Tamaño de fuente aumentado */
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
  useEffect(() => {
    // setSelectedIdItem(0);
    onSelectYear(0);
  }, [])
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
        <LiParent
          style={{ marginTop: 10 }}
        >
          <Span>Asignar Materia</Span>
        </LiParent>
        {defaultOptions.map((obj, index) => (
          <LiChild
            key={obj.id}
            onClick={() => handleClick(index)}
            clicked={index === selectedIdItem ? "true" : "false"}
          >
            <Span style={{ fontSize: "1rem" }}>{obj.nombre}</Span>
          </LiChild>
        ))}
      </Ul>
    </>
  );
}

export default SubjectsYear;
