import React from 'react';
import { isEmail } from "validator";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Iep fera! Aquest camp es obligatori!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Ay ay ay... això no es vàlid!
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Ni et flipis ni et quedis curt, has de tenir de 3-20 lletres!
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                Ni et flipis ni et quedis curt, has de tenir de 6-40 lletres
            </div>
        );
    }
};

const vdninie = (value) => {
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i
    const str = value.toUpperCase();
    if (!nifRexp.test(str) && !nieRexp.test(str)) {
        return (
            <div className="alert alert-danger" role="alert">
                Número incorrecte
            </div>
        );
    }
};

const vphone = (value) => {
    var phoneRexp = /^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/i;
    const str = value.toString();
    if (!phoneRexp.test(str)) {
        return (
            <div className="alert alert-danger" role="alert">
                Número incorrecte
            </div>
        );
    }
};




export default function FormValidator(props) {
    const { field, value } = props;

    const getErrorMessage = (type, value) => {
        var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i
        var phoneRexp = /^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/i;
        let msg = undefined;
        switch (type) {
            case 'required':
                if (!value) msg = "Iep fera! Aquest camp es obligatori!"
                return msg;
            case 'validEmail':
                if (!isEmail(value)) msg = "Ay ay ay... això no es vàlid!"
                return msg;
            case 'vusername':
                if (value.length < 3 || value.length > 20) msg = "Ni et flipis ni et quedis curt, ha de tenir de 3-20 lletres!"
                return msg;
            case 'vpassword':
                if (value.length < 6 || value.length > 40) msg = "Ni et flipis ni et quedis curt, ha de tenir de 6-40 lletres"
                return msg;
            case 'vdninie':
                let str = value.toUpperCase();
                if (!nifRexp.test(str) && !nieRexp.test(str)) msg = "Número incorrecte"
                return msg;
            case 'vphone':
                let strNum = value.toString();
                if (!phoneRexp.test(strNum)) msg = "Número incorrecte"
                return msg;
            default:
                return msg;
        }
    }
    
return (
    <div className="alert alert-danger" role="alert">
        {getErrorMessage(field, value)}
    </div>
)
}
