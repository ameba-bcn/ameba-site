// Revisar la seccion 6 del curso REACT y crear componentes controlados
import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
// import { Redirect } from 'react-router-dom';
// import Sessio from '../sessio/sessioGeneral';

export default class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            userName: "",
            userPass: "",
            logged: true,
        }
    }
    handleClick = (e) => {
        e.preventDefault(e);
        console.log(this.state);
    }
    handleChange = (e) => {
        console.log('handelChange');
        //Aqui deberiamos consultar a la BBDD si la contraseña es correcta
        if (this.state.logged) {
            this.setState({ logged: false });
        }
        else {
            this.setState({ logged: true })
        }
        console.log(this.state);
    }
    render() {
        return (
            <div>
                {this.state.logged ?
                    <Form inline onSubmit={this.handleClick}>
                        <div>
                            <Link to="/Article">Article</Link>
                            {/* <Link to="/Sessio">Algo</Link> */}
                        </div>

                        <FormControl
                            id="user"
                            name="userName"
                            type="text"
                            className=" mr-sm-2"
                            onChange={e => this.setState({ userName: e.target.value })}
                            placeholder="Usuari"
                            ref={inputElement => this.userName = inputElement} // con ref evitamos que no se conozca el contexto¿?
                            value={this.state.inputElement}
                        />
                        <FormControl
                            id="psswd"
                            name="password"
                            type="text"
                            className=" mr-sm-2"
                            onChange={e => this.setState({ userPass: e.target.value })}
                            placeholder="Contrasenya"
                            ref={inputElement => this.userPass = inputElement} // con ref evitamos que no se conozca el contexto¿?
                            value={this.state.inputElement}
                        />
                        <Button onClick={this.handleChange}>Accedeix</Button>
                    </Form> :
                    <Form inline>
                        <Form.Label>
                            Hola 
                        </Form.Label>
                       <Avatar><Link to="/Sessio">J</Link></Avatar>
                        
                        <Button onClick={this.handleChange}>Desconecta't</Button>
                    </Form>
                }
            </div>
        )
    }
}