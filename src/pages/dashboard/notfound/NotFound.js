import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    document.title='CIPLCRM || 404 Not Found'
  },[])
  return (
    <div>
      <div>
        <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
          <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
            <div class="border-t border-gray-200 text-center pt-8">
              <h1 class="text-9xl font-bold text-primary">404</h1>
              <h1 class="text-6xl font-medium py-8">oops! Page not found</h1>
              <p class="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
              <button onClick={()=>navigate('/')} class="bg-gradient-to-r bg-primary hover:bg-black to-blue-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                HOME
              </button>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default NotFound