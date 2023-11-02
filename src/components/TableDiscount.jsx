import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
//import { clippingParents } from '@popperjs/core';

const TableDiscount = () => {

    const DiscountUrl = "http://localhost:8080/discount";
    //data de los model para las solicitudes GET 
    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertarDescuento, setModalInsertarDescuento] = useState(false);


    const [SelectedProductAdd, setSelectedProductAdd] = useState({});
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

    // FUNCIONES DE LOS MODALES DESCUENTO 
    const abrirCerrarModalInsertarDescuento = () => {
        setSelectedProductAdd({});
        setModalInsertarDescuento(!modalInsertarDescuento);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
        if (modalEditar === "false") { setSelectedProduct({}); }
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }


   // CObtener todos los Discount
   const peticionGetDiscount = async () => {
    await axios.get(DiscountUrl)
        .then(response => {
            setData(response.data);
        }).catch(error => {
            console.log(error);
        })
}


const peticionPostDescuento = async () => {
    try {

        await axios.post(DiscountUrl + "/save", {
            name: SelectedProduct.name,
            longDesc: SelectedProduct.description,
            discount_percent:SelectedProduct.discount,
            active: true,
            createAt: now
        })
            .then(response => {
                abrirCerrarModalInsertarDescuento();
                peticionGetDiscount();
                console.log("Descuento registrado correctamente.");
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
    } catch (error) {
        console.error(error);
    }
}

    //ACTUALIZAR DESCUENTO 
    const peticionPut = async () => {
        try {
            await axios.put(DiscountUrl + "/update/" + SelectedProduct.id, {
                name: SelectedProduct.name,
                longDesc: SelectedProduct.longDesc,
                discount_percent: SelectedProduct.discount_percent,

            })
                .then(response => {
                    var newdata = data;
                    abrirCerrarModalEditar();
                    peticionGetDiscount();
                }).catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.error(error);
        }
    }

    //ELIMINAR PRODUCTOS 
    const peticionDelete = async () => {
        await axios.delete(DiscountUrl + "/delete/" + SelectedProduct.id)
            .then(response => {
                setData(data.filter(Product => Product.id !== SelectedProduct.id));
                peticionGetDiscount();
                abrirCerrarModalEliminar();
            }).catch(error => {
                console.log(error);
            })
    }

    const seleccionarModal = (Product, caso) => {
        setSelectedProduct(Product);
        (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();

    }

    useEffect(() => {
        peticionGetDiscount();
    }, [])


    return (
        <Container className='text-center'>
            <br />
            <button className="btn btn-info m-2" onClick={() => abrirCerrarModalInsertarDescuento()}>Agregar Descuento</button>
            <br /><br />
            <div className="table table-responsive table-striped">


                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Porcentaje de descuento</th>
                            <th>Activo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.longDesc}</td>
                                <td>{product.discount_percent}</td>
                                <td>{product.active}</td>
                                <td>
                                    <div className='d-flex text-center'>
                                        <button className="btn btn-primary m-1" onClick={() => seleccionarModal(product, "Editar")}><i className="fab fa-instagram fa-sm fa-fw "></i></button>
                                        <button className="btn btn-danger m-1" onClick={() => seleccionarModal(product, "Eliminar")}><i className="fa-solid fa-trash"></i></button>
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
                        <label>Descripción: </label>
                        <input type="text"className="form-control" name="discount_percent" onChange={handleChangeProduct} value={SelectedProduct.discount_percent} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary m-1" onClick={() => peticionPut()}>Editar</button>
                    <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
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
                        onClick={() => abrirCerrarModalEliminar()}>
                        No
                    </button>
                </ModalFooter>
            </Modal>

             {/*  MODALES REFERENTES A DESCUENTO ========================================================================== */}
             <Modal isOpen={modalInsertarDescuento}>
                <ModalHeader>Insertar Descuento</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nombre: </label>
                        <br />
                        <input type="text" className="form-control" name="name" onChange={handleChangeProduct} />
                        <br />
                        <label>description: </label>
                        <br />
                        <textarea type="text" className="form-control" name="description" onChange={handleChangeProduct} />
                        <label>Descuento: </label>
                        <br />
                        <input type="text" className="form-control" name="discount" onChange={handleChangeProduct} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary m-1" onClick={() => peticionPostDescuento()}>Registrar    </button>
                    <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertarDescuento()}>Cancelar</button>
                </ModalFooter>
            </Modal>


        </Container>

    );
}


export default TableDiscount;