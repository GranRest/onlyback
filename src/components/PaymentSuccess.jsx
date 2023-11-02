import { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import logo from "../images/k-Market.png";
import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const PaymentSuccess = (items) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [asunto, setAsunto] = useState(""); //cedula
  const [textarea, setTextarea] = useState(""); //direccion
  const [referencia, setReferencia] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState(
    JSON.parse(localStorage.getItem("quantities")) ||
      Array(items.length).fill(1)
  );
  useEffect(() => {
    if (localStorage.getItem("quantities") !== null) {
      setQuantities(JSON.parse(localStorage.getItem("quantities")));
    } else {
      setQuantities(items.map(() => 1));
      localStorage.setItem("quantities", JSON.stringify(quantities));
      console.log(items.map(() => 1));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [quantities]);

  useEffect(() => {
    setProducts(items);
    console.log(products);
  }, [products]);

  
  const cant = products.length;
  const handleChange = (index, event) => {
    const value = Number(event.target.value);
    if (value >= 1) {
      const newQuantities = [...quantities];
      newQuantities[index] = value;
      setQuantities(newQuantities);
    }
  };

  const onChangeHandler = (fieldName, value) => {
    const setters = {
      nombre: setNombre,
      email: setEmail,
      asunto: setAsunto,
      textarea: setTextarea,
      referencia: setReferencia,
      telefono: setTelefono,
    };

    const setter = setters[fieldName];
    if (setter) {
      setter(value);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert("Gracias por escribirnos.");
    setNombre("");
    setEmail("");
    setAsunto("");
    setTextarea("");
    setReferencia("");
    setTelefono("");
  };

  function handleClick() {
    let mensajeC =
      `Saludos, mi nombre es` +
      nombre +
      ` el motivo de escribir es ` +
      asunto +
      ` en el cual ` +
      textarea +
      ` le dejo mi correo para que podeamos estar en contacto ` +
      email;
    setMensaje(
      `https://api.whatsapp.com/send?phone=593993273984&text=${mensajeC}`
    );
  }
  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-8">
          <div className="contact-wra w-100 p-md-3 p-2 border rounded">
            <h3 className="mb-2">Facturación y envio</h3>
            <div id="form-message-warning" className="mb-2"></div>
            <div id="form-message-success" className="mb-2"></div>
            <form
              onSubmit={(e) => {
                onSubmitHandler(e);
              }}
              method="POST"
              id="contactForm"
              name="contactForm"
              className="contactForm"
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="label" for="name">
                      Nombre y apellido
                    </label>
                    <input
                      value={nombre}
                      onChange={(e) => {
                        onChangeHandler("nombre", e.target.value);
                      }}
                      type="text"
                      className="form-control p-1 my-1"
                      name="name"
                      id="name"
                      placeholder="Name"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="label" for="email">
                      Correo Electrónico
                    </label>
                    <input
                      value={email}
                      onChange={(e) => {
                        onChangeHandler("email", e.target.value);
                      }}
                      type="email"
                      required
                      className="form-control p-1 my-1"
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="label" for="subject">
                      Cédula
                    </label>
                    <input
                      value={asunto}
                      onChange={(e) => {
                        onChangeHandler("asunto", e.target.value);
                      }}
                      type="text"
                      required
                      className="form-control p-1 my-1"
                      name="subject"
                      id="subject"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="label" for="subject">
                      Teléfono
                    </label>
                    <input
                      value={telefono}
                      onChange={(e) => {
                        onChangeHandler("telefono", e.target.value);
                      }}
                      type="text"
                      required
                      className="form-control p-1 my-1"
                      name="subject"
                      id="subject"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="label" for="#">
                      Dirección de domicilio
                    </label>
                    <input
                      value={textarea}
                      onChange={(e) => {
                        onChangeHandler("textarea", e.target.value);
                      }}
                      name="message"
                      required
                      className="form-control p-1 my-1"
                      id="message"
                      cols="30"
                      rows="4"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="label" for="#">
                      Referencia domiciliaria
                    </label>
                    <input
                      value={referencia}
                      onChange={(e) => {
                        onChangeHandler("referencia", e.target.value);
                      }}
                      name="message"
                      required
                      className="form-control p-1 my-1"
                      id="message"
                      cols="30"
                      rows="4"
                      placeholder="referencia (opcional)"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div class="card border-secondary mb-3">
                    <div class="card-header">Método de envio</div>
                    <div class="card-body text-secondary">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios1"
                          value="option1"
                          checked
                        />
                        <label class="form-check-label" for="exampleRadios1">
                          Envío a domicilio(Transporte o Servientrega)
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios2"
                          value="option2"
                        />
                        <label class="form-check-label" for="exampleRadios2">
                          Retiro en Oficina(OnlyBack -GranRest Tecnology)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div class="card border-secondary mb-3">
                    <div class="card-header">Método de Pago</div>
                    <div class="card-body text-secondary">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Transferencia Bancaria
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Depósito en efectivo
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <a href={mensaje} target="_blank" rel="noopener noreferrer">
                      <button
                        type="button"
                        onClick={handleClick}
                        className="btn-login btn"
                      >
                        Finalizar Compra
                      </button>
                    </a>

                    <div className="submitting"></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card border-secondary mb-3">
            <div class="card-header">Productos Seleccionados</div>
            <div class="card-body text-secondary">
              <MDBCol lg="7">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="mb-1">Carrito de compras</p>
                    <p className="mb-0">Tiene {cant} productos en su carrito</p>
                  </div>
                  <div>
                    <p>
                      <span className="text-muted">Ordenar por:</span>
                      <a href="#!" className="text-body">
                        precio
                        <MDBIcon fas icon="angle-down mt-1" />
                      </a>
                    </p>
                  </div>
                </div>

                {products.map((product, index) => (
                  <MDBCard className="mb-3" key={product.id}>
                    <MDBCardBody>
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <div className="d-flex flex-row align-items-center mb-3 mb-md-0 col-lg-9">
                          <div>
                            <MDBCardImage
                              src={product.img}
                              width="50"
                              height="50"
                              className="rounded-3"
                              alt={product.name}
                            />
                          </div>
                          <div className="ms-3 col-xs-12">
                            <MDBTypography tag="h5" className="">
                              {product.name}
                            </MDBTypography>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-end">
                          <div className="cart-quantity me-3">
                            <MDBInput
                              type="number"
                              value={quantities[index] || 1}
                              onChange={handleChange.bind(null, index)}
                            />
                          </div>
                          <div className="cart-price me-3">
                            <MDBTypography tag="h5" className="mb-0">
                              {(product.price * quantities[index]).toFixed(2)}
                            </MDBTypography>
                          </div>
                          
                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                ))}
                <MDBTypography tag="h5">
                  <NavLink
                    to="/shop"
                    activeclassname="active"
                    exact="true"
                    className="nav-link"
                  >
                    <MDBIcon fas icon="long-arrow-alt-left me-2" />
                    Seguir comprando
                  </NavLink>
                </MDBTypography>
              </MDBCol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
