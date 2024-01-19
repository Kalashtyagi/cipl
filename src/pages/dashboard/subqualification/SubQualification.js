import React, { useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FiArrowRight } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '../../../components/Table';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const SubQualification = () => {
  const [subQualificationList, setSubQualificationList] = useState();
  const [shoeEditSubQualificationModal, setShowEditSubQualificationModal] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false)
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [search, setSearch] = useState('')
  const [editSubQualification, setEditSubQualification] = useState('')
  const [contentEdit, setContentEdit] = useState('')
  const data = localStorage.getItem("data");
  const [currentPage, setCurrentPage] = useState(1);

  const jsonData = JSON.parse(data);
  const accessToken = jsonData && jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;

  const itemsPerPage = 10;
  const navigate = useNavigate()
  const location = useLocation()
  const getSubQualificationApi = async () => {
    const request = await fetch(`${process.env.REACT_APP_API_URL}subqualification`, {
      method: "GET",
      headers: {
        'Authorization': `${authorize}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const jsonResponse = await request?.json();
    // console.log("skill",jsonResponse )

    if (jsonResponse) {
      setSubQualificationList(jsonResponse?.data);
    }
  };
  useEffect(() => {
    getSubQualificationApi();
    document.title = "CIPLCRM | Specialization"
  }, [shoeEditSubQualificationModal]);

  useEffect(() => {
    if (jsonData?.data?.userPermissions.find(a => a === "edit_qualification")) {
      setShowEditButton(true)
    } else {
      setShowEditButton(false)
    }
    (jsonData?.data?.userPermissions.find(a => a === "delete_qualification")) ? setShowDeleteButton(true) : setShowDeleteButton(false)
  }, [showEditButton, showDeleteButton])

  useEffect(() => {
    if (jsonData?.data?.userPermissions.find(a => a === "view_qualification")) {
      return
    } else {
      navigate('/admin')
    }

  }, [location])


  // filtering Data of list

  const filteredData = subQualificationList && subQualificationList?.filter((data) => data?.name?.toLowerCase().includes(search))

  // const tableHeading = ["S. No.", "Name", "Category", "Action"];
  const tableHeading = [
    {
      name: 'S. No.',
      cell: (row, index) => {
        const startingIndex = (currentPage - 1) * itemsPerPage;
        return startingIndex + index + 1;
      },
      sortable: false,
      
      // selector: (row, index) => index + 1,
      // sortable: false,
    },
    {
      name: 'Name',
      selector: row => row?.name,
      sortable: false,

    },
    {
      name: 'Category',
      selector: row => row?.qualification?.name,
      sortable: false,

    },
    {
      name: 'Action',
      selector: row => (
        <>
          {
            showEditButton ?
              <button
                onClick={() => {
                  setShowEditSubQualificationModal(true);
                  setContentEdit(row)
                  setEditSubQualification(row?.name)
                }}
                className=""
              >
                <FaRegEdit
                  className="bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer"
                  fill="white"
                  size={30}
                  title='Edit'
                />
              </button>
              : null
          }
          {
            showDeleteButton ?
              <button
                className=""
                to="#"
                onClick={async () => {
                  Swal.fire({
                    title: 'Are you sure you want to delete this ?',
                    text: "After deleting all related data would be deleted and can not be retrived. So before deleting make sure you have back up of all related data !",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      try {
                        const request = await fetch(
                          `${process.env.REACT_APP_API_URL}subqualification/delete/${row?.id}`,
                          {
                            method: 'POST',
                            headers: {
                              'Authorization': `${authorize}`,
                              "Content-type": "application/json; charset=UTF-8",
                            },
                            body: JSON.stringify({
                              name: `${row?.name}`
                            })
                          }
                        );
                        const response = await request?.json()
                        if (response?.code === 200) {
                          // navigate(0);
                          getSubQualificationApi()
                          Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
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
                  })
                }}
              >
                <AiOutlineDelete
                  size={30}
                  className="bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white"
                  title='Delete'
                />
              </button>
              : null
          }
        </>
      ),
      sortable: false,
    },
  ];


  return (
    <div>
      <ToastContainer autoClose={3000} position='top-center' />
      {shoeEditSubQualificationModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Edit Specialization</h3>
                  <button
                    className="p-1 ml-auto border-0 text-red-500  float-right text-3xl leading-none font-semibold "
                    onClick={() => setShowEditSubQualificationModal(false)}
                  >
                    <span className=" text-red-500 h-6 w-6 text-xl block ">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="py-3 px-1">
                  <section className="px-1 mx-4 ">
                    <div className="w-60">
                      <label className="block">
                        <span className="px-1">Specialization</span>
                        <span className="px text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="rounded border p-2 my-2 px-2 w-full"
                        placeholder="Specialization"
                        value={editSubQualification}
                        onChange={(e) => setEditSubQualification(e.target.value)}
                      />
                    </div>
                  </section>
                </div>
                {/*footer*/}
                <div className="flex items-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center"
                    type="button"
                    onClick={async () => {
                      try {
                        const request = await fetch(
                          `${process.env.REACT_APP_API_URL}subqualification/update/${contentEdit?.id}`,
                          {
                            method: "post",
                            headers: {
                              'Authorization': `${authorize}`,
                              "Content-type": "application/json; charset=UTF-8",
                            },
                            body: JSON.stringify({
                              name: `${editSubQualification}`,
                              qualification_id: `${contentEdit?.qualification?.id}`,
                            }),
                          }
                        )
                        const response = await request?.json()
                        if (response?.code === 200) {
                          toast.success(`${response?.message}`)
                          setShowEditSubQualificationModal(false)
                          getSubQualificationApi()
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
                    }}
                  >
                    Update
                    <FiArrowRight className="text-xl px" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="mt-4 px-4 border border-gray-300 rounded-lg bg-white mx-4">
        
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-3 flex justify-end pr-2">

              <div className="relative max-w-xs flex items-center justify-end">
                <label htmlFor="hs-table-search" className="px-2">
                  Search:
                </label>
                <input
                  type="text"
                  name="hs-table-search"
                  id="hs-table-search"
                  className="block w-full p-3 border text-sm border-gray-300 rounded-md "
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
              </div>
            </div>
            <div className="lg:p-1.5  pb-6 pt-2 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <Table
                  columns={tableHeading}
                  data={filteredData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubQualification