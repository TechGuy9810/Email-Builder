import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from "./Editor.jsx";
import { useAuth } from '@clerk/clerk-react';
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaTrashAlt, FaDownload } from 'react-icons/fa';
const EmailTemplates = () => {
  const [layout, setLayout] = useState("");
  const [emailData, setEmailData] = useState({
    newTitle: "",
    newContent: "",
    newFooter: "",
    newImageUrl: "",
  });
  const navigate = useNavigate();
  const { isLoaded } = useAuth();
  const { id } = useParams();
  const renderLayout = () => {
    axios
      .post(`https://email-builder-production-7571.up.railway.app/sign-in/api/emailTemplate/renderEmailLayout/${id}`, emailData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data && response.data.html) {
          setLayout(response.data.html);
        } else {
          console.error("Failed to get email layout");
        }
      });
  };

  useEffect(() => {
    axios
      .get(`https://email-builder-production-7571.up.railway.app/sign-in/api/emailTemplate/getEmailLayout/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data && response.data.html) {
          setLayout(response.data.html);
        } else {
          console.error("Failed to get email layout");
        }
      });
  }, []);

  // Handle field updates
  const updateField = (field, value) => {
    setEmailData({ ...emailData, [field]: value });
  };

  // Save email configuration to the backend
  const saveTemplate = () => {
    axios
      .post(`https://email-builder-production-7571.up.railway.app/sign-in/api/emailTemplate/uploadEmailConfig/${id}`, emailData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data && response.data.html) {
          setLayout(response.data.html); // Set the HTML content
          setEmailData("");
        } else {
          console.error("Failed to upload email configuration");
        }
      });
  };
  const downloadTemplate = ()=>{
    axios
      .get(`https://email-builder-production-7571.up.railway.app/sign-in/api/emailTemplate/downloadTemplate/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'template.html');
          document.body.appendChild(link);
          link.click();
        } else {
          console.error("Failed to download email template");
        }
      });
  }
  if (!isLoaded) {
    return <div className="flex flex-col gap-10 p-10 lg:h-[93vh] h-full justify-center items-center">
    <ClipLoader size={50} color={"#3498db"} /> {/* Add the spinner */}
    <p className="text-lg font-semibold">Loading...</p>
  </div>;
  }
  const deleteTemplate = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/apiUser/userTemplates/deleteTemplate/${id}`,
        { withCredentials: true }
      );

      if (response.data) {
          navigate("/");
      } else {
        console.error("Failed to delete template");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };
  return (
    
    <div
  className="flex lg:flex-row gap-10 p-10 lg:h-[93vh] h-full w-full justify-center flex-col"
  style={{
    background: `linear-gradient(to right, rgba(0, 0, 0, 0.9), transparent), url('./templateImage.jpeg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Editor on the left with 40% height */}
  <div className="div1 bg-none h-[100%] lg:w-[25%] w-[100%]">
<div className="lg:h-[93%] h-[90%] w-full bg-white rounded-t-lg">
      <Editor
        emailData={emailData}
        updateField={updateField}
        setLayout={setLayout}
        renderLayout={renderLayout}
        id={id}
      />
      </div>
      <div className="lg:h-[7%] h-[10%] w-full items-center flex justify-center bg-blue-600 rounded-b-lg hover:bg-blue-700 cursor-pointer">
        <button className="text-white font-bold lg:text-lg sm:text-sm" onClick={saveTemplate}>
          Update
        </button>
      </div>
  </div>

  {/* Other div on the right with 60% height */}
  <div className="h-full lg:w-[65%] w-[100%] bg-white shadow-lg rounded-lg flex relative lg:flex-row-reverse flex-col-reverse">
  <div
  className="div2 lg:h-[100%] lg:w-[90%] w-[100%] h-[90%] flex justify-center items-center relative"
  dangerouslySetInnerHTML={{ __html: layout }}
/>
  {/* New Div inside the parent */}
  <div className="lg:flex-col flex-row lg:w-[10%] w-full lg:h-full h-[10%] flex lg:justify-start justify-center items-center lg:pt-10 bg-gray-100 lg:rounded-r-lg rounded-none lg:gap-10 gap-5">
    {/* Delete Icon */}
    <div className="flex items-center justify-center">
      <FaTrashAlt className="lg:size-4 size-2 text-gray-500 cursor-pointer" onClick={(e) => {
                  deleteTemplate(id);
                }}/>
    </div>
    
    {/* Download Icon */}
    <div className="flex items-center justify-center">
      <FaDownload className="lg:size-4 size-2 text-gray-500 cursor-pointer" onClick={downloadTemplate}/>
    </div>
  </div>
</div>

</div>

  );
};

export default EmailTemplates;
