import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Col } from 'react-bootstrap';
import axiosInstance from "./../axios";
import './Contacte.css'

export default function NewsletterForm2() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (validated) {
      axiosInstance.post(`subscribe/?email=${email}/`, {})
      .then((res) => {
      })
      .catch(error => {
        console.log("ERROL", error.response)
      });
    }
  }, [email]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    setEmail(event.currentTarget)
  };

  return (
    <div >
      <Form className="contactNews" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row className="rowNews">
          <Form.Group as={Col} md="8" className="rowNewsLine" controlId="validationCustomUsername">
            <Form.Label className="formLabelNews">newsletter</Form.Label>
            <InputGroup className="inputGroupNews">
              <Form.Control
                className="formControlNews"
                type="text"
                placeholder="ESCRIU EL TEU EMAIL"
                required
              />
              {/* <AnimatedInput placeholder="type a name"/> */}
              <div className="breakLine"></div>
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