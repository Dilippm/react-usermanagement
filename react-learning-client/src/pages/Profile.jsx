import React from 'react'
import Home from './Home'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { changeUserDetails } from '../Redux/User/UserSlice'

function Profile() {
    const navigate = useNavigate()

    const [image12, setImage] = useState('')
    const { name, userId, image } = useSelector(state => state.user)
    console.log(image)
    const dispatch = useDispatch()

    const uploadImage = async (e) => {
      
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', image12)
        formData.append("userId", userId)

        const config = {
            header: {
                "content-type": "multipart/form-data",
                userId: userId
            },
            withCredentials: true
        }

        try {
            const { data } = await axios.post("http://localhost:4000/profile", formData, config)
           
            navigate("/")
            dispatch(changeUserDetails({ image: data.imageUrl, name, userId }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Home />
            <section class="" style={{ backgroundColor: '#9de2ff', height: "100vh" }} >
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-md-9 col-lg-7 col-xl-5">
                            <div class="card" style={{ borderRadius: "15px" }}>
                                <div class="card-body p-4">
                                    <div class="d-flex text-black">
                                        <div class="flex-shrink-0">
                                            <img
                                                src={image12 ? URL.createObjectURL(image12) : `/images/${image}`}
                                                class="img-fluid" alt=''
                                                style={{ width: "180px", borderRadius: "10px", marginRight: "20px" }}
                                            />
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                            <h5 class="mb-1">Profile Image</h5>
                                            {/* <p class="mb-2 pb-1" style={{ color: "#2b2a2a" }}>Profile Image</p> */}
                                            <form action="">
                                                <div class="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                    style={{ backgroundColor: "#efefef", borderRadius: "5px" }}>
                                                    {/* <div>
                                                    <p class="small text-muted mb-1">Articles</p>
                                                    <p class="mb-0">41</p>
                                                    </div>
                                                    <div class="px-3">
                                                    <p class="small text-muted mb-1">Followers</p>
                                                    <p class="mb-0">976</p>
                                                    </div>
                                                    <div>
                                                    <p class="small text-muted mb-1">Rating</p>
                                                    <p class="mb-0">8.5</p>
                                                </div> */}
                                                    <input
                                                        type="file"
                                                        style={{ width: "180px", height: "50px" }}
                                                        onChange={(e) => setImage(e.target.files[0])}
                                                    />
                                                </div>
                                                <div class="d-flex pt-1">
                                                    <button
                                                        type="button"
                                                        class="btn btn-outline-primary me-1 flex-grow-1"
                                                        style={{ width: "196px" }}
                                                        onClick={uploadImage}
                                                    >Update Image</button>
                                                    {/* <button type="button" class="btn btn-primary flex-grow-1">Follow</button> */}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile