import './Screen.css'
export function Screen({ renderHeader, renderLatNavbar, renderBody }) {

    return (
        <section className="screen" >
            <header>
                {renderHeader ? renderHeader() : null}
            </header>
            {renderLatNavbar ? <aside> {renderLatNavbar()} </aside> : <></>}

            <section className='view'>
                {renderBody ? renderBody() : null}
            </section>
        </section>
    )
}

