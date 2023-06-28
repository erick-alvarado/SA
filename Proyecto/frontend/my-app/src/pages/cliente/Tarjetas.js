import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Tarjetas = ({ idCustomer }) => {
    const [cardDetails, setCardDetails] = useState({
        notarjeta: '',
        nombre: '',
        expiration: '',
        ccv: '',
        id: +idCustomer
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(process.env.REACT_APP_IP_BACKEND_USUARIO + `/Tarjeta/Crear`, cardDetails, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            alert("Se creo la tarjeta con exito");
        } catch (error) {
            alert(error);
        }
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="notarjeta">
                <Form.Label>Número de tarjeta</Form.Label>
                <Form.Control
                    type="text"
                    name="notarjeta"
                    value={cardDetails.notarjeta}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre"
                    value={cardDetails.nombre}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="expiration">
                <Form.Label>Fecha de expiración</Form.Label>
                <Form.Control
                    type="date"
                    name="expiration"
                    value={cardDetails.expiration}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="ccv">
                <Form.Label>CCV</Form.Label>
                <Form.Control
                    type="text"
                    name="ccv"
                    value={cardDetails.ccv}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Enviar
            </Button>
        </Form>
    );
};



export default Tarjetas;