import { useState } from 'react';
import DropDown from '../dropdown/DropDown';
import './TableToolbar.css';
import { useSubjects } from '../../contexts/SubjectContext/useSubjects';

const OPTIONS = [
    {
        key: "turno",
        value: "TM",
        text: "Turno mañana"
    },
    {
        key: "turno",
        value: "TN",
        text: "Turno noche"
    },
    {
        key: "aulaAsignada",
        value: 0,
        text: "Sin asignar"
    },
    {
        key: "aulaAsignada",
        value: 1,
        text: "Asignada"
    },


]
function TableToolbar({ setSubjects,anio }) {
    const [optionsSelected, setOptionsSelected] = useState([]);
    const { filterSubjects } = useSubjects();
    const selectOption = (option) => {
        let options = [];
        if (optionsSelected && optionsSelected.length > 0 && optionsSelected.filter((o) => o === option).length > 0) {
            options = optionsSelected.filter((o) => o !== option);
        } else options = [...optionsSelected, option];
        setOptionsSelected(options);

        anio && setSubjects(filterSubjects(options,Number(anio)));
    }
    return (
        <section className="table-toolbar d-flex flex-j-a-start">
            <section className='d-flex flex-d-c'>
                <DropDown options={OPTIONS.filter((o) => { return optionsSelected.filter((os) => o === os || o.key === os.key).length === 0 })} action={selectOption} />
                <div className='d-flex'>
                    {optionsSelected && optionsSelected.length > 0 && optionsSelected.map((opSelected, index) => (
                        <div key={index} className='chip d-flex flex-j-a-c'>
                            <p>{opSelected.text}</p>
                            <span onClick={() => selectOption(opSelected)} className='d-flex flex-j-a-c'>x</span>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    )
}

export default TableToolbar;