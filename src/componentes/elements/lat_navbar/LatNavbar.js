import { memo, useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import './LatNavbar.css';
import { UtilService } from "../../services/utilService";

const Li = styled.li`
  position: relative;
  color: ${(props) => (props.clicked ? "#ffc2c2" : "#c9c9c9")};
  background-color: ${(props) => (props.clicked ? "#8f0d0d" : "none")};
  font-size: 1rem; /* Tamaño de fuente aumentado */
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #ae0606;
  }
  & > a > p,& > p {
    display:${(props) => (props.collapse ? "none" : "block")}
    
  }
`;



const Span = styled.span`
display:flex;
align-items:center;
justyfy-content:center;
width: 30px;
heigth:30px;
`
const defaultOptions = [
    { id: 1, nombre: "Materias 1er año", img: "counter_1_24dp_FILL0_wght400_GRAD0_opsz24.png" },
    { id: 2, nombre: "Materias 2do año", img: "counter_2_24dp_FILL0_wght400_GRAD0_opsz24.png" },
    { id: 3, nombre: "Materias 3er año", img: "counter_3_24dp_FILL0_wght400_GRAD0_opsz24.png" },
    { id: 4, nombre: "Materias 4to año", img: "counter_4_24dp_FILL0_wght400_GRAD0_opsz24.png" },
    { id: 5, nombre: "Materias 5to año", img: "counter_5_24dp_FILL0_wght400_GRAD0_opsz24.png" }
];

function LatNavbar() {
    const { anio } = useParams();
    const [menuCollapsed, collapseMenu] = useState(false);
    const [expandSubjects, setExpandSubjects] = useState(false);
    const { pathname } = useLocation();
    useEffect(() => { }, [expandSubjects, setExpandSubjects])
    return (
        <nav className={`${menuCollapsed ? "lat-navbar collapsed" : "lat-navbar"}`}>
            <ul >
                <li onClick={() => collapseMenu(!menuCollapsed)} className={menuCollapsed ? "btn-menu collapsed" : "btn-menu"}  >
                    <img src={UtilService.resolveIconImage("double_arrow_24dp_FILL0_wght700_GRAD200_opsz20.png")} width={25} alt="Icono de menu" />
                </li>
                <Li collapse={menuCollapsed} clicked={pathname === "/home/index"}  >
                    <NavLink to={"/home/index"}>
                        <Span><img src={UtilService.resolveIconImage("home_24dp_FILL0_wght400_GRAD0_opsz24.png")} width={25} alt="Icono de inicio" /></Span><p>Inicio</p>
                    </NavLink>
                </Li>
                <Li collapse={menuCollapsed} onClick={() => setExpandSubjects(!expandSubjects)} clicked={false}>
                    <Span><img src={UtilService.resolveIconImage("list_alt_24dp_FILL0_wght400_GRAD0_opsz24.png")} width={25} alt="btn img" /></Span><p>Asignar Materia</p>
                </Li>
                <ul className={expandSubjects ? "submenu-list" : "submenu-list collapse"}>
                    {defaultOptions.map((obj, index) => (
                        <Li
                            collapse={menuCollapsed}
                            key={obj.id}
                            clicked={index + 1 === Number(anio)}>
                            <NavLink to={`/home/subjects/${obj.id}`}>
                                <Span><img src={UtilService.resolveIconImage(obj.img)} width={18} alt="btn img" /></Span><p>{obj.nombre}</p></NavLink>
                        </Li>
                    ))}
                </ul>
            </ul>
        </nav>
    )

}

export default memo(LatNavbar);