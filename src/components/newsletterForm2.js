import React from 'react';
import { Form, Button, InputGroup, Col } from 'react-bootstrap';


export default function NewsletterForm2() {
    const [validated, setValidated] = React.useState(false);
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
  
    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Newsletter</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="e-mail"
                required
              />
              <Form.Control.Feedback type="invalid">
                e-mail incorrecte
              </Form.Control.Feedback>
              <Button type="submit">Submit form</Button>
            </InputGroup>
          </Form.Group>
        </Form.Row>
      </Form>
    );
  }