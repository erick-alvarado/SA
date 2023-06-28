import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import CargarArchivo from '../../components/CargarArchivo';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Modal } from 'react-bootstrap';
import Tarjetas from "./Tarjetas";
import { convertBase64 } from '../../components/utils';

function Registro() {
    const { id } = useParams();
    const [showCardDialog, setShowCardDialog] = useState(false);
    const [tarjetas, setTarjetas] = useState([]);
    const [idCustomer, setIdCustomer] = useState(null);

    const [form, setForm] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        contrasena: '',
        celular: 0
    });
    const [file, setFile] = useState(null);

    const handleChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const saveForm = async () => {

        const data = new FormData()
        data.append('file', file)
        if (file) {
            await axios.post(process.env.REACT_APP_IP_BACKEND_USUARIO + `/Cliente/Registrar`, {
                nombre: form.nombres,
                apellido: form.apellidos,
                correo: form.correo,
                pass: form.contrasena,
                cel: form.celular,
                imagen: convertBase64(data.get("file"))
            })
                .then(response => {
                    alert(JSON.stringify(response.data))
                })
                .catch(error => {
                    alert(error);
                })
        }

    }


    useEffect(() => {

        const fetchClienteData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_IP_BACKEND_USUARIO + `/user/getUser/${id}`);
                const clienteData = response.data;
                setForm({
                    ...form,
                    nombres: clienteData.cliente.first_name,
                    apellidos: clienteData.cliente.last_name,
                    correo: clienteData.usuario.email,
                    celular: clienteData.cliente.phone_number
                });

                setIdCustomer(clienteData.cliente.id_customer);

            } catch (error) {
                alert(error.response.data.msg);
            }
        };

        if (id) {
            fetchClienteData();
        }

    }, [id]);

    useEffect(() => {
        if (idCustomer) {
            getCards();
        }
    }, [idCustomer])

    const updateImage = async () => {
        var url = ""
        const data = new FormData()
        data.append('file', file)
        await axios.post(process.env.REACT_APP_IP_BACKEND + "/upload", data, {
        })
            .then(res => {
                url = res.data
            })
            .catch(error => {
                alert(error);
            })
        if (url !== "") {
            await axios.put(process.env.REACT_APP_IP_BACKEND + `/registro`, {
                nombres: form.nombres,
                apellidos: form.apellidos,
                correo: form.correo,
                contrasena: form.contrasena,
                celular: form.celular,
                url: url,
                rol: 1
            })
                .then(response => {
                    alert(JSON.stringify(response.data))
                })
                .catch(error => {
                    alert(error);
                })
        }

    }

    const handleOpenCardDialog = () => {
        setShowCardDialog(true);
    };

    const handleCloseCardDialog = () => {
        getCards();
        setShowCardDialog(false);
    };

    const getCards = async () => {
        try {
            const tarjetasResponse = await axios.post(process.env.REACT_APP_IP_BACKEND_USUARIO + `/Tarjeta/Listado`, {
                idCliente: idCustomer
            });
            const tarjetasData = tarjetasResponse.data.message;

            setTarjetas(tarjetasData);
        } catch (error) {
            alert(error);
        }

    }

    const deleteCard = async (idCard) => {
        try {
            await axios.delete(process.env.REACT_APP_IP_BACKEND_USUARIO + `/user/deleteCard/${idCard}`);
            getCards();

        } catch (error) {
            alert(error);
        }
    }

    const handleCallBack = (data) => {
        setFile(data);
    }



    return (
        <Card>
            <Card.Header>Registro de cliente</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group className="mb-3" as={Col}>
                            <Form.Label sm={3}>Nombres</Form.Label>
                            <Form.Control type='text' name='nombres' placeholder="Ingrese su nombre" value={form.nombres} onChange={handleChangeForm} />
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col}>
                            <Form.Label sm={3}>Apellidos</Form.Label>
                            <Form.Control type='text' name='apellidos' placeholder="Ingrese su apellido" value={form.apellidos} onChange={handleChangeForm} />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label sm={3}>Correo</Form.Label>
                        <Form.Control type='email' name='correo' placeholder="Ingrese su correo" value={form.correo} onChange={handleChangeForm} />
                    </Form.Group>
                    {!id && (<>
                        <Form.Group className="mb-3">
                            <Form.Label sm={3}>Contrasena</Form.Label>
                            <Form.Control type='password' name='contrasena' placeholder="Ingrese su correo" value={form.contrasena} onChange={handleChangeForm} />
                        </Form.Group>
                    </>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label sm={3}>Celular</Form.Label>
                        <Form.Control type='number' name='celular' placeholder="Ingrese su celular" value={form.celular} onChange={handleChangeForm} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label sm={3}>Imagen</Form.Label>
                        <CargarArchivo parentCallback={handleCallBack} />
                    </Form.Group>
                    {id && (<>
                        <div>
                            <Button variant="primary" onClick={() => handleOpenCardDialog()}>Agregar Tarjetas</Button>

                            <Modal show={showCardDialog} onHide={handleCloseCardDialog}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Ingresar tarjeta de cliente</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Tarjetas idCustomer={idCustomer} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => handleCloseCardDialog}>Cerrar</Button>
                                </Modal.Footer>
                            </Modal>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Número</th>
                                        <th>Nombre</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tarjetas.map((tarjeta) => (
                                        <tr key={tarjeta.idTarjeta}>
                                            <td>{tarjeta.notarjeta}</td>
                                            <td>{tarjeta.nombre}</td>
                                            <td><Button variant="secondary" onClick={() => deleteCard(tarjeta.id)}>Eliminar</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                    </>

                    )}
                    <div className="text-end">
                        {id ? (
                            <Button variant="outline-dark" onClick={updateImage}>Actualizar</Button>
                        ) : (
                            <Button variant="outline-dark" onClick={saveForm}>Guardar</Button>
                        )}

                    </div>
                </Form>
            </Card.Body>
            <Card.Footer className="text-center text-muted">Si desea registrar su negocio.
                <Card.Link href="/registroNegocio">Explorar.</Card.Link>
            </Card.Footer>
        </Card >

    )
}

export default Registro;
