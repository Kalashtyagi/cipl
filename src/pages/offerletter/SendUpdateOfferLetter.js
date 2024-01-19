import React, { useRef, useState, useEffect } from "react";
import Editor from "../dashboard/jobdescription/ckeditor";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const data = localStorage.getItem("data");
const jsonData = JSON.parse(data);
const accessToken = jsonData?.access_token;
const authorize = "Bearer" + " " + accessToken;

const UpdateOfferletter = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [templatename, setTemplatename] = useState("");
  let { id } = useParams();
  const [data, setData] = useState({});
  const offerletter = useSelector((state) => state.offerletter);

  let obj = offerletter.offerletter[0];
  let joining_date = offerletter.joining_date;

  const navigate = useNavigate();

  const [Offerletter, setOfferletter] = useState("");

  const replacements = {
    "{name}": `${obj?.full_name}`,
    "{role}": `${obj?.recruitment?.degination}`,
    "{joining_date}": `${joining_date}`,
    "{ctc}": `${obj?.salarydetails?.ctc}`,
    "{created_date}": `${new Date().toJSON().slice(0, 10)}`,
  };

  // Helper function to replace the strings
  const replaceAll = (str, mapObj) => {
    const regex = new RegExp(Object.keys(mapObj).join("|"), "gi");
    return str?.replace(regex, (matched) => mapObj[matched]);
  };

  // Call the helper function
  const modifiedString = replaceAll(data?.contents, replacements);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    setOfferletter(data.contents);
    setTemplatename(data.templatename);
  }, [data]);

  const offerLetterRef = useRef(null);

  const handlePrintPDF = () => {
    const element = offerLetterRef.current;

    html2pdf().from(element).save("offer_letter.pdf");
  };

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
        console.log(res.data.data.find((ele) => ele.id == Number(id)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSaveOfferletter = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}offerletterupdate/${id}`,
        {
          templatename: templatename,
          contents: Offerletter,
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
        navigate(`/admin/offerletters/SendOfferLetter/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="border rounded border-t-2 border-r-gray-400 border-l-gray-400 border-b-gray-400 border-gray-800 p-4 mx-4 my-2 bg-white">
        <h1 className="text-2xl text-left ">Update Offer Letter</h1>
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
                      value={templatename}
                      className="border w-full px-2 py-2"
                      placeholder={"Template Name"}
                      name="template_name"
                      onChange={(e) => setTemplatename(e.target.value)}
                    />
                  </div>

                  <div className="w-full col-span-2 mt-3">
                    <div className="w-full">
                      <label className="flex pr-1 mb-2"></label>
                      <Editor
                        name="description"
                        value={modifiedString}
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

export default UpdateOfferletter;
