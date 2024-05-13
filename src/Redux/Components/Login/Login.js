import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Typography, Button } from '@mui/material';
import { loginUser } from '../Reducer/mediaSlice';

const Login = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        errors: {
            email: '',
            password: ''
        }
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (event) => {
        const { value, name } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
            errors: {
                ...prevState.errors,
                [name]: ''
            }
        }));
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (!state.email || !state.password) {
            setState(prevState => ({
                ...prevState,
                errors: {
                    email: !state.email ? 'Email is required.' : '',
                    password: !state.password ? 'Password is required.' : ''
                }
            }));
            return;
        }

        dispatch(loginUser({
            data: { email: state.email, password: state.password }
        }))
            .then((res) => {
                console.log("Response: ", res.payload.user);
                if (res.payload.message === "login successfully") {
                    alert("Login successful");
                    navigate('/view');
                }
            }).catch((err) => { console.log("Error: ", err); 
                alert("Wrong username or password.")
            })
    };

    return (
        <div className='reg_css_1'>
            <div className='reg_css_left'>
                <form onSubmit={submitHandler}>
                    <div className='reg_css_right_main'>
                        <div>
                            <Typography className='register_heading_css'>Login</Typography>
                        </div>
                        <div className='form_css'>
                            <TextField
                                className="input_data_css"
                                type="text"
                                name="email"
                                label="Email"
                                value={state.email}
                                onChange={changeHandler}
                                error={!!state.errors.email}
                                helperText={state.errors.email}
                            />
                            <TextField
                                className="input_data_css"
                                type="password"
                                name="password"
                                label="Password"
                                value={state.password}
                                onChange={changeHandler}
                                error={!!state.errors.password}
                                helperText={state.errors.password}
                            />
                            <Button type="submit" className='registration_icon'>
                                Login
                            </Button>
                            <Link to="/forget-password" className="forgot_css">
                                Forgot password?
                            </Link>

                            <Link to="/register" className="link_css">
                                Don't have an account? Create one.
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
