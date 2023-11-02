import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
//import { clippingParents } from '@popperjs/core';

const TableCateory = () => {

    const CategoryUrl = "http://localhost:8080/category";
    //data de los model para las solicitudes GET 
    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminarcate, setModalEliminarcate] = useState(false);
    const [modalInsertarCategoria, setModalInsertarCategoria] = useState(false);


    //const [SelectedProductAdd, setSelectedProductAdd] = useState({});
    const [SelectedProduct, setSelectedProduct] = useState({});
    //  const [SelectedCategory, setSelectedCategory] = useState({});
    // const [SelectedInventory, setSelectedInventory] = useState({});

    // crea un nuevo objeto `Date`
    var today = new Date();
    // obtener la fecha y la hora
    var now = today.toISOString();



    //AQUÍ SE GUARDA EL OBJETO QUE CONTIENE LAS VARIABLES PARA GUARDAR UN PRODUCTO NUEVO
    const handleChangeProduct = e => {
        const { name, value } = e.target;
        setSelectedProduct({
            ...SelectedProduct,
            [name]: value
        });
        console.log(SelectedProduct);
    }

    // FUNCIONES DE LOS MODALES CATEGRIA 
    const abrirCerrarModalInsertarCategoria = () => {
        setSelectedProduct({});
        setModalInsertarCategoria(!modalInsertarCategoria);
    }

    const abrirCerrarModalEditarcate = () => {
        setModalEditar(!modalEditar);
        if (modalEditar === "false") { setSelectedProduct({}); }
    }

    const abrirCerrarModalEliminarcate= () => {
        setModalEliminarcate(!modalEliminarcate);
    }


    // CObtener todos los Category
    const peticionGetCategory = async () => {
        await axios.get(CategoryUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    // ENVIO Y REGISTRO DE UNA CATEGORIA 
    const peticionPostCategoria = async () => {
        try {

            await axios.post(CategoryUrl + "/save", {
                name: SelectedProduct.name,
                longDesc: SelectedProduct.description,
                createAt: now
            })
                .then(response => {
                    abrirCerrarModalInsertarCategoria();
                    peticionGetCategory();
                    console.log("categoria registrada correctamente.");
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.error(error);
        }
    }

    //ACTUALIZAR CATEGORIA 
    const peticionPut = async () => {
        try {
            await axios.put(CategoryUrl + "/update/" + SelectedProduct.id, {
                name: SelectedProduct.name,
                longDesc: SelectedProduct.longDesc,

            })
                .then(response => {
                    //var newdata = data;
                    abrirCerrarModalEditarcate();
                    peticionGetCategory();
                }).catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.error(error);
        }
    }

    //ELIMINAR PRODUCTOS 
    const peticionDelete = async () => {
        await axios.delete(CategoryUrl + "/delete/" + SelectedProduct.id)
            .then(response => {
                setData(data.filter(Product => Product.id !== SelectedProduct.id));
                peticionGetCategory();
                abrirCerrarModalEliminarcate();
            }).catch(error => {
                console.log(error);
            })
    }

    const seleccionarModalcate = (Product, caso) => {
        setSelectedProduct(Product);
        (caso === "Editar") ? abrirCerrarModalEditarcate() : abrirCerrarModalEliminarcate();

    }

    useEffect(() => {
        peticionGetCategory();
    }, [])


    return (
        <Container className='text-center'>
            <br />
            <button className="btn btn-info m-2" onClick={() => abrirCerrarModalInsertarCategoria()}>Agregar category</button>
            <br /><br />
            <div className="table table-responsive table-striped">


                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.longDesc}</td>
                                <td>
                                    <div className='d-flex text-center'>
                                        <button className="btn btn-primary m-1" onClick={() => seleccionarModalcate(product, "Editar")}><i className="fab fa-instagram fa-sm fa-fw "></i></button>
                                        <button className="btn btn-danger m-1" onClick={() => seleccionarModalcate(product, "Eliminar")}><i className="fa-solid fa-trash"></i></button>
                                    </div>

                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div >


            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Producto</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nombre: </label>
                        <br />
                        <input type="text" className="form-control" name="name" onChange={handleChangeProduct} value={SelectedProduct.name} />
                        <br />
                        <label>Descripción: </label>
                        <textarea type="text" className="form-control" name="longDesc" onChange={handleChangeProduct} value={SelectedProduct.longDesc} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary m-1" onClick={() => peticionPut()}>Editar</button>
                    <button className="btn btn-danger" onClick={() => abrirCerrarModalEditarcate()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminarcate}>
                <ModalBody>
                    <div>
                        ¿Estás seguro de que deseas eliminar la categoria {SelectedProduct && SelectedProduct.name}?
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => peticionDelete()}>
                        Sí
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => abrirCerrarModalEliminarcate()}>
                        No
                    </button>
                </ModalFooter>
            </Modal>

            {/*  MODALES REFERENTES A CATEGORIA ========================================================================== */}
            <Modal isOpen={modalInsertarCategoria}>
                <ModalHeader>Insertar Categoria</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nombre: </label>
                        <br />
                        <input type="text" className="form-control" name="name" onChange={handleChangeProduct} />
                        <br />
                        <label>description: </label>
                        <br />
                        <textarea type="text" className="form-control" name="description" onChange={handleChangeProduct} />

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary m-1" onClick={() => peticionPostCategoria()}>Registrar    </button>
                    <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertarCategoria()}>Cancelar</button>
                </ModalFooter>
            </Modal>


        </Container>

    );
}


export default TableCateory;