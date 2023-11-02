import { NavLink } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark" id="tempaltemo_footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 pt-5">
            <h2 className="h2 border-bottom pb-3 border-light logo">
              OnlyBack
            </h2>
            <ul className="list-unstyled text-light footer-link-list">
              <li>
                <i className="fas fa-map-marker-alt fa-fw"></i>
                Pimampiro - Ecuador
              </li>
              <li>
                <i className="fa fa-phone fa-fw"></i>
                <a className="text-decoration-none" href="#?">
                  0993273984
                </a>
              </li>
              <li>
                <i className="fa fa-envelope fa-fw"></i>
                <a className="text-decoration-none" href="#?">
                  granresttecnology2021@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 pt-5">
            <h2 className="h2 text-light border-bottom pb-3 border-light">
              Productos y Servicios
            </h2>
            <ul className="list-unstyled text-light footer-link-list">
              <li>
                <NavLink className="text-decoration-none" to="/shop">
                  Servicios de Cuentas Streaming
                </NavLink>
              </li>
              <li>
                <NavLink className="text-decoration-none" to="/shop">
                  Accesorios para Computadores
                </NavLink>
              </li>
              <li>
                <NavLink className="text-decoration-none" to="/shop">
                  Accesorios para celulares
                </NavLink>
              </li>
              <li>
                <NavLink className="text-decoration-none" to="/shop">
                  Desarrollo de Paginas Web
                </NavLink>
              </li>
              <li>
                <NavLink className="text-decoration-none" to="/shop">
                  Desarrollo de Software a medida
                </NavLink>
              </li>
              <li>
                <NavLink className="text-decoration-none" to="/shop">
                  Mantenimiento y Reparación de Computadoras
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className="text-decoration-none">
                  Instalación de canales Online
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-4 pt-5">
            <h2 className="h2 text-light border-bottom pb-3 border-light">
              Más Información
            </h2>
            <ul className="list-unstyled text-light footer-link-list">
              <li>
                <NavLink
                  to="/"
                  activeclassname="active"
                  exact="true"
                  className="text-decoration-none"
                >
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  activeclassname="active"
                  exact="true"
                  className="text-decoration-none"
                >
                  Acerca de
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  activeclassname="active"
                  exact="true"
                  className="text-decoration-none"
                >
                  Contacto
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="row text-light mb-4">
          <div className="col-12 mb-3">
            <div className="w-100 my-3 border-top border-light"></div>
          </div>
          <div className="col-auto me-auto">
            <ul className="list-inline text-left footer-icons">
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a
                  className="text-light text-decoration-none"
                  target="_blank"
                  href="#?"
                >
                  <i className="fab fa-facebook-f fa-lg fa-fw"></i>
                </a>
              </li>
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a
                  className="text-light text-decoration-none"
                  target="_blank"
                  href="#?"
                >
                  <i className="fab fa-instagram fa-lg fa-fw"></i>
                </a>
              </li>
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a
                  className="text-light text-decoration-none"
                  target="_blank"
                  href="#?"
                >
                  <i className="fab fa-twitter fa-lg fa-fw"></i>
                </a>
              </li>
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a
                  className="text-light text-decoration-none"
                  target="_blank"
                  href="#?"
                >
                  <i className="fab fa-linkedin fa-lg fa-fw"></i>
                </a>
              </li>
            </ul>
          </div>
          {/*                     <div className="col-auto">
                        <label className="sr-only" htmlFor="subscribeEmail">Correo electrónico</label>
                        <div className="input-group mb-2">
                            <input type="text" className="form-control bg-dark border-light" id="subscribeEmail"
                                placeholder="Correo electrónico" />
                            <div className="input-group-text btn-success text-light">Suscripción</div>
                        </div>
                    </div> */}
        </div>
      </div>
      <div className="copy-footer w-100 bg-black py-3">
        <div className="container">
          <div className="row pt-2">
            <div className="col-12">
              <p className="text-center text-light">
                Copyright &copy; {year} OnlyBack | <a
                  className="textgt text-decoration-none"
                  target="_blank"
                  href="https://granrest-tecnology.web.app/home"
                >Designed by GranRest
                Tecnology
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
