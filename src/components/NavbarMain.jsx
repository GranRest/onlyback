import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/OnlyBack_mPix.png";
//import { fetchUserData } from "../../src/api/authenticationService";
import { useNavigate } from "react-router-dom";
import Context from "../../src/redux/controlUsuario/Context";

const NavbarMain = () => {
  const { state, setState } = useContext(Context);
  //const [data, setData] = useState({});
  const navigate = useNavigate();
  const [item, setItem] = useState(
    JSON.parse(localStorage.getItem("itemscart")) || 0
  );
  //const [linkImage, setlinkImage] = useState("");
  let activeStyle = {
    textDecoration: "none",
    backgroundColor: "#FFA500", // Color naranja personalizado
    borderRadius: "20px", // Hace que los bordes sean redondeados
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //let activeClassName = "underline";
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (currentUser) {
    // console.log(currentUser); Voy a omitir la siguientev linea para q no caiga en o
    // localStorage.setItem(
    //    "rolUser",
    //   JSON.stringify(currentUser?.roles[0]?.roleCode)
    // );
    // setState({ ...state, data: currentUser});
  } else {
    console.log("Cerrado y sin datos desde Navbar");
  }
  let firstName;
  let lastName;
  //let userROl;
  if (state && state.data) {
    console.log("desde Navbar state" + state.data.roles);
    firstName = state.data.firstName;
    lastName = state.data.lastName;
    //userROl=
  }

  const logOut = () => {
    //  localStorage.removeItem("rolUser");
    localStorage.setItem("rolUser", "user");
    localStorage.clear();
    setState("cerrado Sesion");
    navigate("/");
  };

  const rolUser = localStorage.getItem("rolUser");
  if (currentUser) {
    console.log("Opcion de admin llegado " + currentUser.data);
    console.log("rolUser:" + rolUser);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
      <div className="container d-flex justify-content-between align-items-center">
        <NavLink
          to="/"
          exact="true"
          className="navbar-brand  h2 align-self-center"
        >
          <img src={logo} alt="KMarket" className="logo" id="logo-img" />
          <span id="granrest">
            <strong>OnlyBack</strong>
          </span>
        </NavLink>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#templatemo_main_nav"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="align-self-center collapse navbar-collapse flex-fill justify-content-between"
          id="templatemo_main_nav"
        >
          <div className="flex-fill">
            <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
              <li className="nav-item">
                <NavLink
                  to="/"
                  activeclassname="active"
                  exact="true"
                  className="nav-link"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/shop"
                  activeclassname="active"
                  exact="true"
                  className="nav-link"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Tienda
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  activeclassname="active"
                  exact="true"
                  className="nav-link"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Acerca de
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  activeclassname="active"
                  exact="true"
                  className="nav-link"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Contacto
                </NavLink>
              </li>
              <li className="nav-item">
                {rolUser === '"ADMIN"' ? (
                  <NavLink
                    to="/crud"
                    activeclassname="active"
                    exact="true"
                    className="nav-link"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Gestión de productos
                  </NavLink>
                ) : (
                  <></>
                )}
              </li>
            </ul>
          </div>
          <div className="navbar align-self-center d-flex ">
             <div className="d-lg-none d-flex  mt-3 mb-4 col-7">
              <div className="input-group ">
                <input
                  type="text"
                  className=" form-control"
                  id="inputMobileSearch"
                  placeholder="Buscar..."
                />
                <div className="input-group-text">
                  <i className="fa fa-fw fa-search" />
                </div>
              </div>
            </div> 
            <div>
              <a
                className="nav-icon d-inline position-relative text-decoration-none"
                href="#?"
                data-bs-toggle="modal"
                data-bs-target="#templatemo_search"
              >
                <i className="fa fa-fw fa-search text-dark mr-2" />
              </a>
            </div> 
            <div className="d-flex">
              <NavLink
                className="nav-icon position-relative text-decoration-none"
                to="/cart"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1" />
                <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                  {item}
                </span>
              </NavLink>
            </div>
            {currentUser ? (
              <div className="flex-shrink-0 dropdown">
                <a
                  href="#?"
                  className="d-block link-dark text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://electronicssoftware.net/wp-content/uploads/user.png"
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                </a>
                {currentUser ? (
                  <ul className="dropdown-menu text-small shadow">
                    <li>
                      <a class="dropdown-item" href="#?">
                        {firstName && `${firstName} ${lastName}`}
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#?">
                        Configuración
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#?">
                        Perfil
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#?"
                        onClick={() => logOut()}
                      >
                        Cerrar Sessión
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul className="dropdown-menu text-small shadow align-self-center d-flex ">
                    {/* <li><hr className="dropdown-divider" /></li> */}
                    <li className="justify-content-between align-items-center align-self-center">
                      <NavLink
                        to="/login"
                        className="nav-icon position-relative text-decoration-none"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        Iniciar Sessión
                      </NavLink>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="">
                <NavLink
                  to="/login"
                  className="btn-success btn-login btn btn-outline-primary me-2"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Iniciar Sesión
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMain;
