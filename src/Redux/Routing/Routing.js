import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Registration from '../Components/Registration/Registration'
import Login from '../Components/Login/Login'
import Profile from '../Components/Profile/Profile'
import Forgot from '../Components/Forgot/Forgot'
import View from '../Components/View/View'
import Single from '../Components/Single/Single'
import Create from '../Components/Create/Create'
import Edit from '../Components/Edit/Edit'
import All from '../Components/Pages/All'
import Single2 from '../Components/Pages/Single2'

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Registration />} />
                <Route path='/user/dashboard' element={<Profile />} />
                <Route path='/forget-password' element={<Forgot />} />
                <Route path='/view' element={<View />} />
                <Route path='/single/:id' element={<Single />} />
                <Route path='/edit/product/:id' element={<Edit />} />
                <Route path='/create/product' element={<Create />} />
                <Route path='/user' element={<All />} />
                <Route path='user/single/:sid' element={<Single2 />} />
            </Routes>
        </Router>
    )
}

export default Routing