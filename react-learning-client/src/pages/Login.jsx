import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { changeUserDetails } from '../Redux/User/UserSlice'


function Login() {

    const navigate = useNavigate()
    const dispath = useDispatch()

    const [value, setValue] = useState({
        email: "",
        password: ""
    })

    const generateError = (err) => toast.error(err, {
        position: "bottom-right"
    })

    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:4000/login", {
                ...value
            }, { withCredentials: true })
            console.log(data)
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors
                    if (email) generateError(email)
                    else if (password) generateError(password)
                } else {
                    navigate("/")
                    dispath(changeUserDetails({ name: data.email, userId: data.user, image:data.imageUrl}))
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='body'>
            <div className='container_lr'>
                <h2>Login</h2>
                <form onSubmit={handleSumbit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' placeholder='Email' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' placeholder='Password' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                    </div>
                    <button type='submit'>Login</button>
                    <span>
                        I don't have account <Link to='/register'>Register</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login