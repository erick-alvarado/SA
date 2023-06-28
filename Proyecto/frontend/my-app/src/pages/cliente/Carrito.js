import React, { useState } from 'react';
import { Button, Card, Form, Table } from 'react-bootstrap';

function Carrito({ products, deleteItem, postSale, tarjetas }) {
    const [selectedTarjeta, setSelectedTarjeta] = useState('');


    if (!products || products.length === 0) {
        return <>
            <Card>
                <Card.Header>Carrito</Card.Header>
                <Card.Body><p>No hay productos en el carrito.</p>
                </Card.Body></Card>
        </>
    }

    const total = products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );



    return (
        <Card>
            <Card.Header>Carrito</Card.Header>
            <Card.Body>
                <div>

                    <Form>
                        <Form.Group controlId="tarjetaSelect">
                            <Form.Label>Tarjetas</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedTarjeta}
                                onChange={(e) => setSelectedTarjeta(e.target.value)}
                            >
                                <option value="">Seleccionar tarjeta</option>
                                {tarjetas.map((tarjeta) => (
                                    <option key={tarjeta.idTarjeta} value={tarjeta.idTarjeta}>
                                        {tarjeta.nombre} - {tarjeta.notarjeta}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr key={item.id_product}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price * item.quantity}</td>
                                    <td><Button variant="secondary" onClick={() => deleteItem(item.id_product)}>X</Button></td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="2">Total</td>
                                <td>{total}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-between">
                        <Button onClick={() => postSale(selectedTarjeta)}>Pagar</Button>
                    </div>
                </div>
            </Card.Body></Card>

    );
}

export default Carrito;