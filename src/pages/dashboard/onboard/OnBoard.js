import Swal from 'sweetalert2'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaUserAltSlash } from "react-icons/fa";
import Table from "../../../components/Table";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { ToastContainer, toast } from 'react-toastify';
import DOMPurify from 'dompurify';

const OnBoard = () => {
  const [onboardList, setOnboardList] = useState("");
  const [showEditButton, setShowEditButton] = useState(false)
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [search, setSearch] = useState("")
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showModalId, setShowModalId] = useState('')
  const [showMessage, setShowMessage] = useState('')
  const [showMessagePopup, setShowMessagePopup] = useState(false)
  const [selectedType, setSelectedType] = useState("inhouse");
  const baseUrl = process.env.REACT_APP_API_URL;

  const handleRadioChange = (e) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}onboard-list/${selectedType}`, {
          headers: { 'Authorization': `${authorize}` },
        });
        if (response?.data?.code === 200) {
          setOnboardList(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        // handle error
      }
    };

    fetchData();
  }, [selectedType]);

  const handleChangeOnboard = async (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Decline Onboarding',
      text: 'Did you really want to reject employee?',
      icon: 'info',
      confirmButtonText: 'Yes',
      denyButtonText: 'Cancel',
      showDenyButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value: text } = await Swal.fire({
          input: 'textarea',
          inputLabel: 'Reason',
          inputPlaceholder: 'Type your reason here...',
          inputAttributes: {
            'aria-label': 'Type your Reason here'
          },
        })

        if (text) {
          console.log(text)
          try {
            const formData = new FormData()
            formData.append('cancel_reason', text)
            const request = await axios.postForm(`${process.env.REACT_APP_API_URL}onboard-statuschange/${showModalId}`, formData, {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
              }
            })
            const response = await request?.data
            if (response?.code === 200) {
              toast.success(`${response?.message}`)
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
      } if (result.isDenied) {
        Swal.fire('Cancelled!', '', 'error')
      }
    })
  }
  //   console.log("baseurl", baseUrl);
  const data = localStorage.getItem("data");
  const jsonData = JSON.parse(data);
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;
  const navigate = useNavigate()
  const location = useLocation()

  const getData = async () => {
    const getApiData = await axios.get(`${baseUrl}onboard-list/${selectedType}`, {
      headers: {
        'Authorization': `${authorize}`,
      },
    });
    const apiResonse = await getApiData?.data;
    console.log("API Response", apiResonse)
    if (apiResonse?.code === 200) {
      setOnboardList(apiResonse?.data);
    } else {
      console.log("Api Response", apiResonse)
    }
    console.log("API Response", apiResonse.data);
  };

  useEffect(() => {
    getData();
    document.title = "CIPLCRM | Onboard"
  }, []);

  useEffect(() => {
    if (jsonData?.data?.userPermissions.find(a => a === "edit_category")) {
      setShowEditButton(true)
    }
    else {
      setShowEditButton(false)
    }
    (jsonData?.data?.userPermissions.find(a => a === "delete_category")) ? setShowDeleteButton(true) : setShowDeleteButton(false)
  }, [showEditButton, showDeleteButton])

  useEffect(() => {
    if (jsonData?.data?.userPermissions.find(a => a === "view_category")) {
      return
    } else {
      navigate('/admin')
    }

  }, [location])

  const tableHeading = [
    {
      name: 'S. No.',
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: 'Name',
      selector: row => row?.full_name,
      sortable: false,
    },
    {
      name: 'ERF ID',
      selector: row => <div className='max-w-12 capitalize'>{row?.erf_id}</div>,
      sortable: false,
    },
    {
      name: 'Location',
      selector: row => <div className=' capitalize'>{row?.location}</div>,
      sortable: false,
    },
    {
      name: 'Reject Reason',
      selector: row =>
        <div className='w-16 h-4'>
          <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row?.cancel_reason) }}></span>
        </div>,
      sortable: false,
    },
    {
      name: 'Hiring Status',
      selector: row => row?.hired_status,
      sortable: false,
      maxWidth: 'content'
    },
    {
      name: 'Joining Date',
      // selector: row => {moment().format('YYYY-MM-DD', row?.joining_date)},
      // selector: (row) => moment(row?.joining_date).utc().format("DD-MM-YYYY"),
      selector: (row) => moment(row?.joining_date, "DD/MM/YYYY").utc('+530').format("DD-MM-YYYY"),


      // selector: (row) => moment(row?.joining_date, "YYYY-MM-DD").utc().format("DD-MM-YYYY"),

      sortable: false,
      maxWidth: 'content'
    },
    {
      name: 'Action',
      selector: row => (
        <div className="">
          {
            row?.hired_status === "accepted" ?
              <button>
                <FaUserAltSlash
                  onClick={(e) => {
                    setShowModalId(row?.id)
                    handleChangeOnboard(e)
                    setShowStatusModal(!showStatusModal)
                  }}
                  size={30}
                  className="bg-primary text-white m-1 w-6 p-1 h-6 hover:cursor-pointer"
                  title='Decline'
                />
              </button>
              : null
          }
          <button onClick={() => {
            setShowMessagePopup(true)
            setShowMessage(row?.message)
          }}>
            <FaEye
              size={30}
              className="bg-primary text-white m-1 w-6 p-1 h-6 hover:cursor-pointer"
              title='View'
            />
          </button>
        </div>
      ),
      sortable: false,
    },
  ];
  const filterData = onboardList && onboardList?.filter((board) => board?.full_name?.toLowerCase().includes(search))
  console.log("filtered data", filterData)
  console.log("search", search)
  return (
    <div>
      <ToastContainer position='top-center' />

      {
        showMessagePopup ?
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none view_onboard" Style={{ height: '300px' }}>
              <div className="relative w-auto my-6 mx-auto max-w-3xl" style={{ paddingTop: '100px' }}>
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                      Message/ Remarks
                    </h3>
                    <button
                      className="p-1 ml-auto border-0 text-red-500  float-right text-3xl leading-none font-semibold "
                      onClick={() => setShowMessagePopup(false)}
                    >
                      <span className=" text-red-500 h-6 w-6 text-xl block ">
                        X
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="py-3 px-1">
                    <section className="px-1 mx-4 ">
                      <div className="full">
                        <label className="block">
                          <div className='p-1 px-2' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(showMessage) }}></div>
                        </label>
                      </div>
                    </section>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center"
                      onClick={() => {
                        setShowMessagePopup(false)
                        setShowMessage('')
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
          : null
      }

      <div className=" mx-6 my-2 ">
        <label >
          <input
            type="radio"
            value="inhouse"
            name="btn"
            checked={selectedType === "inhouse"}
            onChange={handleRadioChange}

          />
          <span className=' px-1 font-medium text-lg '>Inhouse</span>
        </label>

        <label className="mx-2">
          <input
            type="radio"
            value="onsite"
            name="btn"
            checked={selectedType === "onsite"}
            onChange={handleRadioChange}

          />
          <span className='px-1 font-medium text-lg '>Project</span>
        </label>
      </div>


      <div className="mt-4 px-4 border border-gray-800 border-t-4 bg-white mx-4">
        <div className="flex flex-col">
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
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
              </div>
            </div>
            <div className="lg:p-1.5  mb-4 pt-2 w-full inline-block align-middle">
              <div className="overflow-hidden border  rounded-lg">
                <Table columns={tableHeading} data={filterData} searchItem={search} />

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Alert /> */}
    </div>
  );
}

export default OnBoard