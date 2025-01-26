import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaTrashAlt } from "react-icons/fa";

const MyTemplates = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userTemplates = async () => {
      if (!user || !user.id) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `https://email-builder-production-7571.up.railway.app/apiUser/userTemplates/myTemplate/${user.id}`,
          { withCredentials: true }
        );

        if (response.data) {
          setTemplates(response.data);
        } else {
          console.error("No templates found");
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };

    userTemplates();
  }, [user, user?.id]);

  const deleteTemplate = async (id) => {
    try {
      const response = await axios.delete(
        `https://email-builder-production-7571.up.railway.app/apiUser/userTemplates/deleteTemplate/${id}`,
        { withCredentials: true }
      );

      if (response.data) {
        setTemplates((prev) => ({
          ...prev,
          templates: prev.templates.filter((template) => template._id !== id),
        }));
      } else {
        console.error("Failed to delete template");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  return (
    <div
      className="min-h-[93vh] p-5 sm:p-10 w-full bg-white flex flex-col gap-5 sm:gap-10"
      style={{
        background: `url('./bgTemplate.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {loading ? (
        <div className="flex flex-col gap-5 sm:gap-10 justify-center items-center h-full">
          <ClipLoader size={50} color={"#3498db"} />
          <p className="text-lg sm:text-xl font-semibold">Loading...</p>
        </div>
      ) : templates !== null && templates.templates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-10 w-full">
          {templates.templates.map((template) => (
            <div
              className="relative h-[40vh] bg-none hover:scale-105 transform transition duration-200 rounded-lg cursor-pointer flex items-end flex-col group"
              key={template._id}
            >
              {/* Delete Icon */}
              <div
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 z-10 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTemplate(template._id);
                }}
              >
                <FaTrashAlt size={16} />
              </div>

              {/* Image Container */}
              <div className="h-[85%] w-full bg-cover overflow-hidden rounded-t-lg relative">
                <img
                  src={template.imageUrl}
                  alt="imageTemplate"
                  className="h-full w-full object-cover"
                />
                {/* Visit Button */}
                <button
                  className="absolute inset-0 bg-black bg-opacity-60 text-white font-bold text-lg sm:text-xl opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center rounded-t-lg"
                  onClick={() => navigate(`/emailTemplate/${template._id}`)}
                >
                  Visit
                </button>
              </div>

              {/* Footer */}
              <div className="h-[15%] w-full flex justify-center items-center rounded-b-lg bg-black">
                <p className="text-white m-2 font-bold text-sm sm:text-base">
                  {/* {template.title} */}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg sm:text-2xl font-bold text-gray-300">
            No Templates Found
          </p>
        </div>
      )}
    </div>
  );
};

export default MyTemplates;
