import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png'

const Login = () => {
    const [email, setEmail] = useState("E-Mail Address");
    const [password, setPassword] = useState("Password");
    const [error,setError] = useState('')
    const navigate = useNavigate();
  
    const handleClick = async (e) => {
      e.preventDefault()
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL}login?email=${email}&password=${password}`
      );
      const response = request.data;
      if (response.code === 200 && response.status ===1) {
        localStorage.setItem("data", JSON.stringify(response));
        navigate("/admin");
      }else{
          setError("Ooops.!! Email Or Password is wrong.")
        }
      // navigate("/dashboard");
    };

    const localData = JSON.parse(localStorage.getItem('data'))

    useEffect(()=>{
      if(localData && localData.code === 200 && localData.status === 1 ){
        navigate('/admin')
      }
      document.title = "CIPLCRM | Login"

    },[])


  return (
    <div>
        <div className="w-screen h-screen justify-center flex p-4 pt-10 bg-[url('../public/images/auth.jpg')] bg-cover bg-no-repeat">
      <div className={`${error? "h-[360px]":"h-[340px]"}  mt-[5%] shadow-2xl md:w-[25%] w-[80%] bg-white justify-center border rounded rounded-t-lg`} >
        <div className="px-10 py-4 justify-center flex rounded-t-lg bg-primary">
          <Link to="/">
            <img src={logo} style={{ maxHeight: "40px" }} alt="" />
          </Link>
        </div>
        <form onSubmit={(e)=>handleClick(e)}>
        <div className="my-4">
          <div className="p-4">
            <div>
              <div className="mb-3">
                <input
                  type="email"
                  className="w-full border-gray-300 border px-2 py-1 rounded text-sm focus:ring-blue-500"
                  placeholder={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder={password}
                  className="w-full border-gray-300 border px-2 py-1 rounded text-sm"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='my-2 text-sm text-red-500'>
              {error}
              </div>
              <div className="py-2">
                <div className="flex">
                  <div className="">
                    <label className="flex items-center">
                      <div
                        className="flex"
                        aria-checked="false"
                        aria-disabled="false"
                        style={{ position: "relative" }}
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-sky-700 bg-gray-400 border-gray-500 rounded focus:ring-sky-700 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <span className="px-2">Remember Me</span>
                    </label>
                  </div>
                </div>
                <div className="cols-span-12 mt-4">
                  <input
                    type="submit"
                    value="Login"
                    className="w-full cursor-pointer border border-slate-700 rounded text-white hover:bg-white hover:text-slate-700 py-2 bg-slate-700 delay-100 block"
                    
                  />
                </div>
              </div>

              <p className="mt-4 text-left cursor-pointer">
                <Link to="/forgotpassword" className="text-blue-400">
                  I forgot my password
                </Link>
              </p>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login