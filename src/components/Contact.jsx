import { useState } from "react";

const Contact = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState("");
  const [textarea, setTextarea] = useState("");
  //const [mapHeight, setMapHeight] = useState(0);

  /* useEffect(() => {
    function handleResize() {
      setMapHeight(window.innerHeight * 0.9);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); */
  const [mensaje, setMensaje] = useState("");

  const onChangeHandler = (fieldName, value) => {
    const setters = {
      nombre: setNombre,
      email: setEmail,
      asunto: setAsunto,
      textarea: setTextarea,
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
  };
  function handleClick() {
    let mensajeC=
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
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="wrapper">
          <div className="contact_main_container row no-gutters mb-5">
            <div className="col-md-5 ">
              <div className="contact-wrap w-100 p-md-3 p-2 border rounded">
                <h3 className="mb-2">Contáctanos</h3>
                <div id="form-message-warning" className="mb-2"></div>
                <div id="form-message-success" className="mb-2">
                  En que podemos Ayudarte?
                </div>
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
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="label" for="subject">
                          Tema
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
                          placeholder="Tema"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="label" for="#">
                          Mensaje
                        </label>
                        <textarea
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
                          placeholder="Mensaje"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <a
                          href={mensaje}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button
                            type="button"
                            onClick={handleClick}
                            className="btn-login btn"
                          >
                            Enviar
                          </button>
                        </a>

                        <div className="submitting"></div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="container_map col-md-5 d-flex align-items-stretch">
              <div className="container_map" id="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.726910294897!2d-77.94283582584866!3d0.3878455996083505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2a27776bcbaeb5%3A0x8f57b87bd81c21e9!2sGranRest%20Tecnology!5e0!3m2!1ses-419!2sec!4v1696805045643!5m2!1ses-419!2sec"
                  className="contact_map"
                  allowfullscreen
                  loading="lazy"
                  title="Ubicación"
                  referrerpolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
