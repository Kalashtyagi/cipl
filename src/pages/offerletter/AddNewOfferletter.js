import React, { useRef, useState, useEffect } from "react";
import Editor from "../dashboard/jobdescription/ckeditor";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const data = localStorage.getItem("data");
const jsonData = JSON.parse(data);
const accessToken = jsonData?.access_token;
const authorize = "Bearer" + " " + accessToken;

const AddNewOfferletter = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [templatename, setTemplatename] = useState("");
  const [signfile,setSignfile]=useState('')

  const navigate = useNavigate();

  const [Offerletter, setOfferletter] = useState(``);

  const handleUploadsignature=(e)=>{
    setSignfile(e.target.files[0])
    
  }

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const offerLetterRef = useRef(null);

  const handlePrintPDF = () => {
    const element = offerLetterRef.current;

    html2pdf().from(element).save("offer_letter.pdf");
  };

  const handleSaveOfferletter = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}offerletter`,
        {
          templatename: templatename,
          contents: Offerletter,
          signature: signfile
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${authorize}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        navigate("/admin/offerletter");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="border rounded border-t-2 border-r-gray-400 border-l-gray-400 border-b-gray-400 border-gray-800 p-4 mx-4 my-2 bg-white">
        <h1 className="text-2xl text-left ">Add New Offer Letter</h1>
        <form>
          <div className=" w-full flex py-4 items-center">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="w-full col-span-2">
                <div className="w-full">
                  <div className="w-full mr-1">
                    <label className="flex pr-1 mb-2">
                      Template Name <span className="text-red-400"> *</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={50}
                      className="border w-full px-2 py-2"
                      placeholder={"Template Name"}
                      name="template_name"
                      onChange={(e) => setTemplatename(e.target.value)}
                    />
                    <label className="flex pr-1 mb-2 mt-2">
                      Upload Signature <span className="text-red-400"> *</span>
                    </label>

                    <input
                      type="file"
                      required
                      maxLength={50}
                      className="border w-full px-2 py-2"
                      name="template_name"
                      onChange={handleUploadsignature}
                    />
                  </div>

                  <div className="w-full col-span-2 mt-3">
                    <div className="w-full">
                      <label className="flex pr-1 mb-2"></label>
                      <Editor
                        name="description"
                        value={Offerletter}
                        onChange={(data) => {
                          setOfferletter(data);
                        }}
                        editorLoaded={editorLoaded}
                        className="cke"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <button
              type="button"
              className="flex my-4 transition-all delay-150 duration-150 px-8 py-2 rounded text-white bg-green-700 hover:bg-green-500"
            >
              <span
                className="text-xl font-medium"
                onClick={handleSaveOfferletter}
              >
                Save
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewOfferletter;
