import "./App.css";
import "./styles/Animations.css";
import "./styles/Styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavbarInfo from "./components/NavbarInfo";
import NavbarMain from "./components/NavbarMain";
import Search from "./components/Search";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Contactpage from "./pages/Contactpage";
import LoginPage from "./pages/LoginPage";
import { Dashboard } from "./pages/dashboard/dashboard";
import React, { useState } from "react";
import Crud from "./components/Crud";
import Shop from "./components/Shop";
import ShoppingCart from "./components/ShoppingCart";
import Context from "../src/redux/controlUsuario/Context";
import PageDetails from "./components/PageDetails";
import PaymentSuccess from "./components/PaymentSuccess";
import appFirebase from "./data/configFirebase";
import { getFirestore } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("product")) || []
  );
  const [quan, setQuan] = useState(localStorage.getItem("quantities") || []);

  /*   const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []); */

  const handleAddToCart = (product) => {
    if (!cart.find((p) => p.id === product.id)) {
      let existingProducts = JSON.parse(localStorage.getItem("product")) || [];
      existingProducts.push(product);
      setCart(existingProducts);
      localStorage.setItem("product", JSON.stringify(existingProducts));
      localStorage.setItem(
        "itemscart",
        JSON.stringify(existingProducts.length)
      );
      let existingQuantities =
        JSON.parse(localStorage.getItem("quantities")) || [];
      existingQuantities.push(1);
      localStorage.setItem("quantities", JSON.stringify(existingQuantities));

      //window.alert(`${product.name} was added to the cart`);
      // Después de agregar un producto al carrito, muestra un mensaje y cierra la alerta después de 3 segundos
      //  showAlertk(`${product.name} se agregó al carrito`, 3000);

      Swal.fire({
        icon: "success",
        title: "Producto añadido al carrito",
        text: `${
          product.name
        } se ha añadido al carrito.\nCARRITO DE COMPRAS ACTUAL:\n${cart
          .map((p) => p.name)
          .join("\n")}`,
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      //window.alert(`${product.name} is already in the cart`);
    }
    console.log("cart: " + cart);
  };
  /*
  function showAlertk(message, duration) {
    window.alert(message); // Muestra la alerta

    // Utiliza setTimeout para cerrar la alerta después de un cierto tiempo (en milisegundos)
    setTimeout(() => {
      window.close(); // Cierra la alerta
    }, duration);
  }
*/
  function handleRemoveFromCart(productToRemove) {
    let existingProducts = JSON.parse(localStorage.getItem("product")) || [];
    let updatedProducts = existingProducts.filter(
      (p) => p.id !== productToRemove.id
    );
    setCart(updatedProducts);
    localStorage.setItem("product", JSON.stringify(updatedProducts));
    localStorage.setItem("itemscart", JSON.stringify(updatedProducts.length));
  }

  const Provider = ({ children }) => {
    const [state, setState] = React.useState({});
    return (
      <Context.Provider value={{ state, setState }}>
        {children}
      </Context.Provider>
    );
  };

  return (
    <div className="app">
      {/*       {loading ? (
        <div className="loader-container">
          <div className="spinner" />
        </div>
      ) : ( */}
      <Provider>
        <BrowserRouter>
          <NavbarInfo />
          <NavbarMain />
          <Search />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/shop"
              element={<Shop onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/cart"
              element={
                <ShoppingCart
                  items={cart}
                  onRemoveToCart={handleRemoveFromCart}
                />
              }
            />
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/contact" element={<Contactpage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crud" element={<Crud />} />
            <Route
              path="/details/:id"
              element={<PageDetails onAddToCart={handleAddToCart} />}
            />
            <Route path="/payment" element={<PaymentSuccess />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
      {/* )}; */}
    </div>
  );
}

export default App;
