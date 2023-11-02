import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  limit,
  getDocs,
} from "firebase/firestore";
import appFirebase from "../data/configFirebase";
const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  //OBTENER DATOS DEL PRODUCTO

  const db = getFirestore(appFirebase); // Reemplaza appFirebase con tu instancia de Firebase

  const getProductData = async () => {
    try {
      const productsCollection = collection(db, "ProductosDestacados"); // Reemplaza "productos" con el nombre de tu colección
      const q = query(productsCollection, limit(3)); // Limitar a los primeros 3 productos
      const productsSnapshot = await getDocs(q);

      const productsData = [];
      productsSnapshot.forEach((doc) => {
        const product = doc.data();
        productsData.push(product);
      });
      setProducts(productsData); // Actualizar el estado con los datos
      console.log("Datos desde Firebase:");
      console.log(productsData);
      // Ahora, `productsData` contiene los datos de la colección "productos"
    } catch (error) {
      console.error("Error al obtener datos de Firestore: ", error);
    }
  };
  useEffect(() => {
    getProductData(); // Esto se ejecutará una vez al montar el componente
  }, []);
  const filteredProducts = products
    ? products
        .filter((product) => product)
        .sort((a, b) => b.dimensions - a.dimensions)
        .slice(0, 3)
    : products;

  return (
    <section className="bg-light">
      <div className="container py-5">
        <div className="row text-center py-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Productos destacados</h1>
          </div>
        </div>
        <div className="row">
          {filteredProducts.map((result) => {
            return (
              <div className="floating col-12 col-md-4 mb-4 " key={result.id}>
                <div className="card h-100">
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                      <NavLink
                        to={`/details/id:${result.id}`}
                        title="Vistazo Rápido"
                        className="bg"
                      >
                        <img
                          src={result.img}
                          className=""
                          width="300px"
                          alt=""
                        />
                      </NavLink>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled d-flex justify-content-between">
                      <li>
                        <i className="text-warning fa fa-star"></i>
                        <i className="text-warning fa fa-star"></i>
                        <i className="text-warning fa fa-star"></i>
                        <i className="text-warning fa fa-star"></i>
                        <i className="text-muted fa fa-star"></i>
                      </li>
                      <li className="text-muted text-right">${result.price}</li>
                    </ul>
                    <a href="#?" className="h2 text-decoration-none text-dark">
                      {result.name}
                    </a>
                    <div className="flex-wrap">
                      <p className="card-text text-truncate">
                        {result.longdesc}
                      </p>
                    </div>
                    <p className="text-muted">Reviews (24)</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
