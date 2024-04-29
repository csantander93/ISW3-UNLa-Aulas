import React from "react";
import { MdAddTask } from "react-icons/md";
import { IoMdRemoveCircle } from "react-icons/io";
import styled from "styled-components";
import axios from "axios";
import LoadingSpinner from "../loading/Loading";
import { useState } from "react";
import { useSubjects } from "../../contexts/SubjectContext/useSubjects";

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
    const { assignSubjectToClassRoom } = useSubjects();
    const handleAssignClick = async () => {
        await assignSubjectToClassRoom(props.idAulaAsignada, props.nombreMateria);
    };
    return (
        <div>
            {props.aulaAsignada === 0 ? <Assign title="Asignar" onClick={() => handleAssignClick()} /> : <Unassign title="Desasignar" />}
        </div>
    );
}

export default AssignOrUnassign;
