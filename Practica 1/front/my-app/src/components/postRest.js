import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState, useEffect } from 'react';
import axios from 'axios';

const PostRest = () => {
    const [value, setValue] = useState('');
    const [labelValue, setLabelValue] = useState('');

    const handleInputChange = (event) => {
        setLabelValue(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        getValue();
     };

    const getValue = () => {
        const postData = { expr: labelValue };
        axios
        .post('http://localhost:5000',postData)
         .then((response) => {
          setValue(response.data);
          console.log(response.data)
         })
         .catch((err) => {
            console.log(err);
         });
    };

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Ingrese una expresion</Form.Label>
        <Form.Control id="labelValue" type="text" placeholder="Enter expression" onChange={handleInputChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Resultado</Form.Label>
        <Form.Control type="text" value={value.result} readOnly/>
      </Form.Group>
    </Form>
    </>
  );
};

export default PostRest;
