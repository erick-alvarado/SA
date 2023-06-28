import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';
import CargarArchivo from '../CargarArchivo';

function Subasta({ id }) {
    const [subasta, setSubasta] = useState({
        idUser: id.replace("auth0|", ""),
        initialValue: 0,
        description: "",
        productName: "",
        deadline: "",
        file: null
    })





    const handleSubastaChange = (e) => {
        setSubasta({
            ...subasta,
            [e.target.name]: e.target.value

        });
    }

    const handleCallBack = (data) => {
        const dataFile = new FormData()
        dataFile.append('file', data)
        setSubasta({
            ...subasta,
            file: dataFile.get("file")

        });
    }

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            setSubasta({
                idUser: id.replace("auth0|", ""),
                initialValue: 0,
                description: "",
                productName: "",
                deadline: "",
                file: null
            })
            axios.post(process.env.REACT_APP_IP_BACKEND_AUCTION + `/auctions/postAuction`, subasta, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Se creo la subasta con exito")

        } catch (error) {
            alert(error);
        }

    };



    return (
        <Card>
            <Card.Header>Registrar Subasta</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>

                    <Card>
                        <Card.Header>Datos</Card.Header>
                        <Form.Group controlId="description">
                            <Form.Label>Descripcion del producto:</Form.Label>
                            <Form.Control
                                name="description"
                                type="text"
                                value={subasta.description}
                                onChange={(e) => handleSubastaChange(e)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="productName">
                            <Form.Label>Nombre del producto:</Form.Label>
                            <Form.Control
                                name="productName"
                                type="text"
                                value={subasta.productName}
                                onChange={(e) => handleSubastaChange(e)}
                                required
                            />
                        </Form.Group>
                        <Card.Body><Form.Group controlId="deadline">
                            <Form.Label>Tiempo de la subasta:</Form.Label>
                            <Form.Control
                                name="deadline"
                                type="text"
                                value={subasta.deadline}
                                onChange={(e) => handleSubastaChange(e)}
                                required
                            />
                        </Form.Group>
                            <Form.Group controlId="initialValue">
                                <Form.Label>Valor inicial:</Form.Label>
                                <Form.Control
                                    name="initialValue"
                                    type="text"
                                    value={subasta.initialValue}
                                    onChange={(e) => handleSubastaChange(e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="file">
                                <Form.Label>Imagen</Form.Label>
                                <CargarArchivo parentCallback={handleCallBack} />
                            </Form.Group>
                            <Button type="submit">Crear subasta</Button></Card.Body>
                    </Card>



                </Form>
            </Card.Body></Card>

    );
};

export default Subasta;
