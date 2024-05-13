import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import "./Profile.css"
import { updateUser, userProfile } from '../Reducer/mediaSlice'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Profile = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [state, setState] = useState("")
    const [upPass, setUppass] = useState({
        oldPassword: "",
        password: "",
        errors: {
            oldPassword: "",
            password: "",
        }
    })
    const [img, setImg] = useState("")
    const dispatch = useDispatch()

    const navigate = useNavigate();
    //user profile data
    useEffect(() => {
        dispatch(userProfile())
            .then((res) => {
                console.log("Profile Data: ", res.payload.data[0]);
                setState(res.payload.data[0])
                setImg(res.payload.data[0].image)
                // setImg("uploads/" + res.payload.data[0].image)
                // const imageUrl = URL.createObjectURL(new Blob([res.payload.data[0].image]));
                // setImg("uploads/" + imageUrl);
            })
    }, [dispatch])

    const changeHandler = (event) => {
        const { value, name } = event.target;
        // console.log(name, ":", value);
        setUppass(prevState => ({
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

        if (!upPass.oldPassword || !upPass.password) {
            setUppass(prevState => ({
                ...prevState,
                errors: {
                    oldPassword: !upPass.oldPassword ? 'Please enter your old password.' : '',
                    password: !upPass.password ? 'Enter your new password.' : ''
                }
            }));
            return;
        }
        else {
            dispatch(updateUser({
                data: { user_id: state._id, password: upPass.password }
            }))
                .then((res) => {
                    console.log("Response: ", res.payload.msg);
                    if (res.payload.msg === "your password hasbeen updated") {
                        alert("Password Update");
                        navigate('/user/dashboard');
                    }
                })
                .catch((err) => console.log('Axios post error:', err));
        }
    }

    // console.log("State: ", state);
    console.log("Upate Pass Data: ", upPass);
    // console.log("Image: ", img);

    return (
        <div>
            <Header />
            <div className='main_div_css_profile'>
                <h1 style={{color:"white"}}>Welcome Mr.{state.name}</h1>
                <div className='profile_main_css'>
                    <div className='profile_main_css_2'>
                        <div className='profile_picture_css'>
                            <img src={`https://webskitters-student.onrender.com/${img}`} alt="no img" style={{ maxHeight: "500px" }} />
                        </div>
                        <div className='profile_description_css'>
                            <p className='profile_description_css_p_tag'>ID: {state._id}</p>
                            <p className='profile_description_css_p_tag'>Name: {state.name}</p>
                            <p className='profile_description_css_p_tag'>Email: {state.email}</p>
                            <p className='profile_description_css_p_tag'>Mobile: {state.mobile}</p>
                            <p className='profile_description_css_p_tag'>Role: {state.role}</p>
                            <p className='profile_description_css_p_tag'>First School: {state.first_school}</p>
                        </div>
                    </div>
                    <div className='profile_main_css_3'>
                        <div className='profile_right_css_forget'>
                            <div>
                                Forgot account password?
                            </div>
                            <div>
                                <Button onClick={handleOpen}>Click Me</Button>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{
                                        backdrop: {
                                            timeout: 500,
                                        },
                                    }}
                                >
                                    <Fade in={open}>
                                        <Box sx={style} onSubmit={submitHandler}>
                                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                                Update Password
                                            </Typography>
                                            <Typography>User ID: {state._id}</Typography>
                                            <form >
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }}>
                                                    <TextField label="Old Password" style={{ gap: "10px", margin: "10px" }} onChange={changeHandler} type="text"
                                                        name="oldPassword" error={!!upPass.errors.oldPassword}
                                                        helperText={upPass.errors.oldPassword} />
                                                    <TextField label="New Password" style={{ gap: "10px", margin: "10px" }} onChange={changeHandler} type="text"
                                                        name="password" error={!!upPass.errors.password}
                                                        helperText={upPass.errors.password} />
                                                    <Button style={{ backgroundColor: "green", color: "white" }} type="submit">Update</Button>
                                                </div>
                                            </form>
                                        </Box>
                                    </Fade>
                                </Modal>
                            </div>
                        </div>
                        {/* <div className='profile_right_css_forget'>
                            vcfbcf
                        </div> */}
                    </div>

                </div>
                <div>
                    <Button>
                        <Link style={{ textDecoration: "none" }} to={"/"}>
                            Back
                        </Link>
                    </Button>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Profile