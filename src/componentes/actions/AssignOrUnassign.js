import React from "react";
import { MdAddTask } from "react-icons/md";
import { IoMdRemoveCircle } from "react-icons/io";
import styled from "styled-components";

const Assign = styled(MdAddTask)`
    color: #02890d;
    font: 24px;
    :hover{
        color: #00e60b;
    }
`;

const Unassign = styled(IoMdRemoveCircle)`
    color: #e60000;
    font-size: 2px;
    :hover{
        color: #ff5959;
    }
`;

function AssignOrUnassign (props){
    return(
        <div>
            {props.aulaAsignada === 0 ? <Assign title="Asignar"/> : <Unassign title="Desasignar"/>}
            
        </div>
    );
}

export default AssignOrUnassign;