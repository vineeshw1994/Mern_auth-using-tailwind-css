import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice.js'
import { useDispatch, useSelector } from "react-redux"
import OAuth from "../components/OAuth.jsx"



const Signin = () => {

  const [formData, setFormData] = useState({})
  
  const {loading, error} = useSelector((state) => state.user)


  const nabvigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }




  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(signInStart()) 
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data))
        console.log(data)
        return;
      }

      dispatch(signInSuccess(data))
      nabvigate('/')

    } catch (err) {
      dispatch(signInFailure(error))
      console.log(error.message)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3-xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input type="text" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />

        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg pr-10"
          onChange={handleChange} />



        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-95">
        {loading ? 'Loading....' : "Sign in"}
        </button>

        <OAuth />

      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to='/sign-up'>
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5 text-center ">{error ? error.message || 'something went wrong' : ''}</p>
    </div>
  )
}

export default Signin