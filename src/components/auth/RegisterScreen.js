import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Swal from 'sweetalert2';
import { authstartRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const initState = {
        name: "el topoide3",
        email: "eltopoide3@gmail.com",
        password: "123456",
        password2: "123456"
    }

    const [registerValues, handleInputChange] = useForm(initState);

    const {name ,email, password, password2} = registerValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password === password2){
            dispatch(authstartRegister(name ,email, password));
        }else{
            Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        }
    }

    return (
        <div className="container login-container mb-5">
            <div className="row">

                <div className="col-md-6 mx-auto login-form-2">
                        <h3>Registro</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name="name"
                                    onChange={handleInputChange}
                                    value={name}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo"
                                    name="email"
                                    onChange={handleInputChange}
                                    value={email}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name="password"
                                    onChange={handleInputChange}
                                    value={password} 
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Repita la contraseña"
                                    name="password2"
                                    onChange={handleInputChange}
                                    value={password2}  
                                />
                            </div>

                            <div className="form-group">
                                <input 
                                    type="submit" 
                                    className="btnSubmit" 
                                    value="Crear cuenta" />
                            </div>
                        </form>
                    </div>
            </div>
        </div>
       
    )
}
