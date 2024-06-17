import styled from "styled-components";
import { useSubjects } from "../../contexts/SubjectContext/useSubjects";
import { useState, useRef, useEffect } from "react";
import './AssigOrUnassign.css';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { isPortal } from "react-is";
import ClassRoomService from "../../services/ClassRoomService";
import useCommon from "../../contexts/CommonContext/useCommon";


const Overlay = styled.div`
  font-family: sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Esto hace que el fondo sea negro y semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Asegura que el overlay esté en la parte superior */
`;

const FormContainer = styled.div`
  width: 35%;
  background-color: #3a3a40;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0px 0px 6px 1px #c9c9c9;
  color: #c9c9c9;
  align-items: center;
  justify-content: center;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: auto;
  margin-left: 0;
`;



const Button = styled.button`
  padding: 10px 20px;
  background-color: #126b78;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #00d2db;
  }
  &:active {
    background-color: #3da9d9;
  }
`;


function FormAssign({ openPopup, turno, nombreMateria, cantEstudiantes }) {
  const { setLoadingScreen } = useCommon();
  const formA = useRef();
  const { assignSubjectToClassRoom } = useSubjects();


  const handleAssign = async (e) => {
    e.preventDefault();
    if (tipoAulaSeleccionada === '' || aulaSeleccionada === '') {
      window.alert("Error: No pueden existir datos vacíos");
    } else {
      const objectAssign = {
        idAula: aulaSeleccionada,
        nombreMateria: nombreMateria.trim(),
        turnoMateria: turno.trim()
      }
      await assignSubjectToClassRoom(objectAssign.idAula, objectAssign.nombreMateria, objectAssign.turnoMateria);
    }

  }

  //---------TIPO DE AULA-----------
  const [listadoTipoAulaOpen, setListadoTipoAulaOpen] = useState(false);
  const [tipoAulaSeleccionada, setTipoAulaSeleccionada] = useState('');



  //------AULA-----------
  const [listadoAulasOpen, setListadoAulasOpen] = useState(false);
  const [aulaSeleccionada, setAulaSeleccionada] = useState('');

  //cuando se quiere buscar una materia
  const [classrooms, setClassrooms] = useState(null);

  //fetch api
  const findAulasForMateria = async () => {
    //verifica que el tipo de aula sea valida antes de consumir la api
    if (tipoAulaSeleccionada === '') {
      alert("Debe ingresar un tipo de aula");
    } else {
      setListadoAulasOpen(!listadoAulasOpen)
      setLoadingScreen(true);
      try {
        const response = await ClassRoomService.findAulasForMateria(cantEstudiantes, turno, tipoAulaSeleccionada);
        setClassrooms(response.data);
      } catch (error) {
        console.error("Error al obtener la materias:", error);
        setListadoAulasOpen(false)
      }
      setLoadingScreen(false);
    }
  }

  // Ref para manejar la búsqueda de aulas



  useEffect(() => {
    if (tipoAulaSeleccionada !== '') {
      findAulasForMateria();
    } else setClassrooms(null);
  }, [tipoAulaSeleccionada]);


  return (
    <Overlay>
      <FormContainer ref={formA}>
        <FormTitle>Asignar materia a aula</FormTitle>
        <Form onSubmit={handleAssign}>
          <div className="custom-select">
            <div className="selected-option" onClick={() => setListadoTipoAulaOpen(!listadoTipoAulaOpen)}>
              {tipoAulaSeleccionada ? tipoAulaSeleccionada : 'Selecciona tipo de aula'}
              {listadoTipoAulaOpen ? < IoMdArrowDropup className="arrow" /> : <IoMdArrowDropdown className="arrow" />}
            </div>
            {listadoTipoAulaOpen && (
              <div className="options">
                <div className="option" onClick={() => setTipoAulaSeleccionada('')}>Selecciona tipo de aula</div>
                <div className="option" onClick={() => setTipoAulaSeleccionada('Tradicional')}>Tradicional</div>
                <div className="option" onClick={() => setTipoAulaSeleccionada('Laboratorio')}>Laboratorio</div>
              </div>
            )}
          </div>

          {/*se muestra unicamente si el listado de materias esta completo */}
          {classrooms && (

            <section className="classroom-list-wrapper">
              {classrooms.map((classroom) => (
                <div style={ classroom.id === aulaSeleccionada ? {background:"#b9b9b9"} : {}} onClick={() => setAulaSeleccionada(classroom.id)} key={classroom.id} >
                  <span>{classroom.numero}</span>
                  <span>{classroom.edificio}</span>
                  <span>capacidad :{classroom.capacidad} </span>
                  <span>{classroom.tipoDeAula} </span>

                </div>
              ))}
            </section>
          )}

          <div className="wrap-buttons">
            <Button onClick={() => openPopup(false)}>Cerrar</Button>
            <Button type="submit">Agregar</Button>
          </div>

        </Form>
      </FormContainer>
    </Overlay>
  );
}

export default FormAssign;