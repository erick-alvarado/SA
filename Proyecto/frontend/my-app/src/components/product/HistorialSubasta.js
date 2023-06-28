import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import "../../pages/cliente/style/Catalogo.css"

function HistorialSubastas({ id }) {
    const [subastas, setSubastas] = useState([]);

    useEffect(() => {
        obtenerHistorialSubastas();
    }, []);

    const obtenerHistorialSubastas = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_IP_BACKEND_AUCTION + `/auctions/getBidHistory/${id.replace("auth0|", "")}`);
            const data = response.data;

            if (data.status) {
                setSubastas(data.detalleSubastas);
            } else {
                alert(data.msg);
            }
        } catch (error) {
            alert(error);
        }
    };


    const endAuction = async (id_auction) => {
        try {
            const response = await axios.post(process.env.REACT_APP_IP_BACKEND_AUCTION + `/auctions/endAuction`, {
                idAuction: id_auction
            });

            if (response.data) {
                alert("Subasta finalizada con exito")
            }
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div>
            {subastas.map((subasta) => (
                <Card key={subasta.auction.id_auction}>
                    <Card.Header>{subasta.auction.product_name}</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={4}>
                                <img className='catalogo-img' src={subasta.auction.image} alt="Imagen del producto" />
                                <p>{subasta.auction.description}</p>
                                {subasta.auction.status === 1 ? (
                                    <p>Estado: Activa</p>
                                ) : (
                                    <p>Estado: Inactiva</p>
                                )}
                                <Button variant="outline-danger" onClick={() => endAuction(subasta.auction.id_auction)} > Finalizar </Button>
                            </Col>
                            <Col md={8}>
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Puja</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subasta.history.map((puja, index) => (
                                            <tr key={index}>
                                                <td>{puja.email}</td>
                                                <td>{puja.bid}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default HistorialSubastas;
