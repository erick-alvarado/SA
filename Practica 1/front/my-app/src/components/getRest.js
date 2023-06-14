import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect } from 'react';
import axios from 'axios';

const GetRest = () => {
    const [joke, setJoke] = useState("");

   useEffect(() => {
      axios
         .get('http://localhost:5000')
         .then((response) => {
          setJoke(response.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);
  return (
    
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Joke of the day</Accordion.Header>
        <Accordion.Body>
          {joke.setup}
          <br></br>
          {joke.punchline}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default GetRest;
