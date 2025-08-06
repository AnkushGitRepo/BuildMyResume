import React from "react";
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12 w-full">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <img src="/favicon.png" alt="Logo" className="h-8 w-8" />
              <h3 className="text-2xl font-bold">BuildMyResume</h3>
            </div>
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
  );
};

export default Footer;