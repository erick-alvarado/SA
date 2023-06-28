import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import axios from 'axios';
import { FormGroup } from 'react-bootstrap';
class RegistroNegocio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                correo: '',
                pass:'',
                tipo: 1
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
    handleChangeFormInt = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: parseInt(e.target.value)
            }
        });
    }
    saveForm = async () => {
        alert(JSON.stringify(this.state.form))
        await axios.post(localStorage.getItem("url")  + `/Login`,{
            correo: this.state.form.correo,
            pass:this.state.form.pass,
            tipo: this.state.form.tipo
        })
        .then(response => {
            localStorage.setItem("nickname", response.tipo)
            localStorage.setItem("id", response.message.id)
            localStorage.setItem("nombre", response.message.Nombre)
            localStorage.setItem("correo", response.message.Correo)
            localStorage.setItem("imagen", response.message.Imagen)
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
                <Card.Header>Login</Card.Header>
      <Card.Body>
            <Form>
                <Row className="mb-3">
                <Form.Group className="mb-3" as={Row}>
                    <Form.Label sm={3}>Correo</Form.Label>
                    <Form.Control type='text' name='correo'  placeholder="Ingrese su correo" value={this.state.form.correo} onChange={this.handleChangeForm} />
                </Form.Group>
                <Form.Group className="mb-3" as={Row}>
                    <Form.Label sm={3}>Contrasena</Form.Label>
                    <Form.Control type='password' name='pass'  placeholder="Ingrese su contrasena" value={this.state.form.pass} onChange={this.handleChangeForm} />
                </Form.Group>
                <FormGroup>
                <Form.Label sm={3}>Tipo</Form.Label>
                <Form.Select aria-label="Default select example" name='tipo' onChange={this.handleChangeFormInt}>
                    <option value="1">Cliente</option>
                    <option value="2">Proveedor</option>
                </Form.Select>
                </FormGroup>
                </Row>
                
                <div className="text-end">
                    <Button variant="outline-dark" onClick={this.saveForm} > Ingresar </Button>
                </div>
            </Form>
            </Card.Body>
    </Card>

        )
    }
}
export default RegistroNegocio;