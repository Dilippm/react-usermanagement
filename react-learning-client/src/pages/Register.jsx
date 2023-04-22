import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'


function Register() {

    const navigate = useNavigate()
    

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
            const { data } = await axios.post("http://localhost:4000/register", {
                ...value
            }, { withCredentials: true })
            console.log(data)
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors
                    if (email) generateError(email)
                    else if (password) generateError(password)
                } else {
                    navigate("/login")
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='container_lr'>
            <h2>Register Account</h2>
            <form onSubmit={handleSumbit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Email' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Password' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                </div>
                <button type='submit'>Register</button>
                <span>
                    Already have an account? <Link to='/Login'>Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register