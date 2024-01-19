import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionEditor from "../../../components/QuestionEditor";
import Select from 'react-select'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const AddExam = () => {
    const [editorState, setEditorState] = useState('')
    const [categoryList, setCategoryList] = useState('')
    const [category, setCategory] = useState('')
    const [examTitle, setExamTitle] = useState('')
    const [timeDuration, setTimeDuration] = useState('')
    const [attempt, setAttempt] = useState('')
    const [convertedContent, setConvertedContent] = useState(null);

    const jsonData = JSON.parse(localStorage.getItem('data'));
    const accessToken = jsonData && jsonData?.access_token;
    const authorize = "Bearer" + " " + accessToken;

    const getCategory = async () => {
        const requestCategory = await axios.get(`${process.env.REACT_APP_API_URL}jobcategories`, {
            headers: {
                'Authorization': `${authorize}`
            }
        })
        const categoryResponse = await requestCategory?.data
        // console.log('Categories', categoryResponse)
        if (categoryResponse?.data.length > 0) {
            // console.log("category response", categoryResponse)
            setCategoryList(categoryResponse?.data.map((x) => ({ label: x?.name, value: x?.id })))
        }
    }

    useEffect(() => {
        getCategory()
    }, [])

    // console.log('time',timeDuration)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("Content", convertedContent)
        try {
            const fetchAPI = await fetch(`${process.env.REACT_APP_API_URL}exam/store`, {
                method: "post",
                headers: {
                    'Authorization': `${authorize}`,
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    name: examTitle,
                    time_duration: timeDuration,
                    attempt: attempt,
                    description: convertedContent,
                })
            })
            const response = await fetchAPI.json()
            // console.log("Response",response)
            if (response?.code === 200) {
                toast.success(`${response?.message}`)
                
                setTimeout(()=>{
                    navigate('/admin/exam')
                },3000)
                clearTimeout()
            }

        } catch (error) {
            console.log('error', error)
            if (error?.response?.data?.error) {
                const errors = Object.values(error?.response?.data?.error)
                console.log('Errors', errors)
                errors.map((x) => (
                    toast.error(`${x}`)
                ))
            }
            if (error?.response?.data?.message) {
                if (error?.response?.data?.error) {
                    const errors = Object.values(error?.response?.data?.error)
                    console.log('Errors', errors)
                    errors.map((x) => (
                        toast.error(`${x}`)
                    ))
                }
                if (error?.response?.data?.message) {
                    toast.error(`${error?.response?.data?.message}`)
                }
            }
        }
    }

    const navigate = useNavigate()
    return (
        <>
        <ToastContainer position="top-center" />
            <div className="bg-white mx-3 my-2 shadow-lg rounded-lg">
                <form onSubmit={(e) => handleSubmit(e)} className="bg-gray-0 m-1 rounded px-2  pt-6 pb-4" >
                    <div className=" grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        <div className=" grid-cols-4 sm:grid-cols-1 ">
                            <label className="block text-black text-sm font-medium ">
                                Job Category  
                            </label>
                            <Select
                                options={categoryList}
                                isClearable
                                onChange={(e) => setCategory(e?.value)}
                            />
                            {/* <input onChange={(e)=>setExamTitle(e.target.value)} className="shadow w-full appearance-none border rounded py-[5px] px-1 text-black" /> */}
                        </div>
                        <div className=" grid-cols-4 sm:grid-cols-1 ">
                            <label className="flex text-black text-sm font-medium ">
                                Exam Title <span className="pl-1 text-red-500">*</span>
                            </label>
                            <input required onChange={(e) => setExamTitle(e.target.value)} className="shadow w-full appearance-none border rounded py-[5px] px-1 text-black" />
                        </div>
                        <div className=" grid-cols-4 sm:grid-cols-1  ">
                            <label className="block text-black text-sm font-medium ">
                                Time Duration <span className="pl-1 text-red-500">*</span>
                            </label>
                            <input required onChange={(e) => setTimeDuration(e.target.value)} type="time" className="shadow w-full timepicker appearance-none border rounded m-full py-1 px-1 text-black" />
                        </div>
                        <div className=" grid-cols-4 col sm:grid-cols-1 ">
                            <label className="block text-black text-sm font-medium ">
                                Attempt <span className="pl-1 text-red-500">*</span>
                            </label>
                            <input required type="number" onChange={(e) => setAttempt(e.target.value)} className="shadow w-full timepicker appearance-none border rounded m-full py-[5px] px-1 text-black" />
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-1 sm:grid-cols-1 py-2 md:gap-1">
                        <label className="block text-black text-sm font-medium" >
                            <span className="text-gray-700">Description <span className="pl-1 text-red-500">*</span></span>
                        </label>
                        <QuestionEditor convertedContent={convertedContent} setConvertedContent={setConvertedContent} />
                    </div>
                    <div className="flex items-center justify-end mt-5 border-solid border-blueGray-200 rounded-b">

                        <button type="submit"
                            className="text-white bg-gray-600 active:bg-gray-700 font-medium text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"


                        >
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </>

    );
};

export default AddExam;