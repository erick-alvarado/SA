import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
class Usuario extends Component {

  constructor(props) {
    super(props);
        this.state = {
            user: props.user,
            form: {
                nombre: '',
                correo:'',
                contrasena: '',
                direccion: ''
            }
        }
  }

  handleChangeForm = async e => {
    await this.setState({
        form: {
            ...this.state.form,
            [e.target.name]: e.target.value
        }
    });
    }
  componentDidMount = async () => {
    this.load();
  }
  load = async () => {
    this.setState({ 
        form:{
            nombre: localStorage.getItem("nombre"),
            correo: localStorage.getItem("correo"),
            direccion: '',
            contrasena:''
        }
     });
  }
  saveForm = async () => {
    await axios.post(process.env.REACT_APP_IP_BACKEND_USUARIO +`/user/getUser/${this.state.user}`,{
        user: this.state.user,
        nombre: this.state.form.nombre,
        correo:this.state.form.correo,
        contrasena: this.state.form.contrasena,
        direccion: this.state.form.direccion
    })
    .then(response => {
        alert(JSON.stringify(response.data))
    })
    .catch(error => {
        alert(error);
    })

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
                            <Form.Control type='text' name='nombre' placeholder="Ingrese su nombre" value={this.state.form.nombre} onChange={this.handleChangeForm} />
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col}>
                            <Form.Label sm={3}>Direccion</Form.Label>
                            <Form.Control type='text' name='direccion' placeholder="Ingrese su direccion" value={this.state.form.direccion} onChange={this.handleChangeForm} />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label sm={3}>Correo</Form.Label>
                        <Form.Control type='email' name='correo' placeholder="Ingrese su correo" value={this.state.form.correo} onChange={this.handleChangeForm} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label sm={3}>Contrasena</Form.Label>
                        <Form.Control type='password' name='contrasena' placeholder="Ingrese su contrasena" value={this.state.form.contrasena} onChange={this.handleChangeForm} />
                    </Form.Group>
                    <div className="text-end">
                        <Button variant="outline-dark"  > Modificar </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>

    )
  }
}

export default Usuario;