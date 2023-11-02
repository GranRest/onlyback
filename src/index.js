import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Whatsapp } from "react-bootstrap-icons";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <a
      class="float"
      target="_blank"
      rel="noreferrer"
      href="https://api.whatsapp.com/send?phone=593993273984&text=¡Hola!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20%20sobre%20sus%20productos%20y%20servicios."
    >
      <Whatsapp color="white" size={32} />
    </a>
    <ScrollToTopButton />
  </Provider>
);
