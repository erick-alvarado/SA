import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './style/Catalogo.css';
import { HeartFill } from 'react-bootstrap-icons';

function Catalogo({ products, agregarAlCarrito, agregarAFavoritos }) {
    if (!products || products.length === 0) {
        return <p>No hay productos disponibles.</p>;
    }

    return (
        <Container>
            <Row>
                {products.map((product) => (
                    <Col key={product.id_product} sm={6} md={4} lg={3}>
                        <Card>
                            <Card.Img variant="top" src={product.img} className="catalogo-img" />
                            <Card.Body className="d-flex flex-column position-relative">
                                <div className="d-flex justify-content-end mb-2">
                                    <Button
                                        variant="link"
                                        onClick={() => agregarAFavoritos(product)}
                                        className={product.fav ? 'heart-icon filled' : 'heart-icon'}
                                    >
                                        <HeartFill size={20} />
                                    </Button>
                                </div>
                                <div style={{marginTop: "10%"}}>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text className="catalogo-description">{product.description}</Card.Text>
                                    <Card.Text>Price: ${product.price}</Card.Text>
                                    <Card.Text>Stock: {product.stock}</Card.Text>
                                    <Button onClick={() => agregarAlCarrito(product)}>Agregar al carrito</Button>
                                </div>
                            </Card.Body>

                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Catalogo;
