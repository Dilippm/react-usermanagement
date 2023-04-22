import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'


function Home() {

    const navigate = useNavigate()
    const [cookies, removeCookie] = useCookies([])
    const {name} = useSelector((state) => state.user)
    
      
    
    


    useEffect(() => {

        const verifyUser = async () => {
            if (!cookies.jwt) {
                navigate('/login')
            } else {
                const { data } = await axios.post(
                    "http://localhost:4000",
                    {},
                    { withCredentials: true }
                )
                if (!data.status) {
                    removeCookie("jwt")
                    navigate("/login")
                } else {
                    // toast("Logined in successfully", {
                    //     position: 'top-right'
                    // })
                }
            }
        }
        verifyUser()

    }, [cookies, navigate, removeCookie])

    const logOut = () => {
        removeCookie("jwt")
        navigate("/login")
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <span onClick={() => navigate("/")} class="navbar-brand" style={{ cursor: "pointer" }} >Home</span>
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
                            <a href='' class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                        <span>{name ? name : ""}</span>
                        
                        
                        {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
                        <button onClick={() => navigate('/profile')} className='btn btn-outline-success my-2 my-sm-0' type='submit'>Profile</button>
                        <button onClick={logOut} class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
                    </form>
                </div>
            </nav>
            
            <ToastContainer />
        </>
    )
}

export default Home