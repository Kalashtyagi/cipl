import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const data = JSON.parse(localStorage.getItem('data'))
const token = 'Bearer'+" "+ data?.access_token

export const fetchRolesPermission = createAsyncThunk("setting/fetchRolesPermission",async()=>{
   const request = await fetch(`${process.env.REACT_APP_API_URL}role`,{
    method:"GET",
    headers:{
        'Authorization':`${token}`,
        "Content-type": "application/json; charset=UTF-8",
    }
   })
   const response = await request.json()
   console.log(response)
   return response
})

const rolesPermissionSlice = createSlice({
    name:'rolesPermission',
    initialState:{
        loading:false,
        rolesPermission:[],
        error:null,
    },
    extraReducers:{
        [fetchRolesPermission.pending]:(state,action)=>{
            state.loading = true
        },
        [fetchRolesPermission.fulfilled]:(state,action)=>{
            state.loading = false;
            state.rolesPermission = action.payload
        },
        [fetchRolesPermission.rejected]:(state,action)=>{
            state.loading = true;
            state.error = action.payload

        }
    }
})

export default rolesPermissionSlice.reducer