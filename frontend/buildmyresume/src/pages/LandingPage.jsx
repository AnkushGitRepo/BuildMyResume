import React, { useContext, useState } from "react";

import HERO_IMG from "../assets/hero-img.png";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
     if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full min-h-full bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="text-xl font-bold">BuildMyResume</div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Hero Content */}
        <div className="flex flex-col items-center text-center">
          <div className="w-full mb-8">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Build Your{" "}
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#4A90E2_0%,_#2E86C1_100%)] bg-[length:200%_200%] animate-text-shine">
                Resume Effortlessly
              </span>
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

      <footer className="bg-gray-800 text-white py-8 mt-12 fixed bottom-0 w-full">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold">BuildMyResume</h3>
              <p className="text-gray-400 text-sm">Craft your professional story.</p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/AnkushGitRepo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors text-2xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/ankushgupta18/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors text-2xl"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/_ankushg/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors text-2xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} BuildMyResume. All rights reserved.</p>
        </div>
      </footer>

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
