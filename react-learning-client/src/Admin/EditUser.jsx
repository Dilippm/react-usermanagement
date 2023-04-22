import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserId } from '../Redux/Admin/AdminSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function EditUser() {

    const { userId, userEmail } = useSelector((state) => state.admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const editeUser = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post("http://localhost:4000/admin/edit-user",
                { userId, userEmail },
                { withCredentials: true }
            )
            console.log(data)
            if(data){
                navigate("/admin")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='body'>
                <div className='container_lr'>
                    <h2>Edite User</h2>
                    <form onSubmit={editeUser}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name='email'
                                placeholder='Email'
                                value={userEmail}
                                onChange={(e) => dispatch(setUserId({ userEmail: e.target.value, userId }))}
                            />
                        </div>
                        {/* <div>
                            <label htmlFor="password">Password</label>
                            <input type='password' name='password' placeholder='Password' />
                        </div> */}
                        <button type='submit'>Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditUser