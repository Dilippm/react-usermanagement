import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { setUserId } from '../Redux/Admin/AdminSlice'

function AdminHome() {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [cookies, removeCookie] = useCookies([])
    const [query, setQuery] = useState("")
 
      

    useEffect(() => {

        const verifyAdmin = async () => {
            if (!cookies.adminjwt) {
                navigate("/admin/login")
            } else {
                const { data } = await axios.post("http://localhost:4000/admin",
                    {},
                    { withCredentials: true }
                ).catch(err => console.log(err)).then(res => console.log(res))
                if (!data.status) {
                    removeCookie("adminjwt")
                    navigate("/admin/login")
                }
            }

        }
        verifyAdmin()

    }, [cookies, navigate, removeCookie])

    useEffect(() => {
        axios.get("http://localhost:4000/getallusers").then((response) => {
            setUsers(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    },[])

    const deleteUser = async (id) => {
        console.log(id)
        axios.post(`http://localhost:4000/admin/delete-user/${id}`,
            {},
            { withCredentials: true }
        ).then((res) => {
            console.log(res)
            if (res.data.deleted) {
                setUsers(users.filter(user => user._id !== id))
            }
        })
    }

    const logOut = () => {
        removeCookie("adminjwt")
        navigate("/admin/login")
    }


    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <span class="navbar-brand" style={{ cursor: "pointer" }} >Admin Panel</span>
                {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> */}

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        {/* <li class="nav-item active">
                            <a href='' class="nav-link" >Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a href='' class="nav-link">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a href='' class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a href='' class="dropdown-item" >Action</a>
                                <a href='' class="dropdown-item" >Another action</a>
                                <div class="dropdown-divider"></div>
                                <a href='' class="dropdown-item" >Something else here</a>
                            </div>
                        </li> */}
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input
                            class="form-control mr-sm-2"
                            type="search" placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button onClick={() => navigate('/admin/adduser')} class="btn btn-outline-success my-2 my-sm-0" type="submit">Add User</button>
                        <button onClick={logOut} class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
                    </form>
                </div>
            </nav>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "3rem" }}>
                <table class="table" style={{ width: "1000px" }}>
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            {/* <th scope="col">Name</th> */}
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.filter((user) => 
                            user.email.toLowerCase().includes(query))
                            .map((user, index) => {
                                // console.log(user.email);
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        {/* <td>Mark</td> */}
                                        <td>{user.email}</td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    dispatch(setUserId({ userId: user._id, userEmail: user.email }))
                                                    navigate("/admin/edit-user")
                                                }}
                                                className='btn btn-warning'
                                                style={{ margin: "5px" }}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                style={{ margin: "5px" }}
                                                onClick={() => deleteUser(user._id)}
                                            >DELETE</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminHome