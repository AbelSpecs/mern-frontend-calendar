import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { authStartLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const initState = {
        email: "eltopoide@gmail.com",
        password: "123456" 
    }

    const [loginValues, handleInputChange] = useForm(initState);

    const {email, password} = loginValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authStartLogin(email, password));
    }

    return (
        <div className="container login-container mb-5">
            <div className="row">
                <div className="col-md-6 mx-auto login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input 
                                type="text"
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
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                
            </div>
        </div>
    )
}
