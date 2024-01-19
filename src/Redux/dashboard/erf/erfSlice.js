import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchJobCategory = createAsyncThunk("erf/fetchJobCategory",async()=>{
   const request = await fetch(`${process.env.REACT_APP_API_URL}jobcategories`)
   const response = await request.json()
   return response
})

const jobCategorySlice = createSlice({
    name:'jobCategories',
    initialState:{
        loading:false,
        jobCategory:[],
        error:null,
    },
    extraReducers:{
        [fetchJobCategory.pending]:(state,action)=>{
            state.loading = true
        },
        [fetchJobCategory.fulfilled]:(state,action)=>{
            state.loading = false;
            state.jobCategory = action.payload
        },
        [fetchJobCategory.rejected]:(state,action)=>{
            state.loading = true;
            state.error = action.payload

        }
    }
})

export default jobCategorySlice.reducer