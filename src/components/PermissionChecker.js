import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const PermissionChecker = ({permission,permissionId,token,state}) => {
    const [checkTrue,setCheckTrue] = useState()
    const location = useLocation()
    // console.log(`Permission for ${permissionId}`,checkTrue)
    const getPermissionChecker = async()=>{
          const rolesRequest = await fetch(`${process.env.REACT_APP_API_URL}role-permission/permissionid`,{
            method:"post",
            headers:{
                'Authorization':`${token}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            body:JSON.stringify({
              permission_id:permissionId && permissionId,
              role_id:state && state?.id
            })
           })
           const rolesResponse = await rolesRequest.json()
          //  console.log(`rolesResponse ${permissionId}`, rolesResponse)
           if(rolesResponse.code === 200){
            setCheckTrue(true)

           }
           if(rolesResponse.code === 404){
              setCheckTrue(false)
           }
        }

    useEffect(()=>{
      if(permissionId){
        getPermissionChecker()
      }
    },[location])

    const  heandelChange= async (e)=>{

      if(e.target.checked===true){
        setCheckTrue(true)
        await fetch(`${process.env.REACT_APP_API_URL}role-permission/assign`,{
        method:"post",
        headers:{
            'Authorization':`${token}`,
            "Content-type": "application/json; charset=UTF-8",
        },
        body:JSON.stringify({
            permissionId:permissionId && permissionId,
            roleId:state && state?.id,
            assignPermission: 'yes'
        })
        })
      }else{
        setCheckTrue(false)
        fetch(`${process.env.REACT_APP_API_URL}role-permission/assign`,{
          method:"post",
          headers:{
              'Authorization':`${token}`,
              "Content-type": "application/json; charset=UTF-8",
          },
          body:JSON.stringify({
              permissionId:permissionId && permissionId,
              roleId:state && state?.id,
              assignPermission: 'no'
          })
          })
      }
      
    }
  return (
        <td key={permission?.id} className="lg:px-6 px-3 py-4 overflow-hidden text-sm text-gray-800 whitespace-nowrap">
    <div className="flex justify-center">
        <label class="inline-flex relative items-center">
            <input
                type="checkbox"
                className=""
                 
                checked={checkTrue === true? true: false}
               onChange={(e)=>heandelChange(e)}
            />
        </label>
    </div>
</td>
  )
}

export default PermissionChecker