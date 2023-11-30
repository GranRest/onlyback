/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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
import logo from "../images/OnlyBack_mPix.png";
import { NavLink } from "react-router-dom";

function ShoppingCart({ items, onRemoveToCart }) {


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

  const total = products.reduce(
    (acc, product, index) => acc + product.price * quantities[index],
    0
  );
  const cant = products.length;
  const handleChange = (index, event) => {
    const value = Number(event.target.value);
    if (value >= 1) {
      const newQuantities = [...quantities];
      newQuantities[index] = value;
      setQuantities(newQuantities);
    }
  };

  const handleRemoveProduct = (product, index) => {
    const newQuantities = quantities.filter((_, i) => i !== index);
    setQuantities(newQuantities);
    localStorage.setItem("quantities", JSON.stringify(newQuantities));

    setProducts(products.filter((products) => products.id !== product.id));
    onRemoveToCart(product);
  };

  const sendMessage = () => {
    const phoneNumber = encodeURIComponent(593993273984);
    let message = encodeURIComponent("");
    message +=
      `-------------------------*FACTURA*------------------------\n` +
      `FACSIW001\n`;
    products.forEach((product, index) => {
      message +=
        `*Producto ${index + 1}*\n` +
        `*${product.name}* \n` +
        `Descripcion: ${product.description}\n` +
        `Imagen: https://www.onlybackstore.com/details/id:${product.id}\n\n` +
        `Precio Unitario: ${product.price}\n\n`;
    });

    message +=
      `*SubTotal:* ${total.toFixed(2)}\n\n` +
      `*Descuento:* ${(total * 0.1).toFixed(2)}\n\n` +
      `*Total:* ${(total - total * 0.1).toFixed(2)}\n\n`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <section className="h-100 h-custom">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Carrito de compras</p>
                        <p className="mb-0">
                          Tiene {cant} productos en su carrito
                        </p>
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
                                  {(product.price * quantities[index]).toFixed(
                                    2
                                  )}
                                </MDBTypography>
                              </div>
                              <a
                                href="#!"
                                className="cart-delete"
                                onClick={() =>
                                  handleRemoveProduct(product, index)
                                }
                              >
                                <MDBIcon fas icon="trash-alt" />
                              </a>
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

                  <MDBCol lg="5">
                    <MDBCard className="tarjetach text-white rounded-3">
                      <MDBCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBTypography tag="h5" className="mb-0 ">
                            Detalles de Compra
                          </MDBTypography>
                          <MDBCardImage
                            src={logo}
                            fluid
                            className="rounded-3 "
                            alt="Avatar"
                            width="150PX"
                          />
                        </div>
                        <form className="mt-4"> </form>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2 ">Subtotal</p>
                          <p className="mb-2 ">${total.toFixed(2)}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2 ">Descuento %10</p>
                          <p className="mb-2 ">
                            {" "}
                            {"$" + (total * 0.1).toFixed(2)}
                          </p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2 ">Total(Incl. descuento)</p>
                          <p className="mb-2 ">
                            {"$" + (total - total * 0.1).toFixed(2)}
                          </p>
                        </div>

                        <div className="d-flex justify-content-between">
                          {/*   <button className="btnpago">
                              <NavLink
                                to="/payment"
                                title="pago séguro"
                                className="text-white text-decoration-none"
                              >
                                Pago Detallado
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </NavLink>
                            </button> */}

                          <button
                            type="button"
                            className="custom-buttonw"
                            onClick={sendMessage}
                          >
                            <i className="fab fa-whatsapp me-2"></i>Pagar con
                            Whatsapp
                          </button>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default ShoppingCart;
