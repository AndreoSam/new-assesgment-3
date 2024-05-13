import React, { useState } from 'react';
import "./Registration.css";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Reducer/mediaSlice';
import { TextField, Typography, Button } from '@mui/material';

const Registration = () => {
    const isEmail = (email) =>
        /^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$/i.test(email);
    const isPassword = (pass) =>
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,20}$/i.test(pass);

    const [img, setImg] = useState("");
    const [state, setState] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        first_school: "",
        errors: {
            name: "",
            email: "",
            mobile: "",
            password: "",
            first_school: ""
        },
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
                [name]: ""
            }
        }));
    };

    const handleImage = (file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        setImg(file);
        if (!file) {
            setState(prevState => ({
                ...prevState,
                errors: {
                    ...prevState.errors,
                    img: "Please upload an image."
                }
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                errors: {
                    ...prevState.errors,
                    img: ""
                }
            }));
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (!state.name || !state.email || !state.mobile || !state.password || !state.first_school || !img) {
            setState(prevState => ({
                ...prevState,
                errors: {
                    name: !state.name ? "Name should be between 1 and 16 characters." : "",
                    email: !state.email || !isEmail(state.email) ? "Invalid email. Please re-enter." : "",
                    mobile: !state.mobile || state.mobile.length !== 10 ? "Enter a 10-digit phone number." : "",
                    password: !state.password || !isPassword(state.password) ? "Invalid password format." : "",
                    first_school: !state.first_school ? "School name should be between 1 and 15 characters." : "",
                    img: !img ? "Please upload an image." : ""
                }
            }));
            return;
        } else {
            let formData = new FormData();
            formData.append('name', state.name);
            formData.append('email', state.email);
            formData.append('mobile', state.mobile);
            formData.append('password', state.password);
            formData.append('first_school', state.first_school);
            formData.append('image', img);

            dispatch(registerUser({ data: formData }))
                .then((res) => {
                    console.log("Response: ", res.payload.data);
                    alert(res.payload.message);
                    navigate("/")
                })
                .catch((err) => {
                    console.log("Dispatch error: ", err);
                });
        }
        // console.log("State: ", state, img);
    };

    return (
        <div className='reg_css_1'>
            <div className='reg_css_left'>
                <form onSubmit={submitHandler}>
                    <div className='reg_css_right_main'>
                        <div>
                            <Typography className='register_heading_css'>Create a New Account</Typography>
                        </div>
                        <div className='form_css'>
                            <TextField
                                className="input_data_css"
                                type="text"
                                name="name"
                                label="name"
                                onChange={changeHandler}
                                error={!!state.errors.name}
                                helperText={state.errors.name}
                            />

                            <TextField
                                className="input_data_css"
                                type="text"
                                name="email"
                                label="email"
                                onChange={changeHandler}
                                error={!!state.errors.email}
                                helperText={state.errors.email}
                            />
                            <TextField
                                className="input_data_css"
                                type="text"
                                name="mobile"
                                label="mobile"
                                onChange={changeHandler}
                                error={!!state.errors.mobile}
                                helperText={state.errors.mobile}
                            />
                            <TextField
                                className="input_data_css"
                                type="text"
                                name="password"
                                label="password"
                                onChange={changeHandler}
                                error={!!state.errors.password}
                                helperText={state.errors.password}
                            />
                            <TextField
                                className="input_data_css"
                                type="text"
                                name="first_school"
                                label="first_school"
                                onChange={changeHandler}
                                error={!!state.errors.first_school}
                                helperText={state.errors.first_school}
                            />
                            <div>
                                <label style={{ color: "black" }} >Please upload an image:
                                    <input type="file" name='img' onChange={(event) => handleImage(event.target.files[0])} />
                                </label>
                                {state.errors.img && <p className="error-message">{state.errors.img}</p>}
                            </div>
                            <Button type="submit" className='registration_icon'>
                                Submit
                            </Button>

                            <Link to="/" className="link_css" >
                                Already have an account?
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration;
