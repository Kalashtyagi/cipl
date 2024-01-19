import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionEditor from '../../../components/QuestionEditor'
import { ToastContainer, toast } from 'react-toastify'

const AddQuestion = () => {
    const [question, setQuestion] = useState('')
    const [questionType, setQuestionType] = useState('description')
    const [categoryList, setCategoryList] = useState('')
    const [jobId, setJobId] = useState('')
    const [marks, setMarks] = useState('')
    const [answer, setAnswer] = useState('')
    const [optionA, setOptionA] = useState('')
    const [optionB, setOptionB] = useState('')
    const [optionC, setOptionC] = useState('')
    const [optionD, setOptionD] = useState('')
    const jsonData = JSON.parse(localStorage.getItem("data"));
    const navigate = useNavigate()
    const accessToken = jsonData?.access_token;
    //   console.log("bearerToken", accessToken);
    const authorize = "Bearer" + " " + accessToken;
    // console.log("authorize", authorize);

    const getData = async () => {
        const getApiData = await axios.get(`${process.env.REACT_APP_API_URL}jobcategories`, {
            headers: {
                'Authorization': `${authorize}`,
            },
        });
        const apiResonse = await getApiData?.data;
        if (apiResonse) {
            setCategoryList(apiResonse?.data);
        }
        // console.log("API Response",apiResonse.data);
    };

    useEffect(() => {
        getData()
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.append('option_a', optionA)
            formData.append('option_b', optionB)
            formData.append('option_c', optionC)
            formData.append('option_d', optionD)
            formData.append('question', question)
            formData.append('jobcategory_id', jobId)
            formData.append('answer', answer)
            formData.append('status', 'enable')
            formData.append('question_type', questionType)
            formData.append('marks', marks)
            const sendData = await axios.postForm(`${process.env.REACT_APP_API_URL}questions/store`, formData, {
                headers: {
                    'Authorization': `${authorize}`,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'js'
                }
            })
            const response = await sendData.data
            console.log('response',response)
            if (response?.code === 200) {
                toast(`${response?.message}`)
                setTimeout(()=>{
                    navigate('/admin/questions')
                },3000)
            } if (response?.code === 420) {
                alert("Question already")
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

    const optionalAnswer = [{ name: "A", value: "option_a" }, { name: "B", value: "option_b" }, { name: "C", value: "option_c" }, { name: "D", value: "option_d" },]
    return (
        <div className='w-full bg-white shadow m-4 rounded '>
            <ToastContainer position='top-center'/>
            <form onSubmit={handleSubmit} className='p-2'>
                <div className='grid px-1 m-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                    <div className='p-2'>
                        <label className='text-lg text-gray-600 px-2'>Job Category <span className=' text-red-400'>*</span></label>
                        <select required onChange={(e) => setJobId(e.target.value)} placeholder="Enter Question" className='w-full m-1 p-2 border border-gray-200 rounded'>
                            <option  >Choose Job Category</option>
                            {
                                categoryList && categoryList?.map((category) => (
                                    <option key={category?.id} value={category?.id}>{category?.name}{console.log("category id", category?.id)}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='p-2'>
                        <label className='text-lg text-gray-600 px-2'>Question Type <span className=' text-red-400'>*</span></label>
                        <select required placeholder="Enter Question" onChange={(e) => setQuestionType(e.target.value)} className='w-full m-1 p-2 border border-gray-200 rounded'>
                            <option value="description">Descriptional</option>
                            <option value="option">Optional</option>
                        </select>
                    </div>
                    <div className='p-2'>
                        <label required className='text-lg text-gray-600 px-2'>Marks <span className=' text-red-400'>*</span></label>
                        <input type={'number'} onChange={(e) => setMarks(e.target.value)} placeholder="Enter Marks" className='w-full m-1 p-2 border border-gray-200 rounded' />
                    </div>
                </div>
                <hr className='px-2' />
                <div className='grid px-1 shaodw bg-white rounded m-2 grid-cols-1'>
                    <div className='p-2'>
                        <label className='text-lg text-gray-600 px-2'>Question <span className=' text-red-400'>*</span></label>
                        <QuestionEditor setConvertedContent={setQuestion} />
                    </div>
                    {
                        questionType === "option" ?
                            <>
                                <div className='p-2'>
                                    <label className='text-lg text-gray-600 px-2'>Option A <span className=' text-red-400'>*</span></label>
                                    <QuestionEditor setConvertedContent={setOptionA} />
                                </div>
                                <div className='p-2'>
                                    <label className='text-lg text-gray-600 px-2'>Option B <span className=' text-red-400'>*</span></label>
                                    <QuestionEditor setConvertedContent={setOptionB} />
                                </div>
                                <div className='p-2'>
                                    <label className='text-lg text-gray-600 px-2'>Option C <span className=' text-red-400'>*</span></label>
                                    <QuestionEditor setConvertedContent={setOptionC} />
                                </div>
                                <div className='p-2'>
                                    <label className='text-lg text-gray-600 px-2'>Option D <span className=' text-red-400'>*</span></label>
                                    <QuestionEditor setConvertedContent={setOptionD} />
                                </div>
                                <div className='p-2'>
                                    <label className='text-lg text-gray-600 px-2'>Answer <span className=' text-red-400'>*</span></label>
                                    <select required onChange={(e) => setAnswer(e.target.value)} className="w-1/5 border rounded border-gray-400 p-2 text-center" type={'checkbox'}>
                                        <option className='text-md px-1' >Choose Answer</option>
                                        {
                                            optionalAnswer.map((options, index) => (
                                                <option key={index} className='text-md px-1' value={options?.value}>{options?.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </>
                            : null
                    }
                </div>
                <div className='flex justify-end'>
                    <button type='submit' className='px-8 py-2 m-2 bg-gray-800 text-white rounded hover:bg-gray-900 mx-4'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddQuestion