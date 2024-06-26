import React, { useState, useEffect } from "react";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import userPic from "../assets/userSh.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function UserAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [posterCode, setPosterCode] = useState("");
  const [UserProfile, setUserProfile] = useState([]);
  const navigate = useNavigate();

    
  useEffect(() => {
    axios
      .get("http://localhost:3001/server/userInfo/userInfoGet")
      .then((result) => {
        console.log("data: ", typeof result.data.data); // Check the fetched data
        console.log("data: ", Object.values(result.data.data)); // Check the fetched data
        setUserProfile(result.data ? Object.values(result.data.data) : []);
      })
      .catch((err) => console.error(err)); // Log any errors

      console.log(UserProfile,"cdcdcdcd")
  }, []);

  
  const handleDelete = (id)=>
  {
    axios.delete(`http://localhost:3001/server/userInfo/userInfoDelete/${id}`)
    .then(res=>{console.log(res)
        window.location.reload()
    } )
    .catch(err=>console.log(err))
  }




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/server/userInfo/userInfoCreation",
        {
          name,
          email,
          mobile,
          city,
          posterCode,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        alert("User Details created successfully!");
        navigate("");
        alert("YOU");
      } else {
        throw new Error(response.data || "Failed to create UserDetails");
      }
    } catch (error) {
      console.error("Error creating UserDetails:", error);
    }
  };


  return (
    <div>
    <Navbar/>
    <div className='flex'>
      <div className='flex w-[300px] h-[1200px] bg-lime-900'>
        <div className='p-5'>
          <button className='w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3'><Link to="/">User Infor</Link></button>
          <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/userPayment">Payment Infor</Link></button>
          <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/UserProduct">Delivery Info</Link></button>
          <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/userFeedback">FeedBack</Link></button>
          <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/userFeedback">Promotion</Link></button>
        </div>
      </div>
      <div>
        <h1 className='text-3xl text-center'>User Information</h1>
        <div className='w-[150px] h-[150px]  rounded-full ml-[500px] mt-5 bg-gray-300 pt-3 -mb-[150px]'>
          <img src={userPic} alt="user image" className='w-[100px] h-[100px] m-auto ' />
        </div>
        <div className=' w-[700px] h-[600px] bg-gray-300 rounded-lg ml-52 mt-32'>
          <form className='px-6 py-8' onSubmit={handleSubmit}>
             <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />

              <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Email-address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />


              <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              />


              <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              />


              <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Poster Code"
              value={posterCode}
              onChange={(e) => setPosterCode(e.target.value)}
              />


              <button className='w-[150px] h-[40px] bg-green-900 text-white rounded-xl text-center ml-96 mt-6'>Submit</button>
          </form>


          <div className=" bg-white rounded p-4">
            <table className=" border">
              <thead>
                <tr className="bg-gray-200">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>City</th>
                  <th>PosterCode</th>
                </tr>
              </thead>
              <tbody>
                {/* get all data from db */}
                {UserProfile.map((profile, index) => (
                  <tr key={index}>
                    <td className=' px-10'>{profile.name}</td>
                    <td className=' px-10'>{profile.email}</td>
                    <td className=' px-10'>{profile.mobile}</td>
                    <td className=' px-10'>{profile.city}</td>
                    <td className=' px-10'>{profile.posterCode}</td>
                    <td className="border p-2 flex items-center  justify-around">
                      <Link to={`/userAccountUpdate/${profile._id}`} className="px-2 py-1  bg-yellow-700 rounded-sm text-white  flex items-center"><RxUpdate className='mr-1' /> Update</Link>
                      <button className="px-2 py-1 bg-red-700 rounded-sm text-white mx-2 flex items-center " onClick={(e)=>handleDelete(profile._id)}><RiDeleteBin6Line className='mr-1' />Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default UserAccount