import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Col } from 'react-bootstrap';


export default function NewsletterForm2() {
  const [validated, setValidated] = React.useState(false);

  //Efecto type cursor on/off
  // const [bar, setBar] = useState(1);
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setBar(bar => bar*(-1));
  //     }, 500);
  //     return () => clearInterval(interval);
  //   }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div >
      <Form className="contactNews" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row className="rowNews">
          <Form.Group  as={Col} md="8" className="rowNewsLine" controlId="validationCustomUsername">
            <Form.Label className="formLabelNews">Subscriu-te  a la nostra newsletter!</Form.Label>
            <InputGroup className="inputGroupNews">
              <Form.Control 
                className="formControlNews"
                type="text"
                placeholder= "Escriu el teu email"
                required
              />
              <animatedInput placeholder="type a name"/>
              <button 
              type="submit"
              className="formButton">Subscriu-te</button>
              {/* <Button className="buttonNews" type="submit">Inscriu-te!</Button> */}
              <Form.Control.Feedback type="invalid">
                e-mail incorrecte
              </Form.Control.Feedback>
            </InputGroup>
            
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
}