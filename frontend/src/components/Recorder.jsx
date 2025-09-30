import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop, FaPlay } from "react-icons/fa";

const Recorder = ({ setTranscription }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [loading, setLoading] = useState(false); // État de chargement
  const [currentTranscription, setCurrentTranscription] = useState([]); // Store current transcription
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    recorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      uploadAudio(audioBlob); // Envoi de l'audio à l'API
      audioChunksRef.current = [];
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handlePlay = () => {
    if (audioURL) {
      new Audio(audioURL).play();
    }
  };

  const uploadAudio = async (audioBlob) => {
    setLoading(true); // Déclenche le chargement
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");

    const response = await fetch("http://127.0.0.1:8000/transcribe", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    const transcriptionArray = data.transcription.split("\n");
    setTranscription(transcriptionArray); // Envoie la transcription
    setCurrentTranscription(transcriptionArray); // Store locally for download
    setLoading(false); // Arrête le chargement
  };

  // Function to download transcription as text file
  const downloadTranscription = () => {
    if (currentTranscription.length === 0) return;

    const transcriptionText = currentTranscription.join("\n");
    const blob = new Blob([transcriptionText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `medical-transcription-${new Date()
      .toISOString()
      .slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-blue-100/50 w-full max-w-lg text-center space-y-6">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg
            className="w-8 h-8 text-white"
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

        <h2 className="text-2xl font-bold text-gray-800">Voice Recording</h2>

        <div className="flex items-center justify-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isRecording ? "bg-red-500 animate-pulse" : "bg-gray-300"
            }`}
          ></div>
          <p className="text-gray-600 font-medium">
            {isRecording ? "Recording in progress..." : "Ready to record"}
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center items-center gap-6">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="group relative w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/30"
          >
            <FaMicrophone className="text-white text-2xl group-hover:scale-110 transition-transform duration-200" />
            <div className="absolute inset-0 rounded-full bg-red-400/20 animate-ping"></div>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="group w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-500/30"
          >
            <FaStop className="text-white text-2xl group-hover:scale-110 transition-transform duration-200" />
          </button>
        )}

        {audioURL && (
          <button
            onClick={handlePlay}
            className="group w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/30"
          >
            <FaPlay className="text-white text-lg group-hover:scale-110 transition-transform duration-200 ml-1" />
          </button>
        )}
      </div>

      {/* Status and Actions */}
      <div className="space-y-4">
        {audioURL && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <svg
                className="w-5 h-5 text-green-600"
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
              <span className="text-green-800 font-semibold">
                Recording Complete
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={audioURL}
                download="recorded-audio.wav"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Download Audio</span>
              </a>

              {currentTranscription.length > 0 && (
                <button
                  onClick={downloadTranscription}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Download Transcription</span>
                </button>
              )}
            </div>
          </div>
        )}

        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-blue-800 font-semibold">
                Processing audio and generating transcription...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recorder;
