import React, { Component } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

class Ventas extends Component {

  constructor(props) {
    var originalString = props.user
    var substringToRemove = "auth0|";
    var id = originalString.replace(substringToRemove, "");
    super(props);
      this.state = {
        user: id,
        ventas: [],
        cantidad:0,
        monto:0
      }
  }
  componentDidMount = async () => {
    this.load();
  }
  load = async () => {
    await axios.get(process.env.REACT_APP_IP_BACKEND+":"+process.env.REACT_APP_IP_VENTAS +`/sales/getTotal/${this.state.user}`)
    .then(response => {
        this.setState({ cantidad: response.data.Total.quantitySum, monto: response.data.Total.totalSum });
    })
    .catch(error => {
        alert(error);
    })
    this.obtenerVentas();
  }
  obtenerVentas = async () => {
    await axios.get(process.env.REACT_APP_IP_BACKEND+":"+process.env.REACT_APP_IP_VENTAS +`/sales/getSales/${this.state.user}`)
    .then(response => {
        this.setState({
            ventas: response.data.hystory
        });
    })
    .catch(error => {
        alert(error);
    })
  }
  
  
  render = () => {
    return (
        <>
        <Card>
        <Card.Header>Estadisticas de ventas</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group className="mb-3" as={Col}>
                            <Form.Label sm={3}>Cantidad total</Form.Label>
                            <Form.Control placeholder="Disabled input"
                        aria-label="Disabled input example"
                        disabled
                        readOnly  value={this.state.cantidad} />
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col}>
                            <Form.Label sm={3}>Monto total</Form.Label>
                            <Form.Control type="text"
                        placeholder="Disabled input"
                        aria-label="Disabled input example"
                        disabled
                        readOnly  value={this.state.monto} />
                        </Form.Group>
                    </Row>
                </Form>
        </Card.Body>
    </Card>
            <Card>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Date</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.ventas.map(v => {
                            return (
                            <tr key = {v.id_sale}>
                                <td>{v.product}</td>
                                <td>{v.date}</td>
                                <td>{v.quantity}</td>
                                <td>{v.total}</td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
    </>
    )
  }
}

export default Ventas;