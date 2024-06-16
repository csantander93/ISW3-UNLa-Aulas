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

const Label = styled.label`
  margin-right: auto ;
  margin-bottom: 10px;
  margin-top: 30px;
  text-align: left;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 0;
  margin-right: auto;
  width: 70%;
  height: 10px;
  border: 1px solid #9fffff;
  border-radius: 5px;
  &:focus {
    border-color: blue;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 8px;
  margin-bottom: 30px;
  margin-right: auto;
  font-size: 12px;
  width: 30%;
  height: 30px;
  border: 1px solid #9fffff;
  border-radius: 5px;
  appearance: none; /* Elimina el estilo predeterminado del sistema */
  &:focus {
    border-color: blue;
    outline: none;
  }
`;

const Option = styled.option`
 appearance: none; /* Elimina el estilo predeterminado del sistema */
font-family: sans-serif;
font-size: 13px;
background-color: #b9bac0;
border: 1px solid #9fffff;
border-radius: 5px;
margin-top: 10px;
`;

const Ul = styled.ul`
 position: absolute;
 background-color:  #0F0F0F;
 margin: 0;
 margin-top: 3px;
 padding: 0;
 width: 50%;
 min-height: 400%;
 max-height: 800%;
 border-radius: 5px;
 box-shadow: 0px 0px 5px 1px #c9c9c9;
 overflow-y: auto;
  /* Estilo para el contenedor del scroll */
  &::-webkit-scrollbar {
   width: 10px;
 }

 /* Estilo para la barra de scroll */
 &::-webkit-scrollbar-thumb {
   background: #888; 
   border-radius: 10px;
 }

 /* Estilo para la barra de scroll cuando se pasa el mouse por encima */
 &::-webkit-scrollbar-thumb:hover {
   background: #555; 
 }
`;

const UserListItem = styled.li`
  margin-bottom: 0px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
  color: #c9c9c9;
  width: 100%;
  list-style: none;
  border-radius: 5px;
  &:hover {
    background-color:#545454;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  margin-left: auto;
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

const InputListContainer = styled.div`
   width: 90%;
   position: relative;
`;

const Span = styled.span`
  padding-top: 10px;
  margin-left: 50px;
`;

const BotonBuscarAulas = styled.span`
 margin-top: 5px;
 margin-bottom: 5px;
 padding: 3px;
 background-color: brown;
 border-radius: 10px;
 &:hover{
  background-color: orange;
 }

`;

function FormAssign(props){

  const [tipoAula, setTipoAula] = useState(null);
  const [idAula, setIdAula] = useState(null);
  const { setScreenMessage, setLoadingScreen } = useCommon();
  const formA = useRef();
  const { assignSubjectToClassRoom } = useSubjects();
 
  //al registrar que hace click afuera, se cierra el formulario
  const handleClickOutside = (event) => {
    if (formA.current && !formA.current.contains(event.target)) {
      props.openPopup();
    }
  }

  const handleAssign = async(e)=>{
    e.preventDefault();
    if(tipoAulaSeleccionada === '' || aulaSeleccionada === ''){
      window.alert("Error: No pueden existir datos vacíos");
    }else{
      const objectAssign = {
        idAula: aulaSeleccionada,
        nombreMateria:props.nombreMateria.trim(),
        turnoMateria: props.turno.trim()
      }
      assignSubjectToClassRoom(objectAssign.idAula, objectAssign.nombreMateria, objectAssign.turnoMateria);
    }
   
  }

  //---------TIPO DE AULA-----------
  const [listadoTipoAulaOpen, setListadoTipoAulaOpen] = useState(false);
  const [tipoAulaSeleccionada, setTipoAulaSeleccionada] = useState('');

  //selecciona el tipo de aula y lo almacena en un estado
  const tipoAulaOptionClick = (optionValue) => {
    //ya que vamos a llamar a la api que carga las aulas, nos aseguramos que se vacíe cada vez que se selecciona un nuevo tipo
    setListadoTipoAulaOpen(false);
    if(tipoAulaSeleccionada !== optionValue){
      setTipoAulaSeleccionada(optionValue);
      setClassrooms(null);
    }
  };

  //------AULA-----------
  const [listadoAulasOpen, setListadoAulasOpen] = useState(false);
  const [aulaSeleccionada, setAulaSeleccionada] = useState('');

  //cuando se quiere buscar una materia
 

  const aulaClick = (classroomValue) =>{
    setAulaSeleccionada(classroomValue);
    setListadoAulasOpen(false);
  }

  const [classrooms, setClassrooms] = useState(null);

  //click en el input de "seleccionar aula"
 const handleSeleccionAula = (e) => {
  setAulaSeleccionada(e.target.value);
 }

  //fetch api
  const findAulasForMateria = async () => {
    //verifica que el tipo de aula sea valida antes de consumir la api
    if(tipoAulaSeleccionada === ''){
      alert("Debe ingresar un tipo de aula");
    }else{
      setListadoAulasOpen(!listadoAulasOpen)
      if(listadoAulasOpen){
        setLoadingScreen(true);
    try {
        console.log(props.cantEstudiantes, props.turno, tipoAulaSeleccionada)
        const response = await ClassRoomService.findAulasForMateria(props.cantEstudiantes, props.turno, tipoAulaSeleccionada);
        setClassrooms(response.data);
        console.log(response.data);
    } catch (error) {
        console.error("Error al obtener la materias:", error);
        setListadoAulasOpen(false)
    }
    setLoadingScreen(false);
   }
  }
}

       // Ref para manejar la búsqueda de aulas
    
     const [buscarAulas, setBuscarAulas] = useState(false)

      useEffect(() => {

        if (buscarAulas && tipoAulaSeleccionada !== '') {
          findAulasForMateria();
          setBuscarAulas(false);
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
          document.removeEventListener('mousedown',handleClickOutside);
        };

      }, [buscarAulas, tipoAulaSeleccionada]);

     
    return(
        <Overlay>
        <FormContainer ref={formA}>
         <FormTitle>Asignar materia a aula</FormTitle>
          <Form onSubmit={handleAssign}>
          <div className="custom-select">
                <div className="selected-option" onClick={() => setListadoTipoAulaOpen(!listadoTipoAulaOpen)}>
                {tipoAulaSeleccionada ? tipoAulaSeleccionada : 'Selecciona tipo de aula'}
                {listadoTipoAulaOpen ? < IoMdArrowDropup className="arrow"/> : <IoMdArrowDropdown className="arrow"/> }
                </div>
            {listadoTipoAulaOpen && (
            <div className="options">
              <div className="option" onClick={() => tipoAulaOptionClick('')}>Selecciona tipo de aula</div>
              <div className="option" onClick={() => tipoAulaOptionClick('Tradicional')}>Tradicional</div>
              <div className="option" onClick={() => tipoAulaOptionClick('Laboratorio')}>Laboratorio</div>
            </div>
      )}
         </div>
               {/*se muestra el boton unicamente si hay selecionada un tipo de aula */}
         {tipoAulaSeleccionada!=='' && <BotonBuscarAulas onClick={() => {setBuscarAulas(true)}}>Buscar aulas</BotonBuscarAulas>}

   {/* <div className="custom-select">
            <div className="selected-option" onClick={() => findAulasForMateria()}>
            {aulaSeleccionada ? aulaSeleccionada : 'Selecciona aula'}
            {listadoAulasOpen ? < IoMdArrowDropup className="arrow"/> : <IoMdArrowDropdown className="arrow"/> }
          </div>
          
         {listadoAulasOpen && (
        <div className="classrooms-options">
          {classrooms?.map((classroom)=>(
              <div className="option" onClick={() => aulaClick(classroom)}>{classroom.numero} {classroom.edificio} capacaidad:{classroom.capacidad}</div>
          ))}
        </div>
      </div>
      )}
      */}
        {/*se muestra unicamente si el listado de materias esta completo */}
        {classrooms && (
          <select id="mySelect" value={aulaSeleccionada} onChange={handleSeleccionAula}>
            <option value="">Seleccione aula</option>
            {classrooms.map((classroom) => (
              <option key={classroom.id} value={classroom.id}>
                {classroom.numero} {classroom.edificio} capacidad: {classroom.capacidad} {classroom.tipoDeAula}
              </option>
             ))}
          </select>
          )}

    

         

          
          <Button type="submit">Agregar</Button>
        </Form>
      </FormContainer>
      </Overlay>
    );
}

export default FormAssign;