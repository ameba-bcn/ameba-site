import React, { Component } from 'react';
import TextInput from './TextInput';
import Validate from './Validate';
import TextArea from './TextArea';

class Article extends Component {


  // "id": 1,
  // "title": "AMEBA PARKFEST 2019",
  // "article": "El 29 de juny torna l’Ameba Parkfest en la seva cinquena edició al Parc de l’Espanya Industrial. Tota una jornada de música electrònica ",
  // "img": "https://ameba.cat/wp-content/uploads/2019/04/ameba-parkfest-2019-lineup-mur-1024x1024.png",
  // "date": "00/00/00",
  // "hour": "00:00",
  // "address": ""


  constructor() {
    super();

    this.state = {
      formIsValid: false,
      formControls: {

        name: {
          value: '',
          placeholder: 'Escriu un títol',
          valid: false,
          validationRules: {
            minLength: 4,
            isRequired: true
          },
          touched: false
        },
        content: {
          value: '',
          placeholder: 'Escriu el article',
          valid: false,
          validationRules: {
            minLength: 4,
            isRequired: true
          },
          touched: false
        },
        address: {
          value: '',
          placeholder: 'Adreça',
          valid: false,
          validationRules: {
            minLength: 4,
            isRequired: true
          },
          touched: false
        },
        img: {
          value: '',
          placeholder: 'URL imatge',
          valid: false,
          validationRules: {
            isRequired: true
          },
          touched: false
        },
        date: {
          value: '',
          placeholder: 'Data',
          valid: false,
          validationRules: {
            isRequired: true
          },
          touched: false
        },
        hour: {
          value: '',
          placeholder: 'Hora',
          valid: false,
          validationRules: {
            isRequired: true
          },
          touched: false
        }

      }

    }
  }


  changeHandler = event => {

    const name = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = Validate(value, updatedFormElement.validationRules);

    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid
    });

  }


  formSubmitHandler = () => {
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }
    console.dir("data a enviar");
    console.dir(formData);
  }


  render() {

    return (
      <div className="Article">
        <TextInput name="name"
          placeholder={this.state.formControls.name.placeholder}
          value={this.state.formControls.name.value}
          onChange={this.changeHandler}
          touched={this.state.formControls.name.touched}
          valid={this.state.formControls.name.valid}
        />

        <TextArea name="content"
          placeholder={this.state.formControls.content.placeholder}
          value={this.state.formControls.content.value}
          onChange={this.changeHandler}
          touched={this.state.formControls.content.touched}
          valid={this.state.formControls.content.valid}
        />
        <TextInput name="img"
          placeholder={this.state.formControls.img.placeholder}
          value={this.state.formControls.img.value}
          onChange={this.changeHandler}
          touched={this.state.formControls.img.touched}
          valid={this.state.formControls.img.valid}
        />
        <TextArea name="address"
          placeholder={this.state.formControls.address.placeholder}
          value={this.state.formControls.address.value}
          onChange={this.changeHandler}
          touched={this.state.formControls.address.touched}
          valid={this.state.formControls.address.valid}
        />
        <TextInput name="date"
          placeholder={this.state.formControls.date.placeholder}
          value={this.state.formControls.date.value}
          onChange={this.changeHandler}
          touched={this.state.formControls.date.touched}
          valid={this.state.formControls.date.valid}
        />
        <TextInput name="hour"
          placeholder={this.state.formControls.hour.placeholder}
          value={this.state.formControls.hour.value}
          onChange={this.changeHandler}
          touched={this.state.formControls.hour.touched}
          valid={this.state.formControls.hour.valid}
        />

        <button onClick={this.formSubmitHandler}
          disabled={!this.state.formIsValid}>
          Publica
          </button>
      </div>
    );

  }
}

export default Article;