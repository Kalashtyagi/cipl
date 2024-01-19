import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { BREADCRUMB_LINKS } from '../../lib/consts/BreadCrumb'
import {AiOutlineHome,AiFillPlusCircle} from 'react-icons/ai'

const BreadCrumb = () => {
    const {pathname} = useLocation()
    const localData = JSON.parse(localStorage.getItem('data'))
  return (
    <div className='lg:px-4 px-3'>
    {
      BREADCRUMB_LINKS?.filter(navigate=>localData&&localData?.data?.userPermissions?.some((item)=>item === navigate?.key )).filter((match)=>match.path === pathname.replace("/admin/","")).map((breadCrumb,index)=>{
        return (
          <div key={index} className="flex items-center justify-between">
            <span className="lg:text-xl text-lg">{breadCrumb?.name}</span>
            <div className="flex items-center">
              <span>
                <Link to="/admin">
                  <AiOutlineHome size={30} className="text-primary px-1" />
                </Link>
              </span>
              <span className="lg:text-xl text-lg">{"/"+ breadCrumb?.name}</span>
              {
                breadCrumb?.showButton?
              <button className="px-2 flex bg-gray-800 hover:bg-slate-700 text-white m-2 py-2 items-center rounded">
                <span className="px-1">
                  {breadCrumb?.buttonLogo}
                </span>
                <Link to={`/admin/${breadCrumb?.buttonPath}`}>{breadCrumb?.buttonTitle}</Link>
              </button>
              :
              null
              }
            </div>
          </div>
        );
      })
      }
    </div>
  )
}

export default BreadCrumb