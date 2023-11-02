import { useState, useContext } from "react";
import { connect } from "react-redux";
import { authenticate, authFailure, authSuccess } from "../redux/authActions";
import Context from "../../src/redux/controlUsuario/Context";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../images/OnlyBack_mPix.png";
import RegisterUser from "./RegisterUser";

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

//import { Alert, Spinner } from "react-bootstrap";

const Login = ({ loading, error, ...props }) => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const { state, setState } = useContext(Context);
  const navigate = useNavigate();
  const auth = getAuth();
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // Obten los valores del formulario
    const { userName, password } = values;
    console.log("email" + userName + " Clave " + password);

    signInWithEmailAndPassword(auth, userName, password)
      .then((userCredential) => {
        // Signed in
        navigate("/shop");
        const user = userCredential.user;
        const userData = {
          uid: user.uid,
          email: user.email,
          //Agrega otros datos que necesites guardar
        };
        localStorage.setItem("currentUser", JSON.stringify(userData));
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        props.loginFailure(
          "¡Oops, algo anda mal! Por favor, inténtelo de nuevo"
        );
      });
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  //PROBANDO REGISTER DESDE OTRO COMPONENTE
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleShowRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const [passwordType, setPasswordType] = useState("password");

  // Configura el proveedor de Google
  const provider = new GoogleAuthProvider();

  // Función para iniciar sesión con Google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        localStorage.setItem("currentUser", JSON.stringify(result));
        navigate("/shop");
        // El usuario se ha autenticado con éxito, puedes acceder a los datos de usuario en result.user
      })
      .catch((error) => {
        // Manejo de errores en caso de fallo
        console.error(error);
      });
  };

  return (
    <div className="login-page">
      {currentUser ? (
        <div class="card text-center">
          <div class="card-header"></div>
          <div class="card-body">
            <h5 class="card-title">Sesión Activa</h5>
            <p class="card-text">
              Solo puedes realizar compras si has iniciado sesión.
            </p>
            <button type="button" class="btn btn-info">
              {" "}
              <NavLink to="/shop">Ir a Comprar</NavLink>
            </button>
          </div>
        </div>
      ) : (
        <div className="row nosotros justify-content-center">
          <div class="col-md-4 d-flex flex-column justify-content-center align-items-center text-center">
            <img
              src={logo}
              alt="Descripción de tu imagen"
              class="mx-auto img-fluid"
              width="150PX"
            />
            <h2>Si tienes Whatsapp ya puedes comprar con Nosostros</h2>
            <p>
              "Únete a nuestra revolución de compras en línea y regístrate hoy
              mismo para acceder a productos exclusivos, descuentos únicos y una
              experiencia de compra en línea sin precedentes."
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center ">
            <div className="card p-0 m-4 col-md-6 bgbtn">
              <h4 className="card-title text-center mb-4">Iniciar Sesión</h4>
              <form onSubmit={handleSubmit} className="">
                <div className="form-group mb-3 ">
                  <label htmlFor="username" className="form-label">
                    Usuario
                  </label>
                  <input
                    id="username"
                    type="text"
                    className={`form-control ${
                      values.userName ? "is-valid" : "is-invalid"
                    }`}
                    minLength={5}
                    value={values.userName}
                    onChange={handleChange}
                    name="userName"
                    required
                  />
                  <div className="invalid-feedback">Ingresa tu usuario</div>
                </div>
                <div className="form-group mb-3 ">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <div className="input-group">
                    <input
                      id="password"
                      type={passwordType}
                      className={`form-control ${
                        values.password ? "is-valid" : "is-invalid"
                      }`}
                      minLength={8}
                      value={values.password}
                      onChange={handleChange}
                      name="password"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary input-group-text"
                      onClick={() =>
                        setPasswordType(
                          passwordType === "password" ? "text" : "password"
                        )
                      }
                    >
                      {passwordType === "password" ? (
                        <i className="bi bi-eye"></i>
                      ) : (
                        <i className="bi bi-eye-slash"></i>
                      )}
                    </button>
                    <div className="invalid-feedback">
                      Ingresa tu contraseña
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      name="rememberMe"
                      value={values.rememberMe}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Recuérdame
                    </label>
                  </div>
                </div>
                <div className="form-group d-grid gap-2 mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </button>
                </div>
                <div className="text-center">----------o----------</div>
                <button
                  onClick={signInWithGoogle}
                  className="btn btn-outline-primary btn-google w-100"
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                    alt="Google Logo"
                    class="google-logo btn-google-logo"
                  />
                  Iniciar sesión con Google
                </button>
              </form>
              <div className="d-flex justify-content-center">
                <div>No tienes una cuenta?</div>
                <a
                  href="#?"
                  className="text-decoration-none fw-semibold ms-2"
                  onClick={handleShowRegisterModal}
                >
                  Regístrate
                </a>
              </div>
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>{" "}
        </div>
      )}
      {/* Renderiza el modal de registro */}
      <RegisterUser
        show={showRegisterModal}
        onHide={handleCloseRegisterModal}
      />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  console.log("state ", auth);
  return {
    loading: auth.loading,
    error: auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
    setUser: (data) => dispatch(authSuccess(data)),
    loginFailure: (message) => dispatch(authFailure(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
