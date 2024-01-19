import React, { useRef, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import cipllogo from "../../../assets/logocipl.jpg";
import footerlogo from "../../../assets/new footer.PNG";
import bottomimg from "../../../assets/bottomimage.jpg.png";
import { useSelector } from "react-redux";
import head from "../../../assets/head.jpeg";

// console.log("16", joining_date);

const SingleOfferLetter = () => {
  let { id } = useParams();
  const [data, setData] = useState({});


  let get_id =localStorage.getItem("get_id")

  get_id = Number(get_id)

  console.log("index", get_id)

  const offerletter = useSelector((state) => state.offerletter);
  console.log('22',offerletter)

  const offerLetterRef = useRef(null);

  console.log('26',offerLetterRef)

  // const handlePrintPDF = () => {
  //   const element = offerLetterRef.current;

  //   html2pdf().from(element).save("offer_letter.pdf");
  // };

  const handleDownloadOfferLatter = () => {
    const element = offerLetterRef.current;

    html2pdf().from(element).save("offer_letter.pdf");
  };

  console.log("20", offerletter);

  let obj = offerletter.offerletter[get_id];
  let joining_date = offerletter.joining_date;
 

  const formatDateToDDMMYY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[date.getMonth()];
    // const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear().toString().substr(-4);
  
    return `${day} ${monthName},${year}`;
}


//   const formatDateToDDMMYY = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
    
//     // An array of month names
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
//     const monthName = months[date.getMonth()];
//     const year = date.getFullYear();

//     return `${day} ${monthName} ${year}`;
// }

  console.log(obj?.salarydetails?.ctc);
  const ctc = obj?.salarydetails?.ctc;
  const formatter = new Intl.NumberFormat('en-US');
  const formattedCtc = ctc ? formatter.format(ctc) : '';
const result = ` ${formattedCtc}`;
console.log("result",result);
const gross = obj?.salarydetails?.grossAmount;
  const formattergross = new Intl.NumberFormat('en-US');
  const formattedgross = gross ? formattergross.format(gross) : '';
const resultgross = ` ${formattedgross}`;
console.log("t",resultgross);


  const replacements = {
    "{name}": `${obj?.full_name}`,
    "{role}": `${obj?.recruitment?.degination}`,

    // "{joining_date}": `${joining_date}`,

    "{joining_date}": formatDateToDDMMYY(joining_date),
    // "{ctc}": `${obj?.salarydetails?.ctc?.toLocaleString('en-IN') || ""}`,
    // "{gross amount}": `${obj?.salarydetails?.grossAmount}`,
    
    "{ctc}": `${result}`,
    "{gross amount}": `${resultgross}`,
    // "{created_date}": `${new Date().toJSON().slice(0, 10)}`,

    "{created_date}": formatDateToDDMMYY(new Date().toJSON().slice(0, 10)),
    "{retention_bonus}": `${obj?.salarydetails?.retensionBonus}`,
    "{sign}":` <img src=${data?.signature_url} alt="img" height=${120} width=${120}/>`
  };

  // Helper function to replace the strings
  const replaceAll = (str, mapObj) => {
    const regex = new RegExp(Object.keys(mapObj).join("|"), "gi");
    return str?.replace(regex, (matched) => mapObj[matched]);
  };

  // Call the helper function
  const modifiedString = replaceAll(data?.contents, replacements);

  const datatoken = localStorage.getItem("data");
  const jsonData = JSON.parse(datatoken);
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "CIPLCRM | Offer letter";

    axios
      .get(
        `${process.env.REACT_APP_API_URL}offerletter`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authorize}`,
          },
        }
      )
      .then((res) => {
        setData(res.data.data.find((ele) => ele.id == Number(id)));
        console.log('line no.103 ',res.data.data.find((ele) => ele.id == Number(id)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleDelete = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}offerletter/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authorize}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        navigate("/admin/offerletter");
      })
      .catch((err) => {
        console.log(err);
      });
  };




  const handleSubmit = async (e) => {
    // e.preventDefault()
    try {
      const formData = new FormData();
      formData.append("template_id", `${data.id}`);
      formData.append("joining_date", joining_date);
      formData.append("send_email", "yes");
      formData.append("message", modifiedString);
    
      const request = await axios.postForm(
        `${process.env.REACT_APP_API_URL}create-offer/${obj.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      const response = await request?.data;
      if (response?.code === 200) {
        console.log(response.message);
        toast.success(`${response?.message}`);
        navigate("/admin/offerletters");

        // setShowEditPopup(false);
        // getAssigneeData();
        //   setShowAddModal(false)
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="border rounded border-t-2 border-r-gray-400 border-l-gray-400 border-b-gray-400 border-gray-800 p-4 mx-4 my-2 bg-white">
        <div className="flex my-5 justify-end">
          <Link to={`/admin/sendupdateofferletter/${id}`}>
            <FiEdit
              style={{ cursor: "pointer", marginRight: "20px" }}
              className="text-lg "
            />
          </Link>

          {/* <RiDeleteBin6Line
            style={{ cursor: "pointer" }}
            className="text-lg "
            onClick={handleDelete}
          /> */}
        </div>
        <div className="w-full mr-1">
          <label className="flex pr-1 mb-2">Template Name</label>

          <div className="border w-full px-2 py-2">{data.templatename}</div>
        </div>
        <form>
          <div className=" w-full flex py-4 items-center" >
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="w-full col-span-2">
                <div className="w-full" ref={offerLetterRef}>
                  <div
                    className="mx-auto"
                    style={{
                      width: "700px",
                      // height: "1000px",
                    }}
                  >
                    <img
                      src={head}
                      alt="Logo"
                      style={{ width: "700px"}}
                      className="head"
                    />

                    <div className="m-5" >
                      <h2 className="text-center text-lg font-bold">
                        Offer Letter
                      </h2>
                      <div 
                        dangerouslySetInnerHTML={{ __html: modifiedString }}
                      />
                    </div>
                  </div>

                  {/* <div className="bottomimg">
                    <img className="bottomlg " src={bottomimg} alt="bottomimg" />
                  </div> */}
                  <div className="logodiv mx-auto">
                    <div className="footerlogo">
                      <img
                        className="footerlg"
                        src={footerlogo}
                        alt="footerlogo"
                        style={{width:'770px',marginRight:'40px'}}
                    />
                    </div>
                  </div>



                
                </div>
                <button
                    type="button"
                    className="flex my-4 transition-all delay-150 duration-150 px-8 py-2 rounded text-white bg-green-700 hover:bg-green-500"
                  >
                    <span
                      className="text-xl font-medium"
                      onClick={handleSubmit}
                    >
                      Send
                    </span>
                  </button>

                  <button
                    type="button"
                    className="flex my-4 transition-all delay-150 duration-150 px-8 py-2 rounded text-white bg-green-700 hover:bg-green-500"
                  >
                    <span
                      className="text-xl font-medium"
                      onClick={handleDownloadOfferLatter}
                    >
                      Download
                    </span>
                   
                  </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleOfferLetter;




// import React, { useRef, useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import html2pdf from "html2pdf.js";
// import { FiEdit } from "react-icons/fi";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { toast } from "react-hot-toast";
// import cipllogo from "../../../assets/logocipl.jpg";
// import footerlogo from "../../../assets/footer.jpg.png";
// import bottomimg from "../../../assets/bottomimage.jpg.png";
// import { useSelector } from "react-redux";
// import head from "../../../assets/head.jpeg";


// // console.log("16", joining_date);

// const SingleOfferLetter = () => {
//   let { id } = useParams();
//   const [data, setData] = useState({});

//   const offerletter = useSelector((state) => state.offerletter);

//   const offerLetterRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);


//   // const handlePrintPDF = () => {
//   //   const element = offerLetterRef.current;

//   //   html2pdf().from(element).save("offer_letter.pdf");
//   // };

//   const handleDownloadOfferLatter = () => {
//     const element = offerLetterRef.current;

//     html2pdf().from(element).save("offer_letter.pdf");
//   };

//   console.log("20", offerletter);

//   // let obj = offerletter.offerletter[0];
//   let obj = offerletter.offerletter[currentIndex];

//   const handleNext = () => {
//     if (currentIndex < offerletter.offerletter.length - 1) {
//         setCurrentIndex(currentIndex + 1);
//     } else {
//         // Handle case when you're at the last offer letter
//         // Maybe reset to 0 or inform the user
//         setCurrentIndex(0);
//     }
// }



  
//   // let obj = offerletter.offerletter.find((person) => person.id === Number(id));
//   console.log(obj)

//   let joining_date = offerletter.joining_date;

//   console.log("19", obj);

//   console.log(obj?.salarydetails?.ctc);


//   const formatDateToDDMMYY = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
    
//     // An array of month names
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
//     const monthName = months[date.getMonth()];
//     const year = date.getFullYear();

//     return `${day} ${monthName} ${year}`;
// }

//   const replacements = {
//     "{name}": `${obj?.full_name}`,
//     "{role}": `${obj?.recruitment?.degination}`,
//     "{joining_date}": formatDateToDDMMYY(joining_date),
//     "{gross amount}": `${obj?.salarydetails?.grossAmount}`,
//     "{ctc}": `${obj?.salarydetails?.ctc}`,
//     "{created_date}": formatDateToDDMMYY(new Date().toJSON().slice(0, 10)),
//     "{retention_bonus}": `${obj?.salarydetails?.retensionBonus}`,
//     "{sign}":` <img src=${data?.signature_url} alt="img" height=${120} width=${120}/>`
//   };




//   // Helper function to replace the strings
//   const replaceAll = (str, mapObj) => {
//     const regex = new RegExp(Object.keys(mapObj).join("|"), "gi");
//     return str?.replace(regex, (matched) => mapObj[matched]);
//   };

//   // Call the helper function

//   const modifiedString = replaceAll(data?.contents, 
//     replacements
//     );

//   const datatoken = localStorage.getItem("data");
//   const jsonData = JSON.parse(datatoken);
//   const accessToken = jsonData?.access_token;
//   const authorize = "Bearer" + " " + accessToken;
//   const navigate = useNavigate();

//   useEffect(() => {
//     document.title = "CIPLCRM | Offer letter";

//     axios
//       .get(
//         `${process.env.REACT_APP_API_URL}offerletter`,

//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `${authorize}`,
//           },
//         }
//       )
//       .then((res) => {
//         setData(res.data.data.find((ele) => ele.id === Number(id)));
//         console.log(res.data.data.find((ele) => ele.id === Number(id)));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const handleDelete = () => {
//     axios
//       .get(`${process.env.REACT_APP_API_URL}offerletter/delete/${id}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${authorize}`,
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//         toast.success(res.data.message);
//         navigate("/admin/offerletter");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };







  






//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const formData = new FormData();
//       formData.append("template_id", `${data.id}`);
//       formData.append("joining_date", joining_date);
//       formData.append("send_email", "yes");
//       formData.append("message", modifiedString);
//       const request = await axios.postForm(
//         `${process.env.REACT_APP_API_URL}create-offer/${obj.id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             Accept: "application/json",
//           },
//         }
//       );
//       const response = await request?.data;
//       if (response?.code === 200) {
//         console.log(response.message);
//         toast.success(`${response?.message}`);
//         navigate("/admin/offerletters");

//         // setShowEditPopup(false);
//         // getAssigneeData();
//         //   setShowAddModal(false)
//       }
//     } catch (error) {
//       console.log("error", error);
//       toast.error(error?.response?.data?.message);
//     }
//   };

//   return (
//     <>
//       <div className="border rounded border-t-2 border-r-gray-400 border-l-gray-400 border-b-gray-400 border-gray-800 p-4 mx-4 my-2 bg-white">
//         <div className="flex my-5 justify-end">
//           <Link to={`/admin/sendupdateofferletter/${id}`}>
//             <FiEdit
//               style={{ cursor: "pointer", marginRight: "20px" }}
//               className="text-lg "
//             />
//           </Link>

//           {/* <RiDeleteBin6Line
//             style={{ cursor: "pointer" }}
//             className="text-lg "
//             onClick={handleDelete}
//           /> */}
//         </div>
//         <div className="w-full mr-1">
//           <label className="flex pr-1 mb-2">Template Name</label>

//           <div className="border w-full px-2 py-2">{data.templatename}</div>
//         </div>
//         <form>
//           <div className=" w-full flex py-4 items-center">
//             <div className="grid grid-cols-2 gap-4 w-full">
//               <div className="w-full col-span-2">
//                 <div className="w-full">
//                   <div
//                     className="mx-auto"
//                     style={{
//                       width: "700px",
//                       // height: "1000px",
//                     }}
//                   >
//                     <img
//                       src={head}
//                       alt="Logo"
//                       style={{ width: "700px"}}
//                       className="head"
//                     />

//                     <div className="m-5" ref={offerLetterRef}>
//                       <h2 className="text-center text-lg font-bold">
//                         Offer Letter
//                       </h2>
//                       <div 
//                         dangerouslySetInnerHTML={{ __html: modifiedString }}
//                       />
//                     </div>
//                   </div>

//                   <div className="bottomimg">
//                     <img className="bottomlg " src={bottomimg} alt="bottomimg" />
//                   </div>
//                   <div className="logodiv mx-auto">
//                     <div className="footerlogo">
//                       <img
//                         className="footerlg"
//                         src={footerlogo}
//                         alt="footerlogo"
//                       />
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     className="flex my-4 transition-all delay-150 duration-150 px-8 py-2 rounded text-white bg-green-700 hover:bg-green-500"
//                   >
//                     <span
//                       className="text-xl font-medium"
//                       onClick={handleSubmit}
//                     >
//                       Send
//                     </span>
//                   </button>

//                   <button
//                     type="button"
//                     className="flex my-4 transition-all delay-150 duration-150 px-8 py-2 rounded text-white bg-green-700 hover:bg-green-500"
//                   >
//                     <span
//                       className="text-xl font-medium"
//                       onClick={handleDownloadOfferLatter}
//                     >
//                       Download
//                     </span>
                   
//                   </button>


//                   <button
//                     type="button"
//                     className="flex my-4 transition-all delay-150 duration-150 px-8 py-2 rounded text-white bg-green-700 hover:bg-green-500"
//                   >
//                     <span
//                       className="text-xl font-medium"
//                       onClick={ handleNext 
//                       }
//                     >
//                       view name
//                     </span>
                   
//                   </button>




//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default SingleOfferLetter;
