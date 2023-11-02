import team1 from "../images/team1.jpeg";
import team2 from "../images/team2.jpg";
import team3 from "../images/team3.jpeg";
import { Github } from "react-bootstrap-icons";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-section">
        <h1>Sobre Nosotros</h1>
        <p>
          GrantRest Tecnology somos un grupo de personas dispuestas a resolver
          problemas a través de la tecnología. Desarrollamos software con las
          tecnologías del momento, avanzamos hacia el futuro, compartiendo
          conocimientos y nunca dejamos de aprender, no ganamos a los clientes;
          ganamos junto a ellos.
        </p>
      </div>
      <h2>Nuestro equipo</h2>
      <div className="about_main_container row">
        <div className="column">
          <div className="floating card">
            <img src={team1} alt="Jorge" />
            <div className="container">
              <h2>Jorge Castro</h2>
              <p className="title">Programador</p>
              <p>Disfruto mucho programar y jugar videojuegos.</p>
              <p>david92_jc@yahoo.es</p>
              <p className="about-github-container">
                <a
                  className="btn btn-warning"
                  href="https://github.com/jeici21"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github color="white" size={30} />
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="floating card">
            <img src={team2} alt="Luis" />
            <div className="container">
              <h2>Luis Anrrango</h2>
              <p className="title">Programador</p>
              <p>
                Soy una persona emprendedora con mente abierta a prender nuevas
                herramientas y tecnologías, mi sueño es crear una StartUp
              </p>
              <p>luisitoylag@gmail.com</p>
              <p className="about-github-container">
                <a
                  className="btn btn-warning"
                  href="https://github.com/LuisRAnrrango"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github color="white" size={30} />
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="floating card">
            <img src={team3} alt="Ariel" />
            <div className="container">
              <h2>Ariel Piguave</h2>
              <p className="title">Programador</p>
              <p>
                Me gusta investigar y colaborar con personas que me rodean,
                disfruto solucionar problemas a las personas
              </p>
              <p>arielpiguave@gmail.com</p>
              <p className="about-github-container">
                <a
                  className="btn btn-warning"
                  href="https://github.com/Piguave"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github color="white" size={30} />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
