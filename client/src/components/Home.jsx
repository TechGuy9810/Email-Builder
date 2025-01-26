import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const Home = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn === undefined) return; // Wait until `isSignedIn` is resolved

    if (isSignedIn) {
      navigate("/"); // Redirect to home if signed in
    } else {
      navigate("/sign-in"); // Redirect to sign-in if not signed in
    }
  }, [isSignedIn, navigate]);

  const newTemplate = async () => {
    try {
      const response = await axios.get(
        "https://email-builder-production-7571.up.railway.app/api/emailTemplate/createEmailLayout",
        { withCredentials: true }
      );

      if (response.data) {
        const templateId = response.data.newTemplate._id;
        // Navigate directly with the retrieved templateId
        navigate(`/emailTemplate/${templateId}`);
      } else {
        console.error("Failed to get email layout");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
<div
  className="h-[93vh] p-5 sm:p-10 w-full bg-white flex flex-col sm:flex-row justify-start sm:gap-10 gap-5 relative overflow-hidden"
  style={{
    background: `linear-gradient(to right, rgba(0, 0, 0, 0.9), transparent), url('./bgImage.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center", // Fade effect
  }}
>
  {/* First Child */}
  <div
    className="child h-[50vh] sm:h-[60vh] w-full sm:w-[20vw] bg-black hover:scale-105 transform transition duration-200 rounded-lg cursor-pointer flex items-end flex-col"
    onClick={newTemplate}
  >
    {/* Image Container */}
    <div className="relative h-[85%] sm:h-[90%] w-full bg-cover overflow-hidden rounded-t-lg">
      {/* Image */}
      <img
        src={`./templateImage.jpeg`}
        alt="imageTemplate"
        className="h-full w-full object-cover opacity-50 hover:opacity-90 transition duration-200"
      />
      {/* Plus Icon */}
      <div className="absolute inset-0 flex justify-center items-center">
        <FaPlus className="text-white text-4xl sm:text-6xl opacity-90" />
      </div>
    </div>

    {/* Footer Text */}
    <div className="h-[15%] sm:h-[10%] w-full flex justify-center items-center rounded-b-lg bg-black">
      <p className="text-white m-2 font-bold text-sm sm:text-base">New Template</p>
    </div>
  </div>

  {/* Second Child */}
  <div
    className="child h-[50vh] sm:h-[60vh] w-full sm:w-[20vw] bg-none hover:scale-105 transform transition duration-200 rounded-lg cursor-pointer flex items-end flex-col"
    onClick={() => navigate("/myTemplates")}
  >
    {/* Image Container */}
    <div className="h-[85%] sm:h-[90%] w-full bg-cover overflow-hidden rounded-t-lg">
      <img
        src={`./templateImage.jpeg`}
        alt="imageTemplate"
        className="h-full w-full object-cover"
      />
    </div>
    <div className="h-[15%] sm:h-[10%] w-full flex justify-center items-center rounded-b-lg bg-black">
      <p className="text-white m-2 font-bold text-sm sm:text-base">Your Templates</p>
    </div>
  </div>
</div>

  );
};

export default Home;
