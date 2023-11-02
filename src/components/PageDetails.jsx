import { useEffect, useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import {
  getFirestore,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import appFirebase from "../data/configFirebase";

const PageDetails = ({ props, onAddToCart }) => {
  const id = parseInt(useParams("id:").id.substring(3));
  const [data, setData] = useState([]);

  const db = getFirestore(appFirebase); // Reemplaza appFirebase con tu instancia de Firebase

  const getProductData = async (id) => {
    try {
      const productsCollection = collection(db, "productos"); // Reemplaza "productos" con el nombre de tu colección
      // Crea una consulta que filtre los documentos por el campo "nombre"
      const q = query(productsCollection, where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const productData = querySnapshot.docs[0].data();
        console.log("Datos del producto:", productData);
        setData(productData);
        // Aquí puedes hacer lo que necesites con los datos del producto
      } else {
        console.log("El producto no existe.");
      }
    } catch (error) {
      console.error("Error al obtener datos del producto: ", error);
    }
  };

  useEffect(() => {
    // console.log("desde efect " + id);
    getProductData(id); // Pasa el id como argumento
  }, [id]); // Añade id como dependencia para que se ejecute cuando cambie

  const ProductUrlP = "http://localhost:8080/product";
  const [dataP, setDataP] = useState([]);
  // CObtener todos los prodcutos
  const peticionGetProductP = async () => {
    await axios
      .get(ProductUrlP)
      .then((response) => {
        setDataP(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function currencyFormatter(value) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      minimumFractionDigits: 2,
      currency: "USD",
    });
    return formatter.format(value);
  }

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
  // Filtrar productos por categoría y eliminar duplicados
  const filteredProducts = dataP
    ? shuffle(
        dataP.filter(
          (product) =>
            product.productCategory.id === data.productCategory.id &&
            product.id !== data.id
        )
      ).slice(0, 4)
    : dataP;

  useEffect(() => {
    peticionGetProductP();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      {data && (
        <Container className="mw-100">
          <Row className="ProductDetails justify-content-md-center border-bottom border-left border-right">
            <Col
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
              className="DetailsImg "
              rounded
            >
              {/* <Image src={data.img} alt="Publication" fluid className="DetailsImg" rounded /> */}
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: data.img,
                  },
                  largeImage: {
                    src: data.img,
                    width: 1200,
                    height: 1800,
                  },
                }}
              />
            </Col>
            <Col xs={12} sm={12} md={7} lg={7} xl={7} className="">
              <Container className="justify-content-center mx-auto">
                <Row>
                  <Col className="DetailsTitle  pt-4">
                    <h1>{data.name}</h1>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col>
                    <h4>Rating general</h4>
                    <h4>
                      <b className="text-danger">
                        &#9733; {data.dimensions}/10
                      </b>
                    </h4>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col>
                    <h4>Descripción:</h4>
                    <b>{data.longdesc}</b>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col className="text-auto">
                    <h6>Precio: {currencyFormatter(data.price)}</h6>
                    <h6>Peso: {data.weight}</h6>
                    <h6>Código: {data.sku}</h6>
                    <div className="">
                      <a href={data.img} target="_blank" rel="noreferrer">
                        <Button type="button " id="watch" className="bg-dark ">
                          &#x25BA; Watch
                        </Button>
                      </a>
                      <Button
                        className="bg-danger mt-2 m-md-2"
                        onClick={() => onAddToCart(data)}
                      >
                        Agregar al carrito
                      </Button>
                    </div>
                  </Col>
                  <div className="backBtnContainer mt-2">
                    <NavLink to="/shop">
                      {" "}
                      <Button className="backButton">Regresar</Button>
                    </NavLink>
                  </div>
                </Row>
              </Container>
            </Col>
          </Row>
          {filteredProducts.length !== 0 ? (
            <Container className="mt-5">
              <Row className="d-flex flex-column align-items-center mb-4 ">
                <Col xs={12} sm={8} className="mx-auto">
                  <h2 className="text-center text-black">
                    PRODUCTOS RELACIONADOS
                  </h2>
                </Col>
                <Col xs={12} sm={8} md={8} className="mx-auto">
                  <h3 className="text-center text-black">
                    PROMOCIONES LIMITADAS ¡APROVÉCHALAS AHORA!
                  </h3>
                </Col>
              </Row>
              <Row className="">
                {filteredProducts.map((result) => {
                  return (
                    <Col
                      className="floating col-sm-6 col-lg-3 "
                      key={result.id}
                    >
                      <div className="single-publication border rounded">
                        <figure>
                          <a href="#?" className="product-image">
                            <Image src={result.img} alt="Publication" />
                          </a>
                          <ul>
                            <li>
                              <a
                                href="#?"
                                title="Añadir a Favoritos"
                                className="bg"
                              >
                                <i className="fa fa-heart" />
                              </a>
                            </li>
                            <li>
                              <NavLink
                                to={`/details/id:${result.id}`}
                                title="Vistazo Rápido"
                                className="bg"
                              >
                                <i className="fa fa-search" />
                              </NavLink>
                            </li>
                          </ul>
                        </figure>
                        <div className="publication-content m-0 p-0">
                          <span className="category">Productos</span>
                          <h3>
                            <a href="#?" className="text-decoration-none">
                              {result.name}
                            </a>
                          </h3>

                          <h4 className="price">${result.price}</h4>
                        </div>
                        <div className="add-to-cart">
                          <button
                            className="default-btn"
                            onClick={() => onAddToCart(result)}
                          >
                            Añadir al Carro
                          </button>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          ) : (
            <div className=""></div>
          )}
        </Container>
      )}
    </>
  );
};

export default PageDetails;
