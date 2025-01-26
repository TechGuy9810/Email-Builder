import React, { useRef, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloudUpload } from "react-icons/io5";

const Editor = ({ emailData, updateField, setLayout, renderLayout, id }) => {
  const [file, setFile] = useState(null);
  const quillRef = useRef(null); // Create a ref for ReactQuill

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("newTitle", emailData.newTitle);
    formData.append("newContent", emailData.newContent);
    formData.append("newFooter", emailData.newFooter);

    axios
      .post(`https://email-builder-production-7571.up.railway.app/api/emailTemplate/uploadImage/${id}`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data && response.data.imageUrl) {
          updateField("newImageUrl", response.data.imageUrl);
          setLayout(response.data.html); 
        } else {
          console.error("No image URL found in the response");
        }
      });
  };

  // React Quill toolbar options
  const toolbarOptions = [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ];

  return (
    <div className="w-full h-full bg-gray-50 p-4 rounded-lg border">
      {/* Title Editor with ReactQuill */}
      <div className="titleDiv h-[35%] max-h-[30%] w-full">
        <label className="block text-sm font-bold mb-1">Title:</label>
        <ReactQuill
          value={emailData.newTitle}
          onChange={(value) => updateField("newTitle", value)} // Update title with Quill's HTML content
          onKeyDown={renderLayout}
          modules={{ toolbar: toolbarOptions }}
          theme="snow"
          className="bg-white rounded-lg"
        />
      </div>

      {/* Image Upload */}
      <div className="imageDiv h-[15%] w-full">
        <label className="block text-sm font-bold mb-1">Upload Image:</label>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            onKeyDown={renderLayout}
            className="border border-gray-300 rounded-md p-2"
          />
          <IoCloudUpload className="lg:size-6 size-2 text-gray-800 cursor-pointer" onClick={handleUpload}/>
        </div>
      </div>

      {/* Content Editor */}
      <div className="contentDiv h-[35%] w-full">
        <label className="block text-sm font-bold mb-1">Content:</label>
        <ReactQuill
          ref={quillRef} // Use the ref for the editor
          value={emailData.newContent}
          onChange={(value) => updateField("newContent", value)}
          onKeyDown={renderLayout}
          modules={{ toolbar: toolbarOptions }}
          theme="snow"
          className="bg-white rounded-lg"
        />
      </div>

      {/* Footer Input */}
      <div className="footerDiv h-[15%] max-h-[25%] w-full">
        <label className="block text-sm font-bold mb-1">Footer:</label>
        <input
          type="text"
          value={emailData.newFooter}
          onChange={(e) => updateField("newFooter", e.target.value)}
          onKeyDown={renderLayout}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Editor;
