import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const InterviewFeedback = () => {
  const [valPERSONALITY, setValPERSONALITY] = useState(null);
  const [valPOISE, setValPOISE] = useState(null);
  const [valKNOWLEDGE, setValKNOWLEDGE] = useState(null);
  const [valCOMPREHENSIBILITY, setValCOMPREHENSIBILITY] = useState(null);
  const [valMATURITY, setValMATURITY] = useState(null);
  const [valPERSONAL, setValPERSONAL] = useState(null);
  const [valLEADERSHIP, setValLEADERSHIP] = useState(null);
  const [valDRIVE, setValDRIVE] = useState(null);
  const [valOPENNESS, setValOPENNESS] = useState(null);
  const [valSELF, setValSELF] = useState(null);
  const [valMOBILITY, setValMOBILITY] = useState(null);
  const [candidate, setCandidate] = useState([]);
  const [candidatelist, setCandidatelist] = useState([]);
  const [comment, setComment] = useState([]);
  const [totalrating, setTotalrating] = useState([]);
  
  

  console.log(candidate);

  const navigate = useNavigate();
  const { id } = useParams();

  const [candidatedetails, setCandidatedetails] = useState({
    id: "",
    status: "",
    name: "",
    position: "",
    department: "",
    location: "",
    highest_qualification: "",
    years_of_experience: "",
    date_of_interview: "",
    time_of_interview: "",
    mode_of_interview: "",
  });

  const handleCandidate = (e) => {
    setCandidate({ [e.target.name]: e.target.value });
  };

  const candidateUrl = `${process.env.REACT_APP_API_URL}candidatefilter/${id}`;

  const data = localStorage.getItem("data");
  const jsonData = JSON.parse(data);
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;

  const interview = localStorage.getItem("interview");

  let int = JSON.parse(interview);

  const rating_arr = [
    {
      name: "Poor",
      emoji: "1",
    },

    {
      name: "Fair",
      emoji: "2",
    },

    {
      name: "Average",
      emoji: "3",
    },

    {
      name: "Good",
      emoji: "4",
    },
    {
      name: "Excellent",
      emoji: "5",
    },
  ];

  useEffect(() => {
    async function callApi() {
      try {
        const response = await fetch(candidateUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authorize}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data.data);
        setCandidatelist(data.data);
        setCandidate(
          data.data[0].totalrating.find((ele) => ele?.interviewround == int)
        );
      } catch (error) {
        console.error("Error:", error);
      }
    }

    callApi();
  }, []);

  useEffect(() => {
    document.title = "CIPLCRM | Interview Feedback";
  }, []);

  useEffect(() => {
    setValMOBILITY(candidate.mobility);
    setValSELF(candidate.self_concept);
    setValOPENNESS(candidate.openness_to_feedback);
    setValDRIVE(candidate.drive);
    setValLEADERSHIP(candidate.leadership_potential);
    setValPERSONAL(candidate.personal_efficacy);
    setValMATURITY(candidate.maturity_understanding);
    setValCOMPREHENSIBILITY(candidate.comprehensibility_eloquence);
    setValKNOWLEDGE(candidate.knowledge_of_subject_job_product);
    setValPOISE(candidate.poise_mannerism);
    setValPERSONALITY(candidate.overall_personality);
    setComment(candidate.comments);
    setTotalrating(candidate.tottal_rating);
  }, [candidate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let rating =
      valPERSONALITY +
      valPOISE +
      valKNOWLEDGE +
      valCOMPREHENSIBILITY +
      valMATURITY +
      valPERSONAL +
      valMOBILITY +
      valSELF +
      valOPENNESS +
      valDRIVE +
      valLEADERSHIP;

    let gain_rating = rating * 5;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}rating/${candidatedetails.id}`,
        {
          tottal_rating: Math.round(gain_rating / 55),
          interviewround: candidatedetails.status,
          poise_mannerism: valPOISE,
          knowledge_of_subject_job_product: valKNOWLEDGE,
          comprehensibility_eloquence: valCOMPREHENSIBILITY,
          maturity_understanding: valMATURITY,
          personal_efficacy: valPERSONAL,
          leadership_potential: valLEADERSHIP,
          drive: valDRIVE,
          openness_to_feedback: valOPENNESS,
          mobility: valMOBILITY,
          overall_personality: valPERSONALITY,
          self_concept: valSELF,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authorize}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        navigate("/admin/feedback");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (selectedOption) => {
    const singleData = candidate.find(
      (ele) => ele.full_name == selectedOption.value
    );

    console.log(singleData);

    setCandidatedetails({
      id: singleData.id,
      status: singleData.status.status,
      name: singleData.full_name,
      position: singleData.recruitment.degination,
      department: singleData.job.department.name,
      location: singleData.address,
      highest_qualification: singleData.qualification?.name,
      years_of_experience: singleData.total_exp,
      date_of_interview: new Date(singleData.interview.schedule_date)
        .toISOString()
        .split("T")[0],
      time_of_interview: new Date(
        singleData.interview.schedule_date
      ).toLocaleTimeString(),
      mode_of_interview: singleData.interview.interview_type,
    });
  };

  return (
    <>
      <div className="border rounded border-t-2 border-r-gray-400 border-l-gray-400 border-b-gray-400 border-gray-800 p-4 mx-4 my-2 bg-white">
        <h1 className="text-2xl text-left ">Interview Feedback</h1>

        <form onSubmit={handleSubmit}>
          <div className=" w-full flex py-4 items-center">
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Name of Candidate</label>
                <div className="border  w-full px-2 py-2">
                  {candidatelist[0]?.full_name}
                </div>
              </div>
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Position</label>
                <div className="border  w-full px-2 py-2">
                  {candidatelist[0]?.recruitment?.degination}
                </div>
              </div>

              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Department</label>
                <div className="border  w-full px-2 py-2">
                  {" "}
                  {candidatelist[0]?.job?.department?.name}
                </div>
              </div>

              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Location</label>

                <div className="border  w-full px-2 py-2">
                  {candidatelist[0]?.address != undefined &&
                    candidatelist[0]?.address}
                </div>
              </div>

              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Status</label>

                <div className="border  w-full px-2 py-2">{int}</div>
              </div>

              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Highest Qualification</label>
                <div className="border  w-full px-2 py-2">
                  {candidatelist[0]?.qualification?.name}
                </div>
              </div>
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Years of experience</label>
                <div className="border  w-full px-2 py-2">
                  {candidatelist[0]?.total_exp}
                </div>
              </div>

              {/* <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Date of Interview</label>
                <div className="border  w-full px-2 py-2">
                  {candidatelist[0]?.interviews[0]?.schedule_date !=
                    undefined &&
                    new Date(candidatelist[0].interviews[0].schedule_date)
                      .toISOString()
                      .split("T")[0]}
                </div>
              </div> */}

              <div className="w-full mr-1">
                  <label className="flex pr-1 mb-2">Date of Interview</label>
                  <div className="border w-full px-2 py-2">
                    {candidatelist[0]?.interviews[0]?.schedule_date &&
                      moment(candidatelist[0]?.interviews[0]?.schedule_date)
                        .utc()
                        .format("DD-MM-YYYY")}
                  </div>
              </div>

              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Time of Interview</label>

                <div className="border  w-full px-2 py-2">
                  {candidatelist[0]?.interviews[0]?.schedule_date !=
                    undefined &&
                    new Date(
                      candidatelist[0]?.interviews[0]?.schedule_date
                    )?.toLocaleTimeString()}
                </div>
              </div>
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Mode of Interview</label>
                <div className="border  w-full px-2 py-2">
                  {candidatelist[0]?.interviews[0]?.interview_type}
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-lg text-left">Ratings</h1>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">
              OVERALL PERSONALITY (presentable, smart, well dressed, well
              groomed / attitude)
            </label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valPERSONALITY == index + 1
                      ? {
                          color: "#FFD700",
                          fontWeight: 600,
                        }
                      : null
                  }
                  // onClick={() => handleRatingPERSONALITY(index)}
                >
                  {ele.name}
                  <span className="ml-1">{ele.emoji}</span>
                  <span className="fa fa-star ml-1"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">
              POISE / MANNERISM (Postures and behavior are an indicator of
              confidence, assertion)
            </label>
            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valPOISE == index + 1
                      ? {
                          color: "#FFD700",
                          fontWeight: 600,
                        }
                      : null
                  }
                  // onClick={() => handleRatingPOISE(index)}
                >
                  {ele.name}
                  <span className="ml-1">{ele.emoji}</span>{" "}
                  <span className="fa fa-star ml-1"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">
              KNOWLEDGE OF SUBJECT/ JOB/ PRODUCT (Concept and grasp)
            </label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valKNOWLEDGE == index + 1
                      ? {
                          color: "#FFD700",
                          fontWeight: 600,
                        }
                      : null
                  }
                  // onClick={() => handleRatingKNOWLEDGE(index)}
                >
                  {ele.name}
                  <span className="ml-1">{ele.emoji}</span>
                  <span className="fa fa-star ml-1"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">
              COMPREHENSIBILITY & ELOQUENCE (Shows clarity of thought, ideas and
              communication)
            </label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valCOMPREHENSIBILITY == index + 1
                      ? {
                          color: "#FFD700",
                          fontWeight: 600,
                        }
                      : null
                  }
                  // onClick={() => handleRatingCOMPREHENSIBILITY(index)}
                >
                  {ele.name}
                  <span className="ml-1">{ele.emoji}</span>
                  <span className="fa fa-star ml-1"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">
              MATURITY & UNDERSTANDING G (Shows conceptualization & analytical
              ability, intelligence, problem-solving ability)
            </label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valMATURITY == index + 1
                      ? {
                          color: "#FFD700",
                          fontWeight: 600,
                        }
                      : null
                  }
                  // onClick={() => handleRatingMATURITY(index)}
                >
                  {ele.name}
                  <span className="ml-1">{ele.emoji}</span>
                  <span className="fa fa-star ml-1"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">
              PERSONAL EFFICACY (Clarity of future goals - shows direction in
              life and orientation for success)
            </label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valPERSONAL == index + 1
                      ? {
                          color: "#FFD700",
                          fontWeight: 600,
                        }
                      : null
                  }
                  // onClick={() => handleRatingPERSONAL(index)}
                >
                  {ele.name}
                  <span className="ml-1">{ele.emoji}</span>
                  <span className="fa fa-star ml-1"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">
              LEADERSHIP POTENTIAL (Potential to take initiative and influence
              behavior){" "}
            </label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valLEADERSHIP == index + 1
                      ? {
                          color: "#FFD700",
                          fontWeight: 600,
                        }
                      : null
                  }
                  // onClick={() => handleRatingLEADERSHIP(index)}
                >
                  {ele.name}
                  <span className="ml-1">{ele.emoji}</span>
                  <span className="fa fa-star ml-1"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">
              DRIVE (Achievement Orientation - Goal)
            </label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valDRIVE == index + 1
                      ? {
                          color: "#FFD700",
                          fontWeight: 600,
                        }
                      : null
                  }
                  // onClick={() => handleRatingDRIVE(index)}
                >
                  {ele.name}
                  <span className="ml-1">{ele.emoji}</span>
                  <span className="fa fa-star ml-1"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">
              OPENNESS TO FEEDBACK K (Allows for adaptability and openness to
              change)
            </label>
            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valOPENNESS == index + 1
                      ? {
                          color: "#FFD700",
                          fontWeight: 600,
                        }
                      : null
                  }
                  // onClick={() => handleRatingOPENNESS(index)}
                >
                  {ele.name}
                  <span className="ml-1">{ele.emoji}</span>
                  <span className="fa fa-star ml-1"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <div>
              <label className="flex pr-1">
                SELF CONCEPT T (Ability to express about 'Self' - shows
                confidence in self and communicability of the same)
              </label>
            </div>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valSELF == index + 1
                      ? {
                          color: "#FFD700",
                          fontWeight: 600,
                        }
                      : null
                  }
                  // onClick={() => handleRatingSELF(index)}
                >
                  {ele.name}
                  <span className="ml-1">{ele.emoji}</span>
                  <span className="fa fa-star ml-1"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2  mt-5">
            <div>
              <label className="flex pr-1">
                MOBILITY Y (Open to any location)
              </label>
            </div>

            <div className="flex justify-between">
              {rating_arr?.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valMOBILITY == index + 1
                      ? {
                          color: "#FFD700",
                          fontWeight: 600,
                        }
                      : null
                  }
                  // onClick={() => handleRatingMOBILITY(index)}
                >
                  {ele.name}
                  <span className="ml-1">{ele.emoji}</span>
                  <span className="fa fa-star ml-1"></span>
                </div>
              ))}
            </div>

            
            {/* <div className="flex justify-between mt-2">
              <div className="w-full">
                <label className="flex pr-1">Comments (if any)</label>

                <div className="border w-full px-2 py-2 mt-2">
                <textarea className="w-full" rows="4" placeholder="Type your comment here..."></textarea>
                </div>
              </div>

              <div className="w-full ml-50">
                <label className="flex pr-1">Overall Rating</label>
                <div className="border w-full px-2 py-2 mt-2">
                  <input type="number" className="w-full" placeholder="Enter your rating (1-5)" min="1" max="5" />
                </div>
              </div>
              
              
            </div> */}
            
            <div className="w-full mr-1 flex gap-4 mt-5 ">

                <div className="w-full">
                  <label className="flex pr-1">Comments (if any)</label>
                  <textarea
                    className="w-full px-2 py-2 mt-2 border"
                    rows="4"
                    value={comment}
                    readOnly // Set the readOnly attribute to make it read-only
                  ></textarea>
                </div>

                
                <div className="w-full text-center  mr-[-36rem] mt-4">
                  <label className="flex pr-1 justify-center">Overall Rating</label>
               
                  <input type="number" className="border px-10 py-2 mt-2" value={totalrating} min="1" max="5" readOnly />

                
                </div>
            </div>



          </div>
        </form>
      </div>
    </>
  );
};

export default InterviewFeedback;
