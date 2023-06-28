import React, { Component } from 'react';
import axios from 'axios';
import CargarArchivo from '../CargarArchivo';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

class Producto extends Component {

  constructor(props) {
    super(props);
      this.state = {
        mod: false,
        user: props.user,
        productos: [],
        categorias: [],
        form: {
            id: 0,
            nombre:'',
            descripcion: '',
            precio: 0,
            stock: 0,
            categoria:1,
            img:''
        }
      }
  }
   convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  handleCallBack = (data) =>{
    this.setState({file: data})
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
    await axios.get(localStorage.getItem("url")+`/Inventario/GetProductos`)
    .then(response => {
        const filteredProductos = response.data.prod.filter(producto => producto.IdProveedor === this.state.user);
        this.setState({ productos: filteredProductos });
    })
    .catch(error => {
        alert(error);
    })
  }
  obtenerCategorias = async () => {
    await axios.get(process.env.REACT_APP_IP_BACKEND+":"+process.env.REACT_APP_IP_PRODUCTO +`/product/getcategory`)
    .then(response => {
        this.setState({
            categorias: response.data.category
        });
    })
    .catch(error => {
        alert(error);
    })
  }
  crearProducto = async () => {
    if(this.state.mod===true){
        this.modificarProducto();
        this.setState({mod:false});
    }
    else{
        const data = new FormData();
        data.append('Imagen', await this.convertBase64(this.state.file));
        data.append('Nombre_Producto', this.state.form.nombre);
        data.append('Precio', this.state.form.precio);
        data.append('Cantidad_Producto', this.state.form.stock);
        data.append('IdCategoria', this.state.form.categoria);
        data.append('id', this.state.user);
        await axios.post(localStorage.getItem("url")+ `/Proveedor/CrearProducto`, data)
        .then(response => {
            this.load();
            alert(JSON.stringify(response.data))
        })
        .catch(error => {
            alert(error);
        })
    }
    
  }
  eliminarProducto = async (producto) =>{
    await axios.delete(process.env.REACT_APP_IP_BACKEND+":"+process.env.REACT_APP_IP_PRODUCTO + `/product/deleteProduct/${producto}`)
    .then(response => {
      this.load();
      alert(JSON.stringify(response.data))
    })
    .catch(error => {
        alert(error);
    }) 
  }
  obtenerProducto = async (producto) => {
    this.setState({mod:true});
    await axios.get(process.env.REACT_APP_IP_BACKEND+":"+process.env.REACT_APP_IP_PRODUCTO + `/product/getProduct/${producto}`)
    .then(response => {
        this.setState({
            form:{
                id: response.data.prod.id_product,
                nombre:response.data.prod.name,
                descripcion: response.data.prod.description,
                precio: response.data.prod.price,
                stock: response.data.prod.stock,
                img: response.data.prod.img
            }
        });
    })
    .catch(error => {
        alert(error);
    })
  }
  modificarProducto = async () =>{
    await axios.put(process.env.REACT_APP_IP_BACKEND+":"+process.env.REACT_APP_IP_PRODUCTO + `/product/updateProduct`,{
        id_product: this.state.form.id,
        name:this.state.form.nombre,
        description: this.state.form.descripcion,
        price: this.state.form.precio,
        stock: this.state.form.stock,
        img:this.state.form.img,
    })
    .then(response => {
      this.load()
      alert(JSON.stringify(response.data))
    })
    .catch(error => {
        alert(error);
    })
  }
  
  render = () => {
    return (
        <>
        <Card>
        <Card.Header>Registro de producto</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group className="mb-3" as={Col}>
                            <Form.Label sm={3}>Nombre</Form.Label>
                            <Form.Control type='text' name='nombre' placeholder="Ingrese nombre de producto" value={this.state.form.nombre} onChange={this.handleChangeForm} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group className="mb-3" as={Col}>
                            <Form.Label sm={3}>Precio</Form.Label>
                            <Form.Control type='number' name='precio' placeholder="Ingrese el precio" value={this.state.form.precio} onChange={this.handleChangeForm} />
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col}>
                            <Form.Label sm={3}>Stock</Form.Label>
                            <Form.Control type='number' name='stock' placeholder="Ingrese el stock" value={this.state.form.stock} onChange={this.handleChangeForm} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">

                        <Form.Group className="mb-3" as={Col}>
                            <Form.Label sm={3}>Imagen</Form.Label>
                            <CargarArchivo  parentCallback = {this.handleCallBack}/>
                        </Form.Group>
                    </Row>
                    <Row>
                    <Form.Control
                        type="text"
                        placeholder="Disabled input"
                        aria-label="Disabled input example"
                        disabled
                        readOnly
                        value={this.state.form.img}
                    />
                    </Row>
                    <div className="text-end">
                        <Button variant="outline-dark" onClick={() => this.crearProducto()} > Guardar </Button>
                    </div>
                </Form>
        </Card.Body>
    </Card>
            <Card>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Categoria</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.productos.map(p => {
                            return (
                            <tr key = {p.IdProducto}>
                                <td>{p.IdProducto}</td>
                                <td>{p.Nombre_Producto}</td>
                                <td>{p.Precio}</td>
                                <td>{p.Cantidad}</td>
                                <td>{p.Nombre_Categoria}</td>
                                <td>
                                   {/*  
                                    <Button variant="outline-secondary" onClick={() => this.obtenerProducto(p.id_product)}>Modificar</Button>{' '}
                                    <Button variant="outline-danger" onClick={() => this.eliminarProducto(p.id_product)}>Eliminar</Button>
                                    */}
                                </td>
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

export default Producto;