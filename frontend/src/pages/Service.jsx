import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Recorder from "../components/Recorder";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";

const Service = () => {
  const [transcription, setTranscription] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <NavBar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 bg-clip-text text-transparent mb-3">
              Medical Voice Recognition Platform
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Advanced AI-powered voice transcription for healthcare
              professionals
            </p>
          </div>

          {/* Main Dashboard */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
              {/* Transcription Panel */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Live Transcription
                  </h2>
                </div>
                <div className="h-full">
                  <Sidebar transcription={transcription} />
                </div>
              </div>

              {/* Recording Panel */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Voice Recording
                  </h2>
                </div>
                <div className="h-full flex items-center justify-center">
                  <Recorder setTranscription={setTranscription} />
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="mt-8 pt-6 border-t border-blue-100">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>System Online</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>AI Processing Active</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Secure Healthcare Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Service;
