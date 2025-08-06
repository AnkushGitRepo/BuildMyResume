import React, { useContext, useState, useEffect } from "react";

import HERO_IMG from "../assets/hero-img.png";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import Footer from "../components/layouts/Footer";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const words = ['Simple', 'Fast', 'Impressive', 'Smarter', 'Winning'];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCTA = () => {
     if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="h-16 bg-gray-800 text-white px-4 md:px-0 fixed top-0 left-0 right-0 z-30">
        <div className="container mx-auto flex items-center justify-between h-full">
          <div className="text-xl font-bold">BuildMyResume</div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
                className="bg-blue-500 text-sm font-semibold text-white px-7 py-2.5 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 pt-24 flex-grow">
        {/* Hero Content */}
        <div className="flex flex-col items-center text-center">
          <div className="w-full mb-8">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Your Resume,{" "}
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#4A90E2_0%,_#2E86C1_100%)] bg-[length:200%_200%] animate-text-shine">
                Made
              </span>{" "}
              <div className="relative inline-flex items-center h-16 overflow-hidden">
                <span
                  key={words[wordIndex]}
                  className="inline-block animate-slide-up text-transparent bg-clip-text bg-[radial-gradient(circle,_#4A90E2_0%,_#2E86C1_100%)] bg-[length:200%_200%] animate-text-shine"
                >
                  {words[wordIndex]}
                </span>
              </div>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Design an impressive resume in moments using our intuitive and powerful tool.
            </p>
            <button
              className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>
          <div className="w-full md:w-2/3 lg:w-1/2">
            <img
              src={HERO_IMG}
              alt="Hero Image"
              className="w-full rounded-lg"
              draggable="false"
            />
          </div>
        </div>


      </div>

      <Footer />

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;