import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';
//import { clippingParents } from '@popperjs/core';

const Crud = () => {

    const ProductUrl = "http://localhost:8080/product";
    const CategoryUrl = "http://localhost:8080/category";
    const InventoryUrl = "http://localhost:8080/inventory";
    const DiscountUrl = "http://localhost:8080/discount";
    //data de los model para las solicitudes GET 
    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataInventory, setDataInventory] = useState([]);
    const [dataDiscount, setDataDiscount] = useState([]);

    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);


    const [modalInsertarDescuento, setModalInsertarDescuento] = useState(false);
    const [modalEditardesc, setModalEditardesc] = useState(false);
    const [modalEliminardesc, setModalEliminardesc] = useState(false);

    const [SelectedCate, setSelectedCate] = useState({});
    const [SelectedDesc, setSelectedDesc] = useState({});
    const [modalInsertarCategoria, setModalInsertarCategoria] = useState(false);
    const [modalEditarcate, setModalEditarcate] = useState(false);
    const [modalEliminarcate, setModalEliminarcate] = useState(false);
    let rolUser = localStorage.getItem('rolUser');

    const abrirCerrarModalEditarcate = () => {
        setModalEditarcate(!modalEditarcate);
        if (modalEditarcate === "false") { setSelectedCate({}); }
    }
    const abrirCerrarModalEliminarcate = () => {
        setModalEliminarcate(!modalEliminarcate);
    }

    const seleccionarModalcate = (Product, caso) => {
        setSelectedCate(Product);
        (caso === "Editar") ? abrirCerrarModalEditarcate() : abrirCerrarModalEliminarcate();

    }

    const abrirCerrarModalEditarDesc = () => {
        setModalEditardesc(!modalEditardesc);
        if (modalEditardesc === "false") { SelectedDesc({}); }
    }
    const abrirCerrarModalEliminarDesc = () => {
        setModalEliminardesc(!modalEliminardesc);
    }
    const seleccionarModaldesc = (Product, caso) => {
        setSelectedDesc(Product);
        (caso === "Editar") ? abrirCerrarModalEditarDesc() : abrirCerrarModalEliminarDesc();
    }


    const [SelectedProduct, setSelectedProduct] = useState({
        productInventory: {
            quantity: 0,
        },
        productCategory: {
            id: 0,
        },
        discount: {
            id: 0,
        }
    });
    const [SelectedProductAdd, setSelectedProductAdd] = useState({});
    //  const [SelectedCategory, setSelectedCategory] = useState({});
    // const [SelectedInventory, setSelectedInventory] = useState({});

    // crea un nuevo objeto `Date`
    var today = new Date();
    // obtener la fecha y la hora
    var now = today.toISOString();
    //FUNCION PARA DAR FORMATO DE DOLAR 
    function currencyFormatter(value) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency: "USD"
        })
        return formatter.format(value)
    }

    //aquí se controla el manejo de cada tabla 
    const [selectedTable, setSelectedTable] = useState(1);

    const handleRadioChange = (e) => {
        setSelectedTable(parseInt(e.target.value, 10));
    };
    //AQUÍ SE GUARDA EL OBJETO QUE CONTIENE LAS VARIABLES DE PRODUCTOS PARA SU POSTERIOR ACTUALIZACION
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "quantity") {
            setSelectedProduct({
                ...SelectedProduct,
                productInventory: {
                    ...SelectedProduct.productInventory,
                    [name]: value
                }
            });
        } else if (name === "Category") {
            const nameid = "id";
            console.log("entro a categoria");
            setSelectedProduct({
                ...SelectedProduct,
                productCategory: {
                    ...SelectedProduct.productCategory,
                    [nameid]: value,
                },
            });
        } else if (name === "discount") {
            const nameid = "id";
            console.log("entro a descuento");
            setSelectedProduct({
                ...SelectedProduct,
                discount: {
                    ...SelectedProduct.productCategory,
                    [nameid]: value,
                },
            });
        } else {
            setSelectedProduct({
                ...SelectedProduct,
                [name]: value
            });
        }
        console.log(SelectedProduct);
    };


    //AQUÍ SE GUARDA EL OBJETO QUE CONTIENE LAS VARIABLES PARA GUARDAR UN PRODUCTO NUEVO
    const handleChangeProduct = e => {
        const { name, value } = e.target;
        setSelectedProductAdd((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(SelectedProductAdd);
    }


    // FUNCIONES DE LOS MODALES CATEGRIA 
    const abrirCerrarModalInsertarCategoria = () => {
        setSelectedProductAdd({});
        setModalInsertarCategoria(!modalInsertarCategoria);
    }
    // FUNCIONES DE LOS MODALES DESCUENTO 
    const abrirCerrarModalInsertarDescuento = () => {
        setSelectedProductAdd({});
        setModalInsertarDescuento(!modalInsertarDescuento);
    }
    // FUNCIONES DE LOS MODALES PRODUCTOS
    const abrirCerrarModalInsertar = () => {
        setSelectedProductAdd({});
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
        if (modalEditar === "false") { setSelectedProduct({}); }
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }
    // CObtener todos los prodcutos
    const peticionGetProduct = async () => {
        await axios.get(ProductUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    // CObtener todos los Inventory
    const peticionGetInventory = async () => {
        await axios.get(InventoryUrl)
            .then(response => {
                setDataInventory(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    // CObtener todos los Discount
    const peticionGetDiscount = async () => {
        await axios.get(DiscountUrl)
            .then(response => {
                setDataDiscount(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    // CObtener todos los Category
    const peticionGetCategory = async () => {
        await axios.get(CategoryUrl)
            .then(response => {
                setDataCategory(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    //AQUÍ SE GUARDA EL OBJETO QUE CONTIENE LAS VARIABLES PARA EDITAR UNA CATEGORIA
    const handleChangecate = e => {
        const { name, value } = e.target;
        setSelectedCate((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(SelectedCate);
    }
    //ELIMINAR CATEGORIA 
    const peticionDeletecate = async () => {
        await axios.delete(CategoryUrl + "/delete/" + SelectedCate.id)
            .then(response => {
                setData(data.filter(Product => Product.id !== SelectedCate.id));
                peticionGetCategory();
                abrirCerrarModalEliminarcate();
            }).catch(error => {
                console.log(error);
            })
    }
    //ACTUALIZAR CATEGORIA 
    const peticionPutcate = async () => {
        try {
            await axios.put(CategoryUrl + "/update/" + SelectedCate.id, {
                name: SelectedCate.name,
                longDesc: SelectedCate.longDesc,

            })
                .then(response => {
                    var newdata = data;
                    abrirCerrarModalEditarcate();
                    peticionGetCategory();
                }).catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.error(error);
        }
    }

    // ENVIO Y REGISTRO DE UNA CATEGORIA 
    const peticionPostCategoria = async () => {
        try {

            await axios.post(CategoryUrl + "/save", {
                name: SelectedProductAdd.name,
                longDesc: SelectedProductAdd.description,
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

    //AQUÍ SE GUARDA EL OBJETO QUE CONTIENE LAS VARIABLES PARA EDITAR UNA CATEGORIA
    const handleChangeDesc = e => {
        const { name, value } = e.target;
        setSelectedDesc((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(SelectedDesc);
    }

    // ENVIO Y REGISTRO DE UN NUEVO DESCUENTO 
    const peticionPostDescuento = async () => {
        try {

            await axios.post(DiscountUrl + "/save", {
                name: SelectedProductAdd.name,
                longDesc: SelectedProductAdd.description,
                discount_percent: SelectedProductAdd.discount,
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
    const peticionPutdesc = async () => {
        try {
            await axios.put(DiscountUrl + "/update/" + SelectedDesc.id, {
                name: SelectedDesc.name,
                longDesc: SelectedDesc.longDesc,
                discount_percent: SelectedDesc.discount_percent,

            })
                .then(response => {
                    abrirCerrarModalEditarDesc();
                    peticionGetDiscount();
                }).catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.error(error);
        }
    }

    //ELIMINAR PRODUCTOS 
    const peticionDeletedesc = async () => {
        await axios.delete(DiscountUrl + "/delete/" + SelectedDesc.id)
            .then(response => {
                setData(data.filter(Product => Product.id !== SelectedDesc.id));
                peticionGetDiscount();
                abrirCerrarModalEliminarDesc();
            }).catch(error => {
                console.log(error);
            })
    }

    // ENVIO Y REGISTRO DE UN NUEVO inventario 
    const saveInventory = async () => {
        try {
            const response = await axios.post(InventoryUrl + "/save", {
                quantity: SelectedProductAdd.Inventory,
                createAt: now
            })

            const inventoryId = response.data.id;
            return inventoryId;

        } catch (error) {
            console.error(error);
        }
    }

    // ENVIO Y REGISTRO DE UN NUEVO PRODUCTO 
    const peticionPost = async () => {
        try {
            const inventoryId = await saveInventory();
            if (!inventoryId) {
                throw new Error("No se pudo obtener el ID del registro de inventario");
            }
            await axios.post(ProductUrl + "/save", {
                name: SelectedProductAdd.name,
                description: SelectedProductAdd.description,
                img: SelectedProductAdd.img,
                dimensions: SelectedProductAdd.dimensions,
                weight: SelectedProductAdd.weight,
                price: SelectedProductAdd.price,
                createAt: now,
                longdesc: SelectedProductAdd.longdesc,
                sku: "1245687451",
                productCategory: {
                    id: SelectedProductAdd.category
                },
                discount: {
                    id: SelectedProductAdd.discount
                },
                productInventory: {
                    id: inventoryId
                }
            })
                .then(response => {
                    //setData(data.concat(response.data));
                    peticionGetProduct();
                    abrirCerrarModalInsertar();
                    peticionGetCategory();
                    peticionGetDiscount();
                }).catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.error(error);
        }
    }


    // ACTUALIZACION DEL inventario DE UN PRODUCTO
    const EditInventory = async () => {
        try {
            const response = await axios.put(InventoryUrl + "/update/" + SelectedProduct.productInventory.id, {
                quantity: SelectedProduct.productInventory.quantity,
            })

            const inventoryId = response.data.id;
            console.log("inventario actualizado correctamente con id: " + SelectedProduct.productInventory.id);
            console.log(inventoryId);
            return inventoryId;

        } catch (error) {
            console.error(error);
        }
    }
    //ACTUALIZAR PRODUCTOS 
    const peticionPut = async () => {
        try {
            const inventoryId = await EditInventory();
            if (!inventoryId) {
                throw new Error("No se pudo obtener el ID del registro de inventario");
            }
            await axios.put(ProductUrl + "/update/" + SelectedProduct.id, {
                name: SelectedProduct.name,
                description: SelectedProduct.description,
                dimensions: SelectedProduct.dimensions,
                img: SelectedProduct.img,
                weight: SelectedProduct.weight,
                price: SelectedProduct.price,
                longdesc: SelectedProduct.longdesc,
                sku: SelectedProduct.sku,
                productCategory: {
                    id: SelectedProduct.productCategory.id
                },
                discount: {
                    id: SelectedProduct.discount.id
                },
                productInventory: {
                    id: inventoryId
                }
            })
                .then(response => {
                    var newdata = data;
                    peticionGetProduct();
                    abrirCerrarModalEditar();
                }).catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.error(error);
        }
    }

    //ELIMINAR PRODUCTOS 
    const peticionDelete = async () => {
        await axios.delete(ProductUrl + "/delete/" + SelectedProduct.id)
            .then(response => {
                setData(data.filter(Product => Product.id !== SelectedProduct.id));
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
        peticionGetProduct();
        peticionGetInventory();
        peticionGetCategory();
        peticionGetDiscount();
    }, [])


    //todo lo relaciona con la paginacion de productos 
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");


    const [currentPageCat, setCurrentPageCat] = useState(1);
    const [dataPerPageCat, setDataPerPageCat] = useState(5);


    const [currentPageDesc, setCurrentPageDesc] = useState(1);
    const [dataPerPageDesc, setDataPerPageDesc] = useState(5);

    const handleChangepage = (event) => {
        setDataPerPage(event.target.value);
        setCurrentPage(1);
    };
    const handleChangepageCat = (event) => {
        setDataPerPageCat(event.target.value);
        setCurrentPageCat(1);
    };
    const handleChangepageDesc = (event) => {
        setDataPerPageDesc(event.target.value);
        setCurrentPageDesc(1);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const filteredData = data.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.price.toString().includes(searchTerm.toLowerCase());
    });

    const filteredDataCat = dataCategory.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const filteredDataDesc = dataDiscount.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;

    const indexOfLastDataCat = currentPageCat * dataPerPageCat;
    const indexOfFirstDataCat = indexOfLastDataCat - dataPerPageCat;

    const indexOfLastDataDesc = currentPageDesc * dataPerPageDesc;
    const indexOfFirstDataDesc = indexOfLastDataDesc - dataPerPageDesc;

    const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);
    const currentDataCat = filteredDataCat.slice(indexOfFirstDataCat, indexOfLastDataCat);
    const currentDataDesc = filteredDataDesc.slice(indexOfFirstDataDesc, indexOfLastDataDesc);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / dataPerPage); i++) {
        pageNumbers.push(i);
    }

    const pageNumbersCat = [];
    for (let i = 1; i <= Math.ceil(filteredDataCat.length / dataPerPageCat); i++) {
        pageNumbersCat.push(i);
    }

    const pageNumbersDesc = [];
    for (let i = 1; i <= Math.ceil(filteredDataDesc.length / dataPerPageDesc); i++) {
        pageNumbersDesc.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
        return (
            <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={currentPage === number ? "active" : ""}
            >
                {number}
            </button>
        );
    });

    const renderPageNumbersCat = pageNumbersCat.map((number) => {
        return (
            <button
                key={number}
                onClick={() => setCurrentPageCat(number)}
                className={currentPageCat === number ? "active" : ""}
            >
                {number}
            </button>
        );
    });
    const renderPageNumbersDesc = pageNumbersDesc.map((number) => {
        return (
            <button
                key={number}
                onClick={() => setCurrentPageDesc(number)}
                className={currentPageDesc === number ? "active" : ""}
            >
                {number}
            </button>
        );
    });

    return (
        <>
            {rolUser === '"ADMIN"' ? (
                <Container className='text-center cont' >
                    <br />
                    <button className="btn btn-succes m-2" onClick={() => abrirCerrarModalInsertar()}>Agregar producto</button>
                    <button className="btn btn-info m-2" onClick={() => abrirCerrarModalInsertarCategoria()}>Agregar categoría</button>
                    <button className="btn btn-warning  m-2" onClick={() => abrirCerrarModalInsertarDescuento()}>Agregar descuento</button>
                    <br /><br />
                    <div className='d-flex justify-content-center'>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <label className={`nav-link ${selectedTable === 1 ? 'active' : ''}`} htmlFor="productos">
                                    Productos
                                    <input type="radio" name="table" id="productos" className="visually-hidden" value="1"
                                        onChange={handleRadioChange} checked={selectedTable === 1} />
                                </label>
                            </li>
                            <li className="nav-item">
                                <label className={`nav-link ${selectedTable === 2 ? 'active' : ''}`} htmlFor="descuentos">
                                Descuentos
                                    <input type="radio" name="table" id="descuentos" className="visually-hidden" value="2"
                                        onChange={handleRadioChange} checked={selectedTable === 2} />
                                </label>
                            </li>
                            <li className="nav-item">
                                <label className={`nav-link ${selectedTable === 3 ? 'active' : ''}`} htmlFor="categorias">
                                Categorías
                                    <input type="radio" name="table" id="categorias" className="visually-hidden" value="3"
                                        onChange={handleRadioChange} checked={selectedTable === 3} />
                                </label>
                            </li>
                        </ul>

                    </div>
                    {selectedTable === 1 && (
                        <div className='p-2'>
                            {/* <h2> Tabla de productos</h2> */}
                            <div className="data-table-header justify-content-between p-2">
                                
                                <select value={dataPerPage} onChange={handleChangepage}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <table className="table table-responsive table-striped tablebg mt-3">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Categoría</th>
                                        <th>Inventario</th>
                                        <th>Precio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map(product => (
                                        <tr key={product.id}>
                                            <td> <img src={product.img} alt="Publication" width="50" height="50" /></td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.productCategory.name}</td>
                                            <td>{product.productInventory.quantity}</td>
                                            <td>{currencyFormatter(product.price)}</td>
                                            <td>
                                                <div className='d-flex text-center'>
                                                    <button className="btn btn-primary m-1" onClick={() => seleccionarModal(product, "Editar")}>
                                                        <PencilSquare size={15} />
                                                    </button>
                                                    <button className="btn btn-danger m-1" onClick={() => seleccionarModal(product, "Eliminar")}>
                                                        <Trash3 size={15} />
                                                    </button>
                                                </div>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            <div className='pagination'>{renderPageNumbers}</div>
                        </div>
                    )}
                    {selectedTable === 3 && (
                        <div className='p-2'>
                            {/* <h2> Tabla de categorias</h2> */}
                            <div className="data-table-header justify-content-between p-2">                               
                                <select value={dataPerPageCat} onChange={handleChangepageCat}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <table className="table table-responsive table-striped tablebg mt-3">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentDataCat.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.longDesc}</td>
                                            <td>
                                                <div className='d-flex text-center'>
                                                    <button className="btn btn-primary m-1" onClick={() => seleccionarModalcate(product, "Editar")}>
                                                        <PencilSquare size={15} />
                                                    </button>
                                                    <button className="btn btn-danger m-1" onClick={() => seleccionarModalcate(product, "Eliminar")}>
                                                        <Trash3 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <div className="pagination">{renderPageNumbersCat}</div>
                        </div>
                    )}
                    {selectedTable === 2 && (
                        <div className='p-2'>
                            {/* <h2> Tabla de descuento</h2> */}
                            <div className="data-table-header justify-content-between p-2">                               
                                <select value={dataPerPageDesc} onChange={handleChangepageDesc}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <table className="table table-responsive table-striped tablebg mt-3">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Descuento</th>
                                        <th>Acciones</th>
                                        {/* <th>Activo</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentDataDesc.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.longDesc}</td>
                                            <td>{product.discount_percent}</td>
                                            {/* <td>{product.active}</td> */}
                                            <td>
                                                <div className='d-flex text-center'>
                                                    <button className="btn btn-primary m-1" onClick={() => seleccionarModaldesc(product, "Editar")}>
                                                        <PencilSquare size={15} />
                                                    </button>
                                                    <button className="btn btn-danger m-1" onClick={() => seleccionarModaldesc(product, "Eliminar")}>
                                                        <Trash3 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <div className="pagination">{renderPageNumbersDesc}</div>
                        </div>
                    )}

                    {/*  MODALES REFERENTES A PRODUCTOS ========================================================================== */}
                    <Modal isOpen={modalInsertar}>
                        <ModalHeader>Insertar Producto</ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <label>Nombre: </label>
                                <br />
                                <input type="text" className="form-control" name="name" onChange={handleChangeProduct} />
                                <br />
                                <label>Descripción: </label>
                                <br />
                                <textarea type="text" className="form-control" name="description" onChange={handleChangeProduct} />
                                <br />
                                <label>Descripción larga: </label>
                                <br />
                                <textarea type="text" className="form-control" name="longdesc" onChange={handleChangeProduct} />
                                <br />
                                <label>Precio: </label>
                                <br />
                                <input type="text" className="form-control" name="price" onChange={handleChangeProduct} />
                                <br />
                                <label>Categoría: </label>
                                <br />
                                <select name="category" id="selCategory" onClick={handleChangeProduct} >
                                    <option>Seleccione una categoría: </option>
                                    {
                                        dataCategory.map((category) => (
                                            <option key={category.id} value={category.id}> {category.name}</option>
                                        ))
                                    }
                                </select>
                                <br /><br />
                                <label>Ofertas y descuentos: </label>
                                <br />
                                <select name="discount" id="selDiscount" onClick={handleChangeProduct} >
                                    <option>Seleccione un descuento: </option>
                                    {
                                        dataDiscount.map((discount) => (
                                            <option key={discount.id} value={discount.id}> {discount.name}</option>
                                        ))
                                    }
                                </select>
                                <br /><br />
                                <label>Stock: </label>
                                <br />
                                <input type="text" className="form-control" name="Inventory" onChange={handleChangeProduct} />
                                <label>Dimensiones: </label>
                                <br />
                                <input type="text" className="form-control" name="dimensions" onChange={handleChangeProduct} />
                                <label>Peso: </label>
                                <br />
                                <input type="text" className="form-control" name="weight" onChange={handleChangeProduct} />
                                <label>Ruta de Imagen: </label>
                                <br />
                                <input type="text" className="form-control" name="img" onChange={handleChangeProduct} />

                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-primary m-1" onClick={() => peticionPost()}>Registrar</button>
                            <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={modalEditar}>
                        <ModalHeader>Editar Producto</ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <label>Nombre: </label>
                                <br />
                                <input type="text" className="form-control" name="name" onChange={handleChange} value={SelectedProduct.name} />
                                <br />
                                <label>Descripción: </label>
                                <br />
                                <textarea type="text" className="form-control" name="description" onChange={handleChange} value={SelectedProduct.description} />
                                <br />
                                <label>Descripción larga: </label>
                                <br />
                                <textarea type="text" className="form-control" name="longdesc" onChange={handleChange} value={SelectedProduct.longdesc} />
                                <br />
                                <label>Precio: </label>
                                <br />
                                <input type="text" className="form-control" name="price" onChange={handleChange} value={SelectedProduct.price} />
                                <br />
                                <label>Stock: </label>
                                <br />
                                <input type="text" className="form-control" name="quantity" onChange={handleChange} value={SelectedProduct.productInventory.quantity} />
                                <br />
                                <label>Categoría: </label>
                                <br />
                                <select name="Category" id="selCategory" onChange={handleChange} value={SelectedProduct.productCategory.id}>
                                    <option value={-1}>Seleccione una opción: </option>
                                    {
                                        dataCategory.map((category) => (
                                            <option key={category.id} value={category.id}> {category.name} </option>
                                        ))
                                    }
                                </select>
                                <br /><br />
                                <label>Ofertas y descuentos: </label>
                                <br />
                                <select name="discount" id="selDiscount" onChange={handleChange} value={SelectedProduct.discount.id} >
                                    {/*  */}
                                    <option>Seleccione un descuento: </option>
                                    {
                                        dataDiscount.map((discount) => (
                                            <option key={discount.id} value={discount.id}> {discount.name}</option>
                                        ))
                                    }
                                </select>
                                <br /><br />
                                <label>Dimensiones: </label>
                                <br />
                                <input type="text" className="form-control" name="dimensions" onChange={handleChange} value={SelectedProduct && SelectedProduct.dimensions} />
                                <label>Peso: </label>
                                <br />
                                <input type="text" className="form-control" name="weight" onChange={handleChange} value={SelectedProduct && SelectedProduct.weight} />
                                <label>Ruta de Imagen: </label>
                                <br />
                                <input type="text" className="form-control" name="img" onChange={handleChange} value={SelectedProduct && SelectedProduct.img} />

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
                                ¿Estás seguro de que deseas eliminar el producto {SelectedProduct && SelectedProduct.name}?
                            </div>

                            <div className='text-center'>
                                <img src={SelectedProduct.img} alt="Publication" width="250" height="250" />
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

                    <Modal isOpen={modalEliminarcate}>
                        <ModalBody>
                            <div>
                                ¿Estás seguro de que deseas eliminar la categoria {SelectedProduct && SelectedProduct.name}?
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-danger" onClick={() => peticionDeletecate()}>
                                Sí
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => abrirCerrarModalEliminarcate()}>
                                No
                            </button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={modalEditarcate}>
                        <ModalHeader>Editar Categoria</ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <label>Nombre: </label>
                                <br />
                                <input type="text" className="form-control" name="name" onChange={handleChangecate} value={SelectedCate.name} />
                                <br />
                                <label>Descripción: </label>
                                <textarea type="text" className="form-control" name="longDesc" onChange={handleChangecate} value={SelectedCate.longDesc} />
                                <br />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-primary m-1" onClick={() => peticionPutcate()}>Editar</button>
                            <button className="btn btn-danger" onClick={() => abrirCerrarModalEditarcate()}>Cancelar</button>
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

                    <Modal isOpen={modalEditardesc}>
                        <ModalHeader>Editar Producto</ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <label>Nombre: </label>
                                <br />
                                <input type="text" className="form-control" name="name" onChange={handleChangeDesc} value={SelectedDesc.name} />
                                <br />
                                <label>Descripción: </label>
                                <textarea type="text" className="form-control" name="longDesc" onChange={handleChangeDesc} value={SelectedDesc.longDesc} />
                                <br />
                                <label>Descripción: </label>
                                <input type="text" className="form-control" name="discount_percent" onChange={handleChangeDesc} value={SelectedDesc.discount_percent} />
                                <br />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-primary m-1" onClick={() => peticionPutdesc()}>Editar</button>
                            <button className="btn btn-danger" onClick={() => abrirCerrarModalEditarDesc()}>Cancelar</button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={modalEliminardesc}>
                        <ModalBody>
                            <div>
                                ¿Estás seguro de que deseas eliminar la categoria {SelectedDesc && SelectedDesc.name}?
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-danger" onClick={() => peticionDeletedesc()}>
                                Sí
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => abrirCerrarModalEliminarDesc()}>
                                No
                            </button>
                        </ModalFooter>
                    </Modal>
                </Container>
            ) : null}
        </>
    );
}


export default Crud;