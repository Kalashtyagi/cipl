import React, { useEffect, useState } from 'react'
import logo from '../../../assets/emoji-icon/emoji-icon/neutral.png'
import logo1 from "../../../assets/emoji-icon/emoji-icon/sadd.png";
import logo2 from "../../../assets/emoji-icon/emoji-icon/smile.png";
import logo3 from "../../../assets/emoji-icon/emoji-icon/happiness.png";
import logo4 from "../../../assets/emoji-icon/emoji-icon/star.png";
import axios from 'axios';
import moment from 'moment';
import ReviewStar from '../../../components/element/ReviewStar';
import { RiInboxArchiveLine } from 'react-icons/ri';
import { AiOutlineRightCircle } from 'react-icons/ai';

 const InterviewReview = ({setInterviewReview,getData,interviewReviewData}) => {
    const [review,setReview] = useState()
    const [comment,setComment] = useState('')
    // const [rating,setRating] = useState()
    const [technicalReview, setTechnicalReview] = useState(0)
    const [communicationReview, setCommunicationReview] = useState(0)

    console.log("interview data",interviewReviewData)

    // console.log('Data',interviewReviewData)

    const reviewData = [
      {
        id:1,
        image:logo1,
        rating:1,
        alt:"Very Bad Review"
      },
      {
        id:2,
        image:logo,
        rating:2,
        alt:"Bad Review"
      },
      {
        id:3,
        image:logo3,
        rating:3,
        alt:"Neutral Review"
      },
      {
        id:4,
        image:logo2,
        rating:4,
        alt:"Good Review"
      },
      {
        id:5,
        image:logo4,
        rating:5,
        alt:"Very Good Review"
      },
    ]

    const jsonData = JSON.parse(localStorage.getItem("data"));
    const accessToken = jsonData?.access_token;
    //   console.log("bearerToken", accessToken);
    const authorize = "Bearer" + " " + accessToken;

    useEffect(()=>{
      if(jsonData?.data?.id !== interviewReviewData?.employee_id) {
        setInterviewReview(false)
      }
    },[interviewReviewData])

    const handleSubmit = async()=>{
      const formData = new FormData()
      formData.append('rating',review)
      formData.append('techrating',technicalReview)
      formData.append('communicating',technicalReview)
      formData.append('comment',comment)
      formData.append('status',technicalReview?.status==="assign round 1" || "interview round 1"? "interview round 1":technicalReview?.status==="assign round 2" || "interview round 2"?"interview round 2":"")
      const request = await axios.postForm(`${process.env.REACT_APP_API_URL}job-applications/rating/${interviewReviewData?.candidate_id}`,formData,{
        headers:{
          'Authorization':`${authorize}`
        }
      })
      const response = await request?.data
      console.log('Response',response)
      if(response?.code === 200){
        setInterviewReview(false)
        getData()
      }
    }

  return (
    // <div>InterviewReview</div>

    <>
    <div className="justify-center items-center  flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative lg:w-1/3 md:w-2/3 mt-2 w-full mx-2 my-6">
        {/*content*/}
        <div className="border-0 rounded-lg mt-2 h-fit shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start mt-2 justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <div className='flex items-center'>
            <h3 className="text-2xl font-semibold">Interview Review</h3>
            </div>
            <button
              className="p-1 ml-auto border-0 text-red-500  float-right text-3xl leading-none font-semibold "
              onClick={() => setInterviewReview(false)}
            >
              <span className=" text-red-500 h-6 w-6 text-xl block ">
                X
              </span>
            </button>
          </div>
          <div className='w-full px-4'>
  <div className=" w-full flex py-4 items-center">
      <div className='grid grid-cols-3 gap-4 w-full'>
          <div className='w-full'>
                  <label className='pr-1 text-md font-semibold'>Candidate Name</label>
                  <span className='min-h-[4px] text-md rounded my-1 w-full flex'>{interviewReviewData?.full_name}</span>
          </div>
          <div className='w-full'>
                  <label className='pr-1 text-md font-semibold'>Designation</label>
                  <span className='min-h-[4px] text-md rounded my-1 w-full flex'>{interviewReviewData?.degination}</span>
          </div>
          <div className='w-full'>
                  <label className='pr-1 text-md font-semibold'>ERF ID</label>
                  <span className='min-h-[4px] text-md rounded my-1 w-full flex'>{interviewReviewData?.erf_id}</span>
          </div>
          {/* grid 2 */}
          <div className='w-full'>
              <label className='pr-1 text-md font-semibold'>Schedule Date</label>
              <span className='min-h-[4px] text-md rounded my-1 w-full flex'>{moment(interviewReviewData?.schedule_date).utc().format('DD-MM-YYYY')}</span>
          </div>
          <div className='w-full '>
              <label className='pr-1 text-md font-semibold'>Interview Type</label>
              <span className='min-h-[4px] text-md rounded my-1 w-full flex'>{interviewReviewData?.interview_type==="online"?"Online":"Offline"}</span>
          </div>
          </div>
          </div>
          </div>
            <>
            {
              interviewReviewData?.review_id !== null||""||undefined?
              <>
          <hr className='mx-4' />
            <div className="lg:col-span-4 px-3 md:col-span-4 sm:col-span-4 mt-2 mx-1">
              <h1 className=" text-md font-medium">Technical Skill </h1>
              <ul className="flex justify-start py-2">
                <li className='flex'>
                {
                  [...Array(5)].map((star,index)=>{
                    index += 1;
                    return (
                      <ReviewStar
                        // className={`${index <= (hover || rating) ? "text-white" : "text-black"} cursor-pointer`}
                        index={index}
                        rating={interviewReviewData?.techrating}
                      />
                    );
                  })
                }
                </li>
              </ul>
            </div>
            <hr className='mx-4' />
            <div className="lg:col-span-4 px-3 md:col-span-4 sm:col-span-4 mt-2 mx-1">
              <h1 className=" text-md font-medium">Communication Skill </h1>
              <ul className="flex justify-start py-2 text-black">
                <li className='flex'>
                {
                  [...Array(5)].map((star,index)=>{
                    index += 1;
                    return (
                      <ReviewStar
                        // className={`${index <= (hover || rating) ? "text-white" : "text-black"} cursor-pointer`}
                        index={index}
                        rating={interviewReviewData?.communicating}
                      />
                    );
                  })
                }
                </li>
              </ul>
            </div>
          <hr className='mx-4'/>
          <hr className='mx-4'/>
          <div className="lg:col-span-4 px-3 md:col-span-4 sm:col-span-4 mt-2 mx-1">
              <h1 className=" text-xl font-medium">Review </h1>
          </div>
          <div className="lg:col-span-4 px-2 md:col-span-4 sm:col-span-4  mx-1">
            <div className="inline-flex justify-self-end cursor-pointer items-center mb-3 col-span-3">
              {
                reviewData && reviewData?.map((option)=>(
                  <img key={option?.id} src={option?.image} alt={option?.alt} className={`h-10 mx-2 w-10  hover:-translate-y-1 hover:scale-125  duration-300 ${interviewReviewData?.rating!== option?.id ?"opacity-50":""}`} ></img>
                ))
              }
            </div>
          </div>
          <div className="lg:col-span-4 p-3 md:col-span-4 sm:col-span-4 mx-1">
              <span  className="form-textarea h-fit overflow-y-scroll no-scrollbar block w-full shadow rounded  border p-3" rows="2" >
                {interviewReviewData?.comment}
              </span>
          </div>
              </>:null
            }
            {
              interviewReviewData?.review_id === null||""||undefined?
              <>
          <hr className='mx-4' />
            <div className="lg:col-span-4 px-3 md:col-span-4 sm:col-span-4 mt-2 mx-1">
              <h1 className=" text-md font-medium">Technical Skill </h1>
              <ul className="flex justify-start py-2">
                <li className='flex'>
                {
                  [...Array(5)].map((star,index)=>{
                    index += 1;
                    return (
                      <ReviewStar
                        // className={`${index <= (hover || rating) ? "text-white" : "text-black"} cursor-pointer`}
                        index={index}
                        setRating={setTechnicalReview}
                        rating={technicalReview}
                      />
                    );
                  })
                }
                </li>
              </ul>
            </div>
            <hr className='mx-4' />
            <div className="lg:col-span-4 px-3 md:col-span-4 sm:col-span-4 mt-2 mx-1">
              <h1 className=" text-md font-medium">Communication Skill </h1>
              <ul className="flex justify-start py-2 text-black">
                <li className='flex'>
                {
                  [...Array(5)].map((star,index)=>{
                    index += 1;
                    return (
                      <ReviewStar
                        // className={`${index <= (hover || rating) ? "text-white" : "text-black"} cursor-pointer`}
                        index={index}
                        setRating={setCommunicationReview}
                        rating={communicationReview}
                      />
                    );
                  })
                }
                </li>
              </ul>
            </div>
          <hr className='mx-4'/>
          <hr className='mx-4'/>
          <div className="lg:col-span-4 px-3 md:col-span-4 sm:col-span-4 mt-2 mx-1">
              <h1 className=" text-xl font-medium">Review </h1>
          </div>
          <div className="lg:col-span-4 px-2 md:col-span-4 sm:col-span-4  mx-1">
            <div className="inline-flex justify-self-end cursor-pointer items-center mb-3 col-span-3">
              {
                reviewData && reviewData?.map((option)=>(
                  <img key={option?.id} src={option?.image} alt={option?.alt} className={`h-10 mx-2 w-10  hover:-translate-y-1 hover:scale-125  duration-300 ${review !== option?.id ?"opacity-50":""}`} onClick={() => setReview(option?.rating)}></img>
                ))
              }
            </div>
          </div>
          <div className="lg:col-span-4 px-3 py-2 md:col-span-4 sm:col-span-4 mx-1">
              <textarea onChange={(e)=>setComment(e.target.value)} className="form-textarea mt-1 block w-full shadow rounded  border pt-4 pl-3" rows="2" placeholder="Any Remarks"></textarea>
          </div>
          <div className="flex justify-between items-center p-3 px-4 border-t border-solid border-slate-200 rounded-b">
            <button
              className="bg-gray-700 text-sm shadow-lg rounded-md text-white py-3 flex px-6 "
              type="button"
              onClick={handleSubmit}
            >
              Submit
              <AiOutlineRightCircle className="text-lg mx-1 text-white" fill='white' color='white' />
            </button>
            <button onClick={async()=>{
              const request = await fetch(`${process.env.REACT_APP_API_URL}job-applications/archiveJobApplication/${interviewReviewData?.candidate_id}`,{
                method:'post',
                headers:{
                  'Authorization':`${authorize}`
                }
              })
              const response = await request?.json()
              // console.log('Response',response)
              if(response?.code === 200){
                setInterviewReview(false)
                getData()
              }
            }} 
            className='bg-cyan-700 text-sm items-center shadow-lg rounded-md text-white py-3 flex px-6'>
              <RiInboxArchiveLine className="text-lg mx-1"/>
              Archive
            </button>
          </div>
              </>:null
            }
            </>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}


export default InterviewReview;