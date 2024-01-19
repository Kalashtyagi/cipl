import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import DataTable from "react-data-table-component";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

// const candidateUrl = `${process.env.REACT_APP_API_URL}candidatelist`;

const data = localStorage.getItem("data");
const jsonData = JSON.parse(data);
const accessToken = jsonData?.access_token;
const authorize = "Bearer" + " " + accessToken;

const Feedback = () => {
  const [serach, setSearch] = useState("");
  const [candidate, setCandidate] = useState([]);
  const [candidateback, setCandidateback] = useState([]);

  const [filterData, setFilterDate] = useState([]);

  const [interview, setInterview] = useState("interview round 1");
  const [showModalId, setShowModalId] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [toggle, setToggle] = useState(false);

  localStorage.setItem("interview", JSON.stringify(interview));

  console.log(candidate);

  const handleSelected = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}job-application-list/selected-application/${id}`,
        {
          status: interview == "interview round 1" ? 21 : 22,
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
        setToggle(!toggle);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRejected = (id) => {
    console.log(id);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}job-application-list/reject/${id}`,
        {
          status: interview == "interview round 1" ? 23 : 24,
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
        setToggle(!toggle);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   setFilterDate(
  //     candidate.filter((ele) => {
  //       return ele?.totalrating[0]?.interviewround == interview;
  //     })
  //   );

  //   console.log("71", interview);
  //   console.log("fired");
  // }, [interview, toggle]);

  //   useEffect(()=>{
  //  setFilterDate([...filterData])
  //   },[toggle])

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();

    setCandidate(
      candidate.filter((ele) =>
        ele.full_name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    const searchData = candidate.filter((ele) => {
      return ele.totalrating[0].interviewround === interview;
    });
    const filteredData = searchData.filter((ele) =>
      ele.full_name.toLowerCase().includes(searchValue)
    );
    setFilterDate(filteredData);

    if (e.target.value.length <= 1) {
      setCandidate(candidateback);
    }
  };

  const handleChangeRejected = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Decline",
      text: "Did you really want to reject employee?",
      icon: "info",
      confirmButtonText: "Yes",
      denyButtonText: "Cancel",
      showDenyButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value: text } = await Swal.fire({
          input: "textarea",
          inputLabel: "Reason",
          inputPlaceholder: "Type your reason here...",
          inputAttributes: {
            "aria-label": "Type your Reason here",
          },
        });

        if (text) {
          console.log(text);
          try {
            const request = await axios.postForm(
              `${process.env.REACT_APP_API_URL}job-application-list/reject/${id}`,
              {
                status: interview == "interview round 1" ? 23 : 24,
                cancel_reason: text,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  Accept: "application/json",
                },
              }
            );
            const response = await request?.data;
            if (response?.code === 200) {
              toast.success(`${response?.message}`);
            }
          } catch (error) {
            console.log("error", error);
            if (error?.response?.data?.error) {
              const errors = Object.values(error?.response?.data?.error);
              console.log("Errors", errors);
              errors.map((x) => toast.error(`${x}`));
            }
            if (error?.response?.data?.message) {
              if (error?.response?.data?.error) {
                const errors = Object.values(error?.response?.data?.error);
                console.log("Errors", errors);
                errors.map((x) => toast.error(`${x}`));
              }
              if (error?.response?.data?.message) {
                toast.error(`${error?.response?.data?.message}`);
              }
            }
          }
        }
      }
      if (result.isDenied) {
        Swal.fire("Cancelled!", "", "error");
      }
    });
  };

  const tableHeading = [
    {
      name: "Name of Candidate",
      selector: (row) => {
        return (
          <strong style={{ cursor: "pointer" }}>
            <Link to={`/admin/feedback/${row.jobapplication_id}`}>
              {row.full_name}
            </Link>
          </strong>
        );
      },
    },
    {
      name: "Position",
      selector: (row) => row.degination,
    },
    {
      name: "Location",
      selector: (row) => row.location,
    },
    {
      name: "Status",
      selector: (row) =>
        row.interviewround.replace(/\b\w/g, (char) => char.toUpperCase()),
    },
    {
      name: "Ratings ",
      selector: (row) => `${row.tottal_rating} (Out of 5)`,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            type="button"
            className="flex my-4 transition-all delay-150 duration-150 px-2 py-2 rounded text-white bg-red-700 hover:bg-green-500"
            // onClick={() => handleRejected(row?.jobapplication_id)}
            onClick={(e) => handleChangeRejected(e, row?.jobapplication_id)}
          >
            <span className="text">Reject</span>
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    document.title = "CIPLCRM | Interview Feedback";
  }, []);

  const handleCallApiRound1 = () => {
    setInterview("interview round 1");
  };
  
  const handleCallApiRound2 = () => {
    setInterview("interview round 2");
  };

  useEffect(() => {
    async function callApi() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}ratinglistround/${interview}`,
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
        console.log("239", data.data);
        setCandidate(data.data);
        setFilterDate(data.data);
        setCandidateback(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    callApi();
  }, [interview]);

  // const handleSearch = (e) => {
  //   setCandidate(
  //     candidate.filter((ele) =>
  //       ele.full_name.toLowerCase().includes(e.target.value.toLowerCase())
  //     )
  //   );

  //   if (e.target.value.length <= 1) {
  //     setCandidate(candidateback);
  //   }
  // };

  return (
    <>
      <section>
        {/* <button className="px-2 flex bg-gray-800 hover:bg-slate-700 text-white m-2 py-2 items-center rounded ml-4">
          <span className="px-1">
            <AiFillPlusCircle />
          </span>
          <Link to={"/admin/Addfeedback"}>Add Interview Feedback</Link>
        </button> */}

        <div className="mt-4 px-4 border border-gray-800 border-t-4 bg-white mx-4">
          <div className="flex flex-col">
            <div className="flex">
              <button
                className={`px-2 flex ${interview == "interview round 1"
                    ? "bg-green-600"
                    : "bg-gray-800"
                  }  text-white m-2 py-2 items-center rounded`}
                onClick={handleCallApiRound1}
              >
                Interview Round 1
              </button>

              <button
                className={`px-2 flex ${interview == "interview round 2"
                    ? "bg-green-600"
                    : "bg-gray-800"
                  } text-white m-2 py-2 items-center rounded`}
                onClick={handleCallApiRound2}
              >
                Interview Round 2
              </button>
            </div>

            <div className="overflow-x-auto">
              <div className="py-3 flex justify-end pr-2">
                <div className="relative max-w-xs flex items-center justify-end">
                  <label htmlFor="hs-table-search" className="px-2">
                    Search:
                  </label>
                  <input
                    type="text"
                    className="block w-full p-3 border text-sm border-gray-300 rounded-md "
                    placeholder="Search..."
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className="lg:p-1.5  mb-4 pt-2 w-full inline-block align-middle">
                <div className="overflow-hidden border  rounded-lg">
                  <DataTable
                    columns={tableHeading}
                    data={filterData}
                    pagination
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feedback;
