import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

export default class NewsletterForm extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            sent: true,
        }
    }
    handleClick = (e) => {
        e.preventDefault(e);
        console.log(this.state);
    }
    handleChange = (e) => {
        console.log('handelChange');
        //Aqui deberiamos consultar a la BBDD si la contraseña es correcta
        if (this.state.sent) {
            this.setState({ sent: false });
        }
        else {
            this.setState({ sent: true })
        }
        console.log(this.state);
    }
    render() {
        return (
            <div>
                {this.state.sent ?
                    <Form inline onSubmit={this.handleClick}>
                        <FormControl
                            id="email"
                            name="email"
                            type="text"
                            className="mr-sm-2"
                            onChange={e => this.setState({ email: e.target.value })}
                            placeholder="e-mail"
                            ref={inputElement => this.userName = inputElement} // con ref evitamos que no se conozca el contexto¿?
                            value={this.state.inputElement}
                        />

                        <Button onClick={this.handleChange}>Subscriu-te!</Button>
                    </Form> :
                    <Form inline>
                        <Form.Label>
                            Gràcies! En breu rebràs informació!
                        </Form.Label>
                    </Form>
                }
            </div>
        )
    }
}