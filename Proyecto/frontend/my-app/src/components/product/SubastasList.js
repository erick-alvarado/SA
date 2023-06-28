import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import "../../pages/cliente/style/Catalogo.css"

function SubastasList({ id }) {
    const [subastas, setSubastas] = useState([]);

    useEffect(() => {
        try {

            updateAuctions();

        } catch (error) {
            alert(error.response.data.msg);
        }

    }, []);

    const handleBid = (subasta, bidValue) => {
        if (subasta.actual_value < bidValue) {
            axios.put(process.env.REACT_APP_IP_BACKEND_AUCTION + `/auctions/bidUp`, {
                idAuction: subasta.id_auction,
                idUser: id.replace("auth0|", ""),
                value: bidValue

            });
            alert("Se realizo registro la puja con exito");
            updateAuctions();
        } else {
            alert("El valor de la puja debe ser mayor al precio actual de la subasta")
        }



    };

    const updateAuctions = () => { 
        axios
            .get(`${process.env.REACT_APP_IP_BACKEND_AUCTION}/auctions/getAuctions`)
            .then((response) => {
                const auctions = response.data.subastas;
                const filteredAuctions = auctions.filter((subasta) => subasta.status === 1);
                setSubastas(filteredAuctions);
            })
            .catch((error) => alert(error));
    };



    return (
        <Container>
            <h1>Lista de Subastas</h1>
            <ListGroup>
                <Row>
                    {subastas.map((subasta) => (
                        <Col md={4} key={subasta.id_auction}>
                            <ListGroup.Item>
                                <img className='catalogo-img' src={subasta.image} alt="Imagen del producto" />
                                <p>Nombre: {subasta.product_name}</p>
                                <p>Descripcion: {subasta.description}</p>
                                <p>Tiempo restante: {subasta.deadline}</p>
                                <p>Valor actual: {subasta.actual_value}</p>
                                <Form>
                                    <Form.Group controlId={`bidInput_${subasta.id_auction}`}>
                                        <Form.Label>Precio de la puja:</Form.Label>
                                        <Form.Control type="number" min={subasta.actual_value + 1} />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        onClick={() =>
                                            handleBid(
                                                subasta,
                                                parseFloat(document.getElementById(`bidInput_${subasta.id_auction}`).value)
                                            )
                                        }
                                    >
                                        Realizar puja
                                    </Button>
                                </Form>
                            </ListGroup.Item>
                        </Col>
                    ))}
                </Row>
            </ListGroup>
        </Container>
    );
}

export default SubastasList;
