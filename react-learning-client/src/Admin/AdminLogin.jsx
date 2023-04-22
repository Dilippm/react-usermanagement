import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeAdminDetails } from '../Redux/Admin/AdminSlice'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function AdminLogin() {

    const [value, setValue] = useState({
        username: "",
        password: ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAdminLogin = async (e) => {
        e.preventDefault()
        try {

            const { data } = await axios.post("http://localhost:4000/admin/login",
                { ...value },
                { withCredentials: true }
            )
            if (data.message === "Incorrect Username"){
                toast.error(data.message)
            }else if (data.message === "incorrect Password"){
                toast.error(data.message)
            }else{
                console.log(data)
                navigate("/admin")
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='body'>
            <div className='container_lr'>
                <h2>Admin Login</h2>
                <form onSubmit={handleAdminLogin}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name='username'
                            placeholder='Username'
                            onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div>
                        <lable htmlFor="password">Password</lable>
                        <input
                            type="password"
                            name='password'
                            placeholder='Password'
                            onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AdminLogin 