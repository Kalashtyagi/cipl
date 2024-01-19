import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddFeedback = () => {
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
  const [rating, setRating] = useState(null);
  const [candidate, setCandidate] = useState([]);

  const navigate = useNavigate();

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

  const candidateUrl = `${process.env.REACT_APP_API_URL}/candidate`;

  const data = localStorage.getItem("data");
  const jsonData = JSON.parse(data);
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;

  const rating_arr = [
    {
      name: "Poor",
      emoji: "🤮",
    },

    {
      name: "Fair",
      emoji: "😒",
    },

    {
      name: "Average",
      emoji: "😐",
    },

    {
      name: "Good",
      emoji: "🙂",
    },
    {
      name: "Excellent",
      emoji: "🔥",
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
        setCandidate(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    callApi();
  }, []);

  useEffect(() => {
    document.title = "CIPLCRM | Add Interview Feedback";
  }, []);

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
        `${process.env.REACT_APP_API_URL}job-applications/rating/${candidatedetails.id}`,
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

  const options = [];

  candidate?.map((ele) => {
    options.push({
      value: ele.full_name,
      label: ele.full_name,
    });
  });

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
        <h1 className="text-2xl text-left ">Add Interview Feedback</h1>
        <Select
          options={options}
          placeholder="Select Candidate..."
          className="mt-3"
          onChange={handleChange}
        />
        <form onSubmit={handleSubmit}>
          <div className=" w-full flex py-4 items-center">
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Name of Candidate</label>
                <input
                  type="text"
                  maxLength={50}
                  className="border  w-full px-2 py-2"
                  placeholder={"Name of Candidate"}
                  onChange={handleCandidate}
                  name="name"
                  value={candidatedetails.name}
                />
              </div>
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Position</label>
                <input
                  type="text"
                  maxLength={50}
                  className="border  w-full px-2 py-2"
                  placeholder={"Position"}
                  name="position"
                  onChange={handleCandidate}
                  value={candidatedetails.position}
                />
              </div>

              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Department</label>
                <input
                  type="text"
                  maxLength={50}
                  className="border  w-full px-2 py-2"
                  placeholder={"Department"}
                  onChange={handleCandidate}
                  name="department"
                  value={candidatedetails.department}
                />
              </div>
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Location</label>
                <input
                  type="text"
                  maxLength={50}
                  className="border  w-full px-2 py-2"
                  name="location"
                  onChange={handleCandidate}
                  value={candidatedetails.location}
                  placeholder={"Location"}
                />
              </div>

              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Highest Qualification</label>
                <input
                  type="text"
                  maxLength={50}
                  className="border  w-full px-2 py-2"
                  placeholder={"Highest Qualification"}
                  onChange={handleCandidate}
                  value={candidatedetails.highest_qualification}
                  name="highest_qualification"
                />
              </div>
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Years of experience</label>
                <input
                  type="text"
                  maxLength={50}
                  className="border  w-full px-2 py-2"
                  placeholder={"Years of experience"}
                  onChange={handleCandidate}
                  value={candidatedetails.years_of_experience}
                  name="years_of_experience"
                />
              </div>

              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Date of Interview</label>
                <input
                  type="text"
                  maxLength={50}
                  className="border  w-full px-2 py-2"
                  placeholder={"Date of Interview"}
                  onChange={handleCandidate}
                  value={candidatedetails.date_of_interview}
                  name="date_of_interview"
                />
              </div>

              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Time of Interview</label>
                <input
                  type="text"
                  maxLength={50}
                  className="border  w-full px-2 py-2"
                  placeholder={"Time of Interview"}
                  onChange={handleCandidate}
                  value={candidatedetails?.time_of_interview}
                  name="highest_qualification"
                />
              </div>
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">Mode of Interview</label>
                <input
                  type="text"
                  maxLength={50}
                  className="border  w-full px-2 py-2"
                  placeholder={"Mode of Interview"}
                  onChange={handleCandidate}
                  value={candidatedetails.mode_of_interview}
                  name="mode_of_interview"
                />
              </div>
            </div>
          </div>

          <h1 className="text-lg text-left">Ratings</h1>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">OVERALL PERSONALITY</label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valPERSONALITY == index + 1
                      ? {
                          color: "red",
                          fontWeight: 600,
                        }
                      : null
                  }
                  onClick={() => handleRatingPERSONALITY(index)}
                >
                  {ele.name}
                  <span className="text-lg">{ele.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">POISE / MANNERISM</label>
            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valPOISE == index + 1
                      ? {
                          color: "red",
                          fontWeight: 600,
                        }
                      : null
                  }
                  onClick={() => handleRatingPOISE(index)}
                >
                  {ele.name}
                  <span className="text-lg">{ele.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">
              KNOWLEDGE OF SUBJECT/ JOB/ PRODUCT
            </label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valKNOWLEDGE == index + 1
                      ? {
                          color: "red",
                          fontWeight: 600,
                        }
                      : null
                  }
                  onClick={() => handleRatingKNOWLEDGE(index)}
                >
                  {ele.name}
                  <span className="text-lg">{ele.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">COMPREHENSIBILITY & ELOQUENCE</label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valCOMPREHENSIBILITY == index + 1
                      ? {
                          color: "red",
                          fontWeight: 600,
                        }
                      : null
                  }
                  onClick={() => handleRatingCOMPREHENSIBILITY(index)}
                >
                  {ele.name}
                  <span className="text-lg">{ele.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">MATURITY & UNDERSTANDING</label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valMATURITY == index + 1
                      ? {
                          color: "red",
                          fontWeight: 600,
                        }
                      : null
                  }
                  onClick={() => handleRatingMATURITY(index)}
                >
                  {ele.name}
                  <span className="text-lg">{ele.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">PERSONAL EFFICACY</label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valPERSONAL == index + 1
                      ? {
                          color: "red",
                          fontWeight: 600,
                        }
                      : null
                  }
                  onClick={() => handleRatingPERSONAL(index)}
                >
                  {ele.name}
                  <span className="text-lg">{ele.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">LEADERSHIP POTENTIAL</label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valLEADERSHIP == index + 1
                      ? {
                          color: "red",
                          fontWeight: 600,
                        }
                      : null
                  }
                  onClick={() => handleRatingLEADERSHIP(index)}
                >
                  {ele.name}
                  <span className="text-lg">{ele.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">DRIVE</label>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valDRIVE == index + 1
                      ? {
                          color: "red",
                          fontWeight: 600,
                        }
                      : null
                  }
                  onClick={() => handleRatingDRIVE(index)}
                >
                  {ele.name}
                  <span className="text-lg">{ele.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <label className="flex pr-1">OPENNESS TO FEEDBACK</label>
            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valOPENNESS == index + 1
                      ? {
                          color: "red",
                          fontWeight: 600,
                        }
                      : null
                  }
                  onClick={() => handleRatingOPENNESS(index)}
                >
                  {ele.name}
                  <span className="text-lg">{ele.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2 mt-5">
            <div>
              <label className="flex pr-1">SELF CONCEPT</label>
            </div>

            <div className="flex justify-between">
              {rating_arr.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valSELF == index + 1
                      ? {
                          color: "red",
                          fontWeight: 600,
                        }
                      : null
                  }
                  onClick={() => handleRatingSELF(index)}
                >
                  {ele.name}
                  <span className="text-lg">{ele.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mr-1 grid grid-cols-2  mt-5">
            <div>
              <label className="flex pr-1">MOBILITY</label>
            </div>

            <div className="flex justify-between">
              {rating_arr?.map((ele, index) => (
                <div
                  key={index}
                  className="ml-5 rating_feedback"
                  style={
                    valMOBILITY == index + 1
                      ? {
                          color: "red",
                          fontWeight: 600,
                        }
                      : null
                  }
                  onClick={() => handleRatingMOBILITY(index)}
                >
                  {ele.name}
                  <span className="text-lg">{ele.emoji}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="flex my-4 transition-all delay-150 duration-150 px-8 py-2 rounded text-white bg-green-700 hover:bg-green-500"
          >
            <span className="text-xl font-medium">Save</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddFeedback;
