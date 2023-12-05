//import axios from "axios";
import { useEffect, useState } from "react";
import { loadProducts } from "../api/loadProducts";
import axios from "axios";
import {
  getFirestore,
  query,
  collection,
  getDocs,
  limit,
} from "firebase/firestore";
import appFirebase from "../data/configFirebase";
import { NavLink } from "react-router-dom";

const Carousel = () => {
  const [products, setProducts] = useState([]);
  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  /*     useEffect(() => {//obteniendo los 3 primeros productos de la api
        axios.get("http://localhost:8080/product").then(res => setProducts(shuffle(res.data).slice(0, 3)))
            .catch(error => console.error(error));
    }, []);

    const getProductsFromDb = async () => {
        const resp = await (await loadProducts()).data;
        if (resp) {
            //obteniendo los 3 primeros productos de la api
            setProducts(resp.slice(0, 3));
        }
        console.log(resp);
    } */
  //OBTENER DATOS DEL PRODUCTO

  const db = getFirestore(appFirebase); // Reemplaza appFirebase con tu instancia de Firebase

  const getProductData = async () => {
    try {
      const productsCollection = collection(db, "productos"); // Reemplaza "productos" con el nombre de tu colección
      const q = query(productsCollection, limit(3)); // Limitar a los primeros 3 productos
      const productsSnapshot = await getDocs(q);

      const productsData = [];
      productsSnapshot.forEach((doc) => {
        const product = doc.data();
        productsData.push(product);
      });
      setProducts(productsData); // Actualizar el estado con los datos
    } catch (error) {
      console.error("Error al obtener datos de Firestore: ", error);
    }
  };
  useEffect(() => {
    getProductData(); // Esto se ejecutará una vez al montar el componente
  }, []);
  //getProductData();

  return (
    <div
      id="template-mo-jassa-hero-carousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <ol className="carousel-indicators">
        {products?.map(
          (
            product,
            index //mostrando un producto por página
          ) => (
            <li
              data-bs-target="#template-mo-jassa-hero-carousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
            />
          )
        )}
      </ol>
      <div className="carousel-inner">
        {products.map((product, index) => (
          <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <div className="container">
              <div className="row p-5" key={product.id}>
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img className="img-fluid" src={product.img} alt="" />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left align-self-center">
                    <h1 className="h1">
                      <b>{product.name}</b>
                    </h1>
                    <h3 className="h2">{product.description}</h3>
                    <p>{product.longdesc}</p>
                    <p className="text-center">
                      <NavLink
                        to="/shop"
                        activeclassname="active"
                        exact="true"
                        className="btn-login btn btn-success"
                      >
                        Ir a la tienda
                      </NavLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev text-decoration-none w-auto ps-3"
        href="#template-mo-jassa-hero-carousel"
        role="button"
        data-bs-slide="prev"
      >
        <i className="fas fa-chevron-left"></i>
      </a>
      <a
        className="carousel-control-next text-decoration-none w-auto pe-3"
        href="#template-mo-jassa-hero-carousel"
        role="button"
        data-bs-slide="next"
      >
        <i className="fas fa-chevron-right"></i>
      </a>
    </div>
  );
};

export default Carousel;
