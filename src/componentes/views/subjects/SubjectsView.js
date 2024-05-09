import { default as React, useEffect, useState } from "react";
import { useSubjects } from "../../contexts/SubjectContext/useSubjects";
import SubjectsTable from "./SubjectsTable";
import TableToolbar from "../../elements/table_toolbar/TableToolbar";
import { useParams } from "react-router";
import './SubjectsView.css'
const materias = ["1er", "2do", "3er", "4to", "5to"];
function SubjectsView() {
    const { anio } = useParams();
    const [subjects, setSubjects] = useState([]);

    const { getSubjectsByYearFromContext } = useSubjects();
    useEffect(() => {
        anio && handleYearSelection(Number(anio))
    }, [anio])
    const handleYearSelection = async (index) => {
        setSubjects(getSubjectsByYearFromContext(index + 1));
    };

    return (
        <section className="subjects-view d-flex">
            <TableToolbar setSubjects={setSubjects} anio={anio}></TableToolbar>
            <h1 style={{margin:`10px 0px`,}}>Materias de {materias[anio - 1]} año</h1>
            {<SubjectsTable subjects={subjects} setSubjects={setSubjects} />} {/* Mostrar la tabla solo si hay materias seleccionadas */}
        </section>
    )
}

export default SubjectsView;