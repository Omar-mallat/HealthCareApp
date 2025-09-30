import React from "react";

const Sidebar = ({ transcription }) => {
  return (
    <div className="w-full bg-gradient-to-br from-white via-slate-50 to-blue-50/30 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-100/50 p-6 h-full">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-blue-100">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
          <svg
            className="w-5 h-5 text-white"
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
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Medical Transcription
          </h2>
          <p className="text-sm text-gray-500">
            Real-time voice-to-text conversion
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="h-full overflow-y-auto">
        {transcription.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-600">
                {transcription.length} transcript
                {transcription.length !== 1 ? "s" : ""}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Live</span>
              </div>
            </div>

            <ul className="space-y-3">
              {transcription.map((text, index) => (
                <li
                  key={index}
                  className="group bg-white/70 backdrop-blur-sm border border-blue-100/50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                        {text}
                      </p>
                      <div className="mt-2 flex items-center space-x-2 text-xs text-gray-400">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Just now</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
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
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No Transcription Yet
            </h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Start recording to see your voice transcription appear here in
              real-time.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span>Waiting for audio input</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
