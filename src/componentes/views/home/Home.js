import { default as React } from "react";
import './Home.css';

function Home() {
  

  return (
    <section className="home d-flex flex-j-a-c">
      <div className="d-flex flex-d-c flex-j-a-c">
        <h1>¡Bienvenido a la administración!</h1>
        <h3>En este módulo encontrará toda las herramientas para la gestión del sitio</h3>
        <p>Cualquier problema comuníquese con el Grupo del TP</p>
      </div>
    </section>
  )
}

export default Home;