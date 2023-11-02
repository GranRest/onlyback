
import React, { useState } from "react";

function Cart({ items }) {
  const [datalist, setDatalist] = useState(items);
  console.log("Lista de datos enviados")
  console.log(datalist);

  return (
    <div>
      <h1>Productos agregados al carrito</h1>

      {/* <ul>
          {items.map((item, index) => (
            <li key={item.id}>{item}</li>
          ))}
        </ul>  */}

      <div className="row">
        {datalist.map((result) => {
          return (
            <div className="col-sm-6 col-lg-3" key={result.id}>
              <div className="single-publication">
                <figure>
                  <a href="#?">
                    <img src={result.img} alt="Publication" />
                  </a>
                  <ul>
                    <li>
                      <a href="#?" title="Añadir a Favoritos">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#?" title="Añadir a comparación">
                        <i className="fa fa-refresh"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#?" title="Vistazo Rápido">
                        <i className="fa fa-search"></i>
                      </a>
                    </li>
                  </ul>
                </figure>
                <div className="publication-content">
                  <span className="category">Productos</span>
                  <h3>
                    <a href="#?">{result.name}</a>
                  </h3>
                  <ul>
                    <li>
                      <i className="icofont-star"></i>
                    </li>
                    <li>
                      <i className="icofont-star"></i>
                    </li>
                    <li>
                      <i className="icofont-star"></i>
                    </li>
                    <li>
                      <i className="icofont-star"></i>
                    </li>
                    <li>
                      <i className="icofont-star"></i>
                    </li>
                  </ul>
                  <h4 className="price">${result.price}</h4>
                </div>
                <div className="add-to-cart">
                  <button className="default-btn" >
                    Añadir al Carro
                  </button >
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default Cart;