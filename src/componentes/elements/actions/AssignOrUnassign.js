import React, { useState } from "react";
import { IoMdRemoveCircle } from "react-icons/io";
import { MdAddTask } from "react-icons/md";
import styled from "styled-components";
import { useSubjects } from "../../contexts/SubjectContext/useSubjects";
import FormAssign from "./FormAssign";
import ClassRoomService from "../../services/ClassRoomService";
import useCommon from "../../contexts/CommonContext/useCommon";


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


function AssignOrUnassign(props) {

    const [openPopupAssign, setOpenPopupAssign] = useState(false);
    const { setScreenMessage, setLoadingScreen } = useCommon();

    const { unassignSubjectToClassRoom } = useSubjects();

    //funcion que se ejecuta desde FromAssign
    const handleClick = () => {
        //await assignSubjectToClassRoom(props.idAulaAsignada, props.nombreMateria);
         setOpenPopupAssign(!openPopupAssign);
    };

    const handleUnassign = async() => {
        unassignSubjectToClassRoom(props.idAulaAsignada, props.nombreMateria, props.turno);
       /* if (window.confirm("Seguro que desea desasignar la materia del aula?")){
            setLoadingScreen(true);
            try {
                const response = await ClassRoomService.unassignSubjetToClassRoom(props.idAulaAsignada, props.nombreMateria, props.turno);
                console.log(response.data);
                window.alert("Se desasignó la materia existosamente")
            } catch (error) {
                console.log("Error al desasignar: " +  error);
            }
            setLoadingScreen(false);
        }*/
    }
    return (
        <div>
            {props.aulaAsignada === 0 ? <Assign title="Asignar" onClick={() => handleClick()} /> : <Unassign title="Desasignar" onClick={() => handleUnassign()}/>}
            {openPopupAssign && <FormAssign openPopup={handleClick} turno={props.turno} nombreMateria={props.nombreMateria}
              cantEstudiantes={props.cantEstudiantes}></FormAssign>}
        </div>
    );
}

export default AssignOrUnassign;
