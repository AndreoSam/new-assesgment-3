import React, { useState } from 'react'
import "./Forgot.css"
import { TextField, Typography } from '@mui/material'
import { Button } from 'react-bootstrap'
import { forgotUser } from '../Reducer/mediaSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Forgot = () => {
    const [state, setState] = useState({
        email: "",
        first_school: "",
        newPassword: "",
        errors: {
            email: "",
            first_school: "",
            newPassword: ""
        }
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const changeHandler = (event) => {
        const { value, name } = event.target;
        // console.log(name, ":", value);
        setState(prevState => ({
            ...prevState,
            [name]: value,
            errors: {
                ...prevState.errors,
                [name]: ""
            }
        }));
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (!state.email || !state.first_school || !state.newPassword) {
            setState(prevState => ({
                ...prevState,
                errors: {
                    email: !state.email ? 'Please enter your email address.' : '',
                    first_school: !state.first_school ? 'Enter your first school name.' : '',
                    newPassword: !state.newPassword ? 'Please enter your new password.' : '',
                }
            }));
            return;
        }
        else {
            dispatch(forgotUser({
                data: { email: state.email, first_school: state.first_school, newPassword: state.newPassword }
            }))
                .then((res) => {
                    console.log("Response: ", res);
                    if (res.payload.message === "Password Reset Successfully") {
                        alert(res.payload.message);
                        navigate('/');
                    }
                })
                .catch((err) => console.log('Axios post error:', err));
                alert("Wrong email address or school name.")
        }
    }

    return (
        <div className='forgot_main_css'>
            <div className="forgot_main_css_header">
                Test Server
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "right" }}>
                <div className='forgot_css_1' onSubmit={submitHandler}>
                    <Typography variant="h4" gutterBottom style={{ fontWeight: 800 }}>Forgot Password</Typography>
                    <Typography className='forgot_css_1_typography' variant="subtitle2" gutterBottom>Enter your email address, first school and new password to reset your password</Typography>
                    <form>
                        <div className='forgot_textfield'>
                            <TextField className='forgot_textfield_inputfield' label="Email" onChange={changeHandler} type="text"
                                name="email" error={!!state.errors.email}
                                helperText={state.errors.email} />
                            <TextField className='forgot_textfield_inputfield' label="First School" onChange={changeHandler} type="text"
                                name="first_school" error={!!state.errors.first_school}
                                helperText={state.errors.first_school} />
                            <TextField className='forgot_textfield_inputfield' label="New Password" onChange={changeHandler} type="text"
                                name="newPassword" error={!!state.errors.newPassword}
                                helperText={state.errors.newPassword} />
                        </div>

                        <div>
                            <Button className='Continue_btn' type="submit">Continue</Button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                @2024 All Right Reserved.
            </div>
        </div >
    )
}

export default Forgot