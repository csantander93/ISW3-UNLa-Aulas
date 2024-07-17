import { default as React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import './SubjectDetailView.css';
import { useSubjects } from "../../../contexts/SubjectContext/useSubjects";
import { NavLink } from "react-router-dom";

function SubjectDetailView() {
    const { anio, name,turno } = useParams();
    const { getSubjectsByName } = useSubjects();
    const [subjectDetail, setSubjectDetail] = useState(undefined);
    const navigate = useNavigate();
    useEffect(() => {
        if (name,turno) {
            initView(name,turno)
        }
    }, [name])
    const initView = async (name,turno) => {
        let subject = await getSubjectsByName(name,turno);
        if (subject) setSubjectDetail(subject)
        else navigate(`/home/subjects/${anio}`)
    }
    return (
        subjectDetail ?
            <section className="subject-detail-view d-flex flex-d-c" >
                <header className="d-flex">
                    <h1>Materia: {subjectDetail.nombre}</h1><NavLink className="btn-cmn" to={`/home/subjects/${anio}`}>Volver</NavLink>
                </header>
                <div className="d-flex flex-d-c">
                    <h3>Información</h3>
                    <section className="d-flex flex-d-c" style={{ gap: 10 }}>
                        <Field name={"Año"} value={subjectDetail.anioPertenece} />
                        <Field name={"Aula asignada"} value={subjectDetail.aulaAsignada ? "SI" : "NO"} />
                        <Field name={"Turno"} value={subjectDetail.turno} />
                        <Field name={"Docente"} value={subjectDetail.docenteACargo} />
                    </section>
                </div>
                <div className="d-flex flex-d-c" style={{gap:20}}>
                    <h3>Alumnos</h3>
                    <section className="d-flex flex-d-c" style={{gap:20,overflowY:"scroll",height:400}}>
                        {subjectDetail.materiaEstudianteList.map((mEst,index) => (
                            <div key={index} className="d-flex" style={{gap:10, borderTop:"solid 0.1px grey",flexWrap:"wrap"}}>
                                <Field name={"Nombre completo"} value={mEst.estudiante.apellido + " " + mEst.estudiante.nombre} />
                                <Field name={"Documento"} value={mEst.estudiante.dni} />
                                <Field name={"Correo"} value={mEst.estudiante.email} />
                                <Field name={"Correo"} value={mEst.estudiante.cohorte} />
                                <Field name={"Fecha inscripcion"} value={mEst.fechaInscripcion} />
                            </div>
                        ))}
                    </section>
                </div>
                <footer className="d-flex">
                    <NavLink className={"btn-cmn"} to={`/home/subjects/${anio}`}>Volver</NavLink>
                </footer>
            </section> : <></>
    )
}

export function Field({ name, value }) {
    return (
        <div className="d-flex flex-d-c" style={{ gap: 10 }}>
            <small><strong>{name}</strong></small>
            <p style={{ padding: 10, minWidth: 340, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "3px" }}>{value}</p>
        </div>
    )
}


export default SubjectDetailView;