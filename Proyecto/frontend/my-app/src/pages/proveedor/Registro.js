import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import axios from 'axios';
class RegistroNegocio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                correo: '',
                pass:'',
                Nombre_Empresa: '',
                Direccion: ''
            }
        }
        this.handleChangeForm = this.handleChangeForm.bind(this)
    }

    handleChangeForm = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }
    saveForm = async () => {
        alert(JSON.stringify(this.state.form))
        await axios.post(localStorage.getItem("url") + `/Proveedor/Registrar`,{
            brand: this.state.form.nombre,
            email:this.state.form.correo,
            password: this.state.form.contrasena,
            address: this.state.form.direccion,
            rol:2
        })
        .then(response => {
            alert(JSON.stringify(response.data))
        })
        .catch(error => {
            alert(error);
        })

    }
    handleCallBack = (data) =>{
        this.setState({file: data})
    }

    render = () => {
        return (
            <Card>
                <Card.Header>Registro de negocio</Card.Header>
      <Card.Body>
            <Form>
                <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                    <Form.Label sm={3}>Nombre</Form.Label>
                    <Form.Control type='text' name='Nombre_Empresa'  placeholder="Ingrese su nombre" value={this.state.form.Nombre_Empresa} onChange={this.handleChangeForm} />
                </Form.Group>
                <Form.Group className="mb-3" as={Col}>
                    <Form.Label sm={3}>Direccion</Form.Label>
                    <Form.Control type='text' name='Direccion'  placeholder="Ingrese su direccion" value={this.state.form.Direccion} onChange={this.handleChangeForm} />
                </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label sm={3}>Correo</Form.Label>
                        <Form.Control type='email' name='correo'  placeholder="Ingrese su correo" value={this.state.form.correo} onChange={this.handleChangeForm} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label sm={3}>Contrasena</Form.Label>
                    <Form.Control type='password' name='pass'  placeholder="Ingrese su contrasena" value={this.state.form.pass} onChange={this.handleChangeForm} />
                </Form.Group>
                <div className="text-end">
                    <Button variant="outline-dark" onClick={this.saveForm} > Guardar </Button>
                </div>
            </Form>
            </Card.Body>
    </Card>

        )
    }
}
export default RegistroNegocio;