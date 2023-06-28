import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Dropdown, Button } from 'react-bootstrap';
import Catalogo from './Catalogo';
import axios from 'axios';
import Carrito from './Carrito';


function HomeCliente({ id }) {
    const [products, setProducts] = useState([]);
    const [productsToCard, setProductsToCard] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const SUBSTRING_TO_REMOVE = "auth0|";

    useEffect(() => {
        getProducts();
        getCategories();

    }, []);

    const getActualCart = async (items) => {
        try {
            const response = await axios.get(process.env.REACT_APP_IP_BACKEND_SALES + `/sales/getCart/${id.replace(SUBSTRING_TO_REMOVE, "")}`)
            if (response.data.carrito.length > 0) {
                const updatedProductsToCard = [];
                response.data.carrito.forEach(item => {
                    let product = items.find(x => x.id_product === item.id_product);
                    product.quantity = Math.round((item.total * 1.10) / item.price);
                    updatedProductsToCard.push(product);

                });

                setProductsToCard(updatedProductsToCard);
            }
        } catch (error) {
            alert(error);
        }
    }
    const getProducts = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_IP_BACKEND_PRODUCTS + `/product/getAllProduct`)
            addFavs(response.data.prod)
            getActualCart(response.data.prod);
        } catch (error) {
            alert(error);
            setProducts([])
        }
    }

    const favFilter = () => {
        alert("eject")
        const favFilteredProducts = filteredProducts.filter(
            (product) => product.fav === true
        );
        setFilteredProducts(favFilteredProducts);
    }

    const addFavs = async (products) => {
        try {
            const response = await axios.get(process.env.REACT_APP_IP_BACKEND_FAV + `/favoriteslist/getList/${id.replace(SUBSTRING_TO_REMOVE, "")}`)
            if (response.data.lista.length > 0) {
                const updatedProducts = products.map((item) => {
                    if (response.data.lista.some(x => x.id_product === item.id_product)) {
                        return {
                            ...item,
                            fav: true
                        };
                    }
                    return item;
                });
                setFilteredProducts(updatedProducts);
                setProducts(updatedProducts);
            } else {
                setFilteredProducts(products)
                setProducts(products)
            }

        }
        catch (error) {
            alert(error);
            setFilteredProducts(products)
            setProducts(products)
        }


    }

    const getCategories = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_IP_BACKEND_PRODUCTS + '/product/getcategory');
            setCategories(response.data.category);
        } catch (error) {
            alert('Error al obtener las categorías');
        }
    };



    const agregarAlCarrito = (product) => {
        const updatedProductsToCard = [...productsToCard];
        const existingProduct = updatedProductsToCard.find(
            (item) => item.id_product === product.id_product
        );

        if (existingProduct) {
            if (existingProduct.stock >= (existingProduct.quantity + 1)) {
                existingProduct.quantity++;
                try {
                    axios.put(process.env.REACT_APP_IP_BACKEND_SALES + `/sales/addProduct`, {
                        idProduct: existingProduct.id_product,
                        idUser: id.replace(SUBSTRING_TO_REMOVE, "")
                    });

                } catch (error) {
                    alert(error);
                }
            } else {
                alert("Este producto no tiene stock suficiente")
            }

        } else {
            try {
                axios.post(process.env.REACT_APP_IP_BACKEND_SALES + `/sales/postProduct`, {
                    idProduct: product.id_product,
                    idUser: id.replace(SUBSTRING_TO_REMOVE, "")
                });

            } catch (error) {
                alert(error);
            }
            product.quantity = 1;
            updatedProductsToCard.push(product);
        }

        setProductsToCard(updatedProductsToCard);
    };


    const filtrarPorCategoria = (categoryId) => {
        const filteredProducts = products.filter(
            (product) => product.id_category === categoryId
        );
        setFilteredProducts(filteredProducts);
    };

    const deleteItem = (idProduct) => {
        let newProductsToCart = productsToCard.filter(x => x.id_product !== idProduct);
        setProductsToCard(newProductsToCart);
        try {
            axios({
                method: 'DELETE',
                url: process.env.REACT_APP_IP_BACKEND_SALES + '/sales/deleteProduct',
                data: {
                    id_product: idProduct,
                    id_user: id.replace(SUBSTRING_TO_REMOVE, "")
                }
            });


        } catch (error) {
            alert(error)
        }
    }


    const postSale = async (selectedTarjeta) => {
        try {

            let productsRequest = productsToCard.map(product => {
                let productRequest = {
                    idProducto: product.id_product,
                    Cantidad: product.quantity
                }
                return productRequest;
            });

            await axios.post(process.env.REACT_APP_IP_BACKEND_SALES + `/Cliente/Comprar`, {
                id: id.replace(SUBSTRING_TO_REMOVE, ""),
                total: totalOrder,
                codTarjeta: selectedTarjeta,
                productos: productsRequest
            });
            setProductsToCard([]);
            alert("Compra realizada con exito");
        } catch (error) {
            alert(error);
        }
    }


    const agregarAFavoritos = (product) => {
        try {
            const updatedProducts = filteredProducts.map((item) => {
                if (item.id_product === product.id_product) {
                    return {
                        ...item,
                        fav: true
                    };
                }
                return item;
            });
            const updatedProductsTmp = products.map((item) => {
                if (item.id_product === product.id_product) {
                    return {
                        ...item,
                        fav: true
                    };
                }
                return item;
            });
            setProducts(updatedProductsTmp);
            setFilteredProducts(updatedProducts);
            axios.post(process.env.REACT_APP_IP_BACKEND_FAV + `/favoriteslist/postList`, {
                id_user: id.replace(SUBSTRING_TO_REMOVE, ""),
                id_product: product.id_product
            });
        } catch (error) {
            alert(error);
        }

    };



    const totalOrder = productsToCard.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <Card>
                        <Card.Header>Categorias</Card.Header>
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-categories">
                                        Seleccionar Categoría
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {categories.map((category) => (
                                            <Dropdown.Item
                                                key={category.id}
                                                onClick={() => filtrarPorCategoria(category.id)}
                                            >
                                                {category.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Button onClick={() => favFilter()}>Filtrar Favoritos</Button>
                                <Button onClick={() => setFilteredProducts(products)}>Limpiar Filtro</Button>
                            </div>

                        </Card.Body></Card>
                    <Card>
                        <Card.Header>Productos</Card.Header>
                        <Card.Body>


                            <Catalogo
                                products={filteredProducts}
                                agregarAlCarrito={agregarAlCarrito}
                                agregarAFavoritos={agregarAFavoritos}
                            />
                        </Card.Body></Card>

                </Col>
                <Col md={4}>
                    <Carrito products={productsToCard} deleteItem={deleteItem} postSale={postSale} />

                </Col>
            </Row>
        </Container>
    );
}

export default HomeCliente;
