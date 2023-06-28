import React from 'react';
import Form from 'react-bootstrap/Form';

class CargarArchivo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file:null
        }
    }
    onChangeHandler=e=>{
        this.props.parentCallback(e.target.files[0])
        //this.setState({file: e.target.files[0],loaded:0})
    }
    render = () => {
        return (
            <Form.Control type="file"  onChange={(e) => this.onChangeHandler(e)} />
        )
    }
}
export default CargarArchivo;

