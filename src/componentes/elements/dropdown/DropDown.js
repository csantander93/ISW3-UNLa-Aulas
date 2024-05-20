import './DropDown.css'
function DropDown({ options, action }) {

    return (
        <section className='dropdown d-flex flex-d-c'>
            <div className='d-flex flex-j-a-c'>
                <span>Filtros</span>
                <img alt='' src='../icons/left_arrow.png'/>
            </div>
            <div className='d-flex flex-d-c'>
                {options && options.length > 0 && options.map((o, index) => (
                    <button className='btn-cmn' key={index} type="button" onClick={() => action(o)}>
                        {o.text}
                    </button>
                ))}
            </div>
        </section>
    )
}

export default DropDown;