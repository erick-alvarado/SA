import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';

const GetSoa = () => {
    const [value, setValue] = useState('');
    const [labelValue, setLabelValue] = useState('');

    const handleInputChange = (event) => {
        setLabelValue(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        getValue();
     };

    const getValue = async () => {
      const options = {
        method: 'POST',
        url: 'https://number-conversion-service.p.rapidapi.com/webservicesserver/NumberConversion.wso',
        headers: {
          'content-type': 'application/xml',
          'X-RapidAPI-Key': '5e3d9186ffmshf5ba504e4104ac8p1de014jsne95f3249dcf0',
          'X-RapidAPI-Host': 'number-conversion-service.p.rapidapi.com'
        },
        data: `<?xml version=\'1.0\' encoding=\'utf-8\'?>
      <soap:Envelope xmlns:soap=\'http://schemas.xmlsoap.org/soap/envelope/\'>
        <soap:Body>
          <NumberToWords xmlns=\'http://www.dataaccess.com/webservicesserver/\'>
            <ubiNum>4815</ubiNum>
          </NumberToWords>
        </soap:Body>
      </soap:Envelope>`
      };

      try {
        const response = await axios.request(options);
        const xmlResponse = response.data;
        console.log(response.data);
        parseString(xmlResponse, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }

          const numberToWordsResult =
            result['soap:Envelope']['soap:Body'][0]['m:NumberToWordsResponse'][0]['m:NumberToWordsResult'][0];
          setValue(numberToWordsResult)
          console.log(numberToWordsResult); // Valor de NumberToWordsResult
        });
      } catch (error) {
        console.error(error);
      }
      
    };

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Resultado</Form.Label>
        <Form.Control type="text" value={value} readOnly/>
      </Form.Group>
    </Form>
    </>
  );
};

export default GetSoa;
