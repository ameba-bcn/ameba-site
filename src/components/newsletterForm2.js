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
    <div >
      <Form className="contactNews" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row className="rowNews">
          <Form.Group  as={Col} md="8" controlId="validationCustomUsername">
            <Form.Label className="formLabelNews">Newsletter</Form.Label>
            <InputGroup>
              <Form.Control className="formControlNews"
                type="text"
                placeholder="e-mail"
                required
              />
              <button type="submit">Inscriu-te!</button>
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