import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import moment from "moment";


const data = localStorage.getItem("data");
const jsonData = JSON.parse(data);
const accessToken = jsonData?.access_token;
const authorize = "Bearer" + " " + accessToken;

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

const Index = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

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
  const [totalRating, setTotalRating] = useState(null);
  const [valMOBILITY, setValMOBILITY] = useState(null);
  const [rating, setRating] = useState(null);
  const [interview_round1, setInterviewround1] = useState({});
  const [comments, setComments] = useState("");

  const navigate = useNavigate();

  const handleSend = () => {
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
    setTotalRating(Math.round(gain_rating / 55));

    axios
      .post(
        `${process.env.REACT_APP_API_URL}job-applications/rating/${data.id}`,
        {
          tottal_rating: Math.round(gain_rating / 55),
          interviewround: "interview round 2",
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
          comments: comments,
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
        setTimeout(() => {
          window.open("about:blank", "_self");
          window.close();
        }, 4000);
        clearTimeout();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data.message?.interviewround[0]);
        setTimeout(() => {
          window.open("about:blank", "_self");
          window.close();
        }, 4000);
        clearTimeout();
      });
  };

  console.log(interview_round1);

  const handleRatingPERSONALITY = (val) => {
    setValPERSONALITY(val + 1);
  };

  const handleRatingPOISE = (val) => {
    setValPOISE(val + 1);
  };

  const handleRatingKNOWLEDGE = (val) => {
    setValKNOWLEDGE(val + 1);
  };

  const handleRatingCOMPREHENSIBILITY = (val) => {
    setValCOMPREHENSIBILITY(val + 1);
  };

  const handleRatingMATURITY = (val) => {
    setValMATURITY(val + 1);
  };

  const handleRatingPERSONAL = (val) => {
    setValPERSONAL(val + 1);
  };

  const handleRatingMOBILITY = (val) => {
    setValMOBILITY(val + 1);
  };

  const handleRatingSELF = (val) => {
    setValSELF(val + 1);
  };

  const handleRatingOPENNESS = (val) => {
    setValOPENNESS(val + 1);
  };

  const handleRatingDRIVE = (val) => {
    setValDRIVE(val + 1);
  };

  const handleRatingLEADERSHIP = (val) => {
    setValLEADERSHIP(val + 1);
  };

  useEffect(() => {
    async function callApi() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}getratinglink/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${authorize}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data.data[0]);
        setData(data.data[0]);
        setInterviewround1(
          data.data[0].interviews.filter(
            (ele) => ele.status == "interview round 2"
          )[0]
        );
      } catch (error) {
        console.error("Error:", error);
      }
    }

    callApi();
  }, []);

  return (
    <>
      <div className="max-w-[100%] px-4 text-left md:py-[80] py-5  bg-gray-800">
        <img src={logo} className="w-24" />
      </div>

      <div className="border rounded border-t-2 border-r-gray-400 border-l-gray-400 border-b-gray-400 border-gray-800 p-4 mx-4 my-2 bg-white">
        <h1 className="text-2xl text-left ">Interview Feedback</h1>

        <form>
          <div className=" w-full flex py-4 items-center">
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Name of Candidate</label>
                <div className="border  w-full px-2 py-2">
                  {data?.full_name}
                </div>
              </div>
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Position</label>
                <div className="border  w-full px-2 py-2">
                  {data?.recruitment?.degination}
                </div>
              </div>

              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Department</label>
                <div className="border  w-full px-2 py-2">
                  {data?.job?.department.name}
                </div>
              </div>
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Location</label>
                <div className="border  w-full px-2 py-2">{data?.address}</div>
              </div>

              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Highest Qualification</label>
                <div className="border  w-full px-2 py-2">
                  {data?.qualification?.name}
                </div>
              </div>
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Years of experience</label>
                <div className="border  w-full px-2 py-2">
                  {data?.total_exp}
                </div>
              </div>

              {/* <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Date of Interview</label>
                <div className="border  w-full px-2 py-2">
                  {interview_round1?.schedule_date != undefined &&
                    new Date(interview_round1?.schedule_date)
                      ?.toISOString()
                      ?.split("T")[0]}
                </div>
              </div> */}
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Date of Interview</label>
                <div className="border w-full px-2 py-2">
                  {interview_round1?.schedule_date &&
                    moment(interview_round1?.schedule_date)
                      .utc()
                      .format("YYYY-MM-DD")}
                </div>
              </div>

              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Time of Interview</label>
                <div className="border  w-full px-2 py-2">
                  {interview_round1?.schedule_date != undefined &&
                    new Date(
                      interview_round1?.schedule_date
                    )?.toLocaleTimeString()}
                </div>
              </div>
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Mode of Interview</label>
                <div className="border  w-full px-2 py-2">
                  {interview_round1?.interview_type}
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
                  onClick={() => handleRatingPERSONALITY(index)}
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
                  onClick={() => handleRatingPOISE(index)}
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
                  onClick={() => handleRatingKNOWLEDGE(index)}
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
                  onClick={() => handleRatingCOMPREHENSIBILITY(index)}
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
              MATURITY & UNDERSTANDING (Shows conceptualization & analytical
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
                  onClick={() => handleRatingMATURITY(index)}
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
                  onClick={() => handleRatingPERSONAL(index)}
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
                  onClick={() => handleRatingLEADERSHIP(index)}
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
                  onClick={() => handleRatingDRIVE(index)}
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
                  onClick={() => handleRatingOPENNESS(index)}
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
                  onClick={() => handleRatingSELF(index)}
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
                  onClick={() => handleRatingMOBILITY(index)}
                >
                  {ele.name}
                  <span className="ml-1">{ele.emoji}</span>
                  <span className="fa fa-star ml-1"></span>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-2">
              <div className="w-full">
                <label className="flex pr-1">Comments (if any)</label>
                <textarea
                  type="text"
                  className="border w-full px-2 py-2 mt-2"
                  style={{ border: "2px solid #2d2b30" }}
                  onChange={(e) => setComments(e.target.value.trim())}
                ></textarea>
              </div>
            </div>

            <div className="w-full text-center  mr-[-36rem] mt-4">
                <label className="flex pr-1 justify-center">Overall Rating</label>
                <input type="number" className="border px-10 py-2 mt-2" min="1" max="5" value ={totalRating} />
            </div>


          
          </div>
          <button
            type="button"
            onClick={handleSend}
            className="flex my-4 transition-all delay-150 duration-150 px-8 py-2 rounded text-white bg-green-700 hover:bg-green-500"
          >
            <span className="text-xl font-medium">Send</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Index;
