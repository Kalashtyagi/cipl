import Swal from 'sweetalert2'
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiArrowRight } from "react-icons/fi";
import { FaDownload, FaRegEdit, FaUpload } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Table from "../../../components/Table";
import { useLocation, useNavigate } from "react-router-dom";
import ApiErrorPopUp from "../../../components/ApiErrorPopUp";
import { ToastContainer, toast } from 'react-toastify';
import ImportExcel from '../../../components/element/ImportExcel';
//import Alert from "../../login/Alert/Alert"
const JobCategories = () => {
  const [categoryList, setCategoryList] = useState("");
  const [contentEdit, setContentEdit] = useState("");
  const [showImportExcelModal,setShowImportExcelModal] = useState(false)
  const [showEditButton, setShowEditButton] = useState(false)
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [search, setSearch] = useState("")
  const [editCategory, setEditCategory] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const baseUrl = process.env.REACT_APP_API_URL;

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })
  //   console.log("baseurl", baseUrl);
  const data = localStorage.getItem("data");
  const jsonData = JSON.parse(data);
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;
  const navigate = useNavigate()
  const location = useLocation()

  const getData = async () => {
    const getApiData = await axios.get(`${baseUrl}jobcategories`, {
      headers: {
        'Authorization': `${authorize}`,
      },
    });
    const apiResonse = await getApiData?.data;
    // console.log("API Response", apiResonse)
    if (apiResonse?.code === 200) {
      setCategoryList(apiResonse?.data);
    } else {
      console.log("Api Response", apiResonse)
    }
    // console.log("API Response", apiResonse.data);
  };

  useEffect(() => {
    getData();
    document.title = "CIPLCRM | Job Categories"
  }, [showEditCategoryModal]);

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
      selector: (row, index) => index +1,
      sortable: false,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: false,

    },
    {
      name: 'Action',
      selector: row => (
        <div className="">
          {
            showEditButton ?
              <button
                onClick={() => {
                  setShowEditCategoryModal(true);
                  setContentEdit(row);
                  setEditCategory(row?.name);
                }}
                title="Edit"
                className=""
               
              >
                <FaRegEdit
                  className="bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer"
                  fill="white"
                  size={30}
                />    
              </button>
              :
              null
          }
          {
            showDeleteButton ?
              <button
                className=""
                to="#"
                onClick={() => {
                  swalWithBootstrapButtons.fire({
                    title: 'Are you sure you want to delete this ?',
                    text: "After deleting all related data would be deleted and can not be retrived. So before deleting make sure you have back up of all related data.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      await fetch(`${process.env.REACT_APP_API_URL}jobcategories/delete/${row?.id}`,
                        {
                          method: "POST",
                          headers: {
                            Authorization: `${authorize}`,
                            "Content-type":
                              "application/json; charset=UTF-8",
                          },
                        }
                      );
                      getData()
                      swalWithBootstrapButtons.fire(
                        'Deleted!',
                        '',
                        'success'
                      )
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      swalWithBootstrapButtons.fire(
                        'Cancelled',
                        '',
                        'error'

                      )
                    }
                  })
                }}
                title='Delete'
              >
                <AiOutlineDelete
                  size={30}
                  className="bg-gray-800 text-white m-1 w-6 p-1 h-6 hover:cursor-pointer"
                />


              </button> : null
          }
        </div>
      ),
      sortable: false,
      justifyContent: 'center',
    },
  ];
  const filterData = categoryList && categoryList?.filter((category) => category?.name?.toLowerCase().includes(search))
  // console.log("filtered data",filterData)
  // console.log("search",search)

  const importModal = {
    heading:'Bulk Category Import',
    setShowImportModal:setShowImportExcelModal,
    uploadButtonTitle:'Upload',
    uploadLabel:'Upload Category Excel'
  }
  
  return (
    <div>

  
      <ToastContainer position='top-center' />
      {showEditCategoryModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Edit Category Items
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-red-500  float-right text-3xl leading-none font-semibold "
                    onClick={() => setShowEditCategoryModal(false)}
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
                        <span className="px-1">Title</span>
                        <span className="px text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="rounded border p-2 px-2 w-full"
                        placeholder=""
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
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
                          `${baseUrl}jobcategories/update/${contentEdit?.id}`,
                          {
                            method: "post",
                            headers: {
                              Authorization: `${authorize}`,
                              "Content-type": "application/json; charset=UTF-8",
                            },
                            body: JSON.stringify({
                              name: `${editCategory}`,
                            }),
                          }
                        );
                        const response = await request.json();
                        // console.log('response', response)
                        if (response?.code === 200) {
                          toast.success(`${response?.message}`)
                          setShowEditCategoryModal(false);
                          getData()
                        }
                        // navigate(0);
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

      {
        showImportExcelModal?
        <ImportExcel
         importModalData={importModal}
         />
        :null
      }
           <div className="mt-4 px-4 border border-gray-800 border-t-4 bg-white mx-4">

        <div className="flex flex-col">
             <div className="overflow-x-auto">            
                       
            <div className="py-3 flex justify-end pr-2">
              
               
              {/* <div className='flex px-2 items-center'>
                <button onClick={()=>setShowImportExcelModal(true)} className='flex items-center rounded-sm bg-primary py-[6px] px-5 hover:bg-gray-900'><FaUpload fill='white' size={20}/><span className='pl-2 text-lg text-white'>Import</span></button>
              </div> */}              
            
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
    </div>
  );
};
export default JobCategories;

