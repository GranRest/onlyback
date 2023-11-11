import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterUser({ show, onHide }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const auth = getAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      // Usuario registrado con éxito, puedes redirigirlo a la página de inicio, mostrar un mensaje, etc.
      onHide(); // Cierra el modal después de registrar al usuario
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Registro de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Registrarse
          </Button>
        </Modal.Footer>
      </Modal>

      <Alert
        show={showAlert}
        variant="success"
        onClose={() => setShowAlert(false)}
        dismissible
        className="alert alert-success custom-alert"
        style={{ textAlign: "right", right: "1rem", maxWidth: "300px" }}
      >
        Registrado correctamente
      </Alert>
    </div>
  );
}
