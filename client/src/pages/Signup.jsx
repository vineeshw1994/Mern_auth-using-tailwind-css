import { Link } from "react-router-dom"
const Signup = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3-xl text-center font-semibold my-7">Sign Up</h1>

      <form action="" className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id="username" className="bg-slate-100 p-3 rounded-lg"  />
        <input type="text" placeholder="Email" id="username" className="bg-slate-100 p-3 rounded-lg"  />
        <input type="password" placeholder="password" id="username" className="bg-slate-100 p-3 rounded-lg"  />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-95"></button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account</p>
        <Link to='/sign-in'>
        <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default Signup