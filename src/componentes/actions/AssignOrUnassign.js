import React from "react";
import { MdAddTask } from "react-icons/md";
import { IoMdRemoveCircle } from "react-icons/io";
import styled from "styled-components";
import axios from "axios";
import LoadingSpinner from "../loading/Loading";
import { useState } from "react";

const Assign = styled(MdAddTask)`
    color: #02890d;
    font: 22px;
    :hover{
        color: #00e60b;
    }
`;

const Unassign = styled(IoMdRemoveCircle)`
    color: #e60000;
    font-size: 20px;
    :hover{
        color: #ff5959;
    }
`;


function AssignOrUnassign (props){
    const [isLoading, setIsLoading] = useState(false);

    const handleAssignClick = async () => {
        setIsLoading(true); // Activamos el cartel de carga al iniciar la petición
        try {
          const response = await axios.post(`http://localhost:8080/aula/asignarMateriaAula/${props.idAulaAsignada}/${props.nombreMateria}`);
          props.recargarTabla(props.anio);
          setIsLoading(false);
        } catch (error) {
          console.error("Error al obtener las materias:", error);
          setIsLoading(false);
        }
      };

    return(
        <div>
            
            {props.aulaAsignada === 0 ? <Assign title="Asignar" onClick={() => handleAssignClick()}/> : <Unassign title="Desasignar"/>}

            <LoadingSpinner isLoading={isLoading}></LoadingSpinner>
            
        </div>
    );
}

export default AssignOrUnassign;
