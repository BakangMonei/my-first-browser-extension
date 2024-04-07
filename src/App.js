import React, { useState, useRef } from "react";
import { FaPause, FaPlay, FaMicrophone } from "react-icons/fa";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const recognition = useRef(null);

  // Initialize speech recognition
  if ("webkitSpeechRecognition" in window) {
    recognition.current = new window.webkitSpeechRecognition();
    recognition.current.continuous = false;
    recognition.current.lang = "en-US";
    recognition.current.interimResults = false;
  } else {
    console.error("Speech recognition not supported");
  }

  // Function to handle speech recognition
  const handleSpeechRecognition = () => {
    if (recognition.current) {
      setLoading(true);
      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
      };
      recognition.current.start();
    }
  };

  // Function to handle search
  const handleSearch = async () => {
    if (!searchTerm) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
      );
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]);
    }

    setLoading(false);
  };

  // Function to play audio
  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  return (
    <div>
      <div className="dark:bg-sky-900 dark:border-white bg-white rounded-lg shadow-md p-4 w-full sm:max-w-md border-2  border-gray-800">
        <h1 className="text-2xl font-semibold mb-4 text-center text-black dark:text-white">
          Dictionary Extension
        </h1>
        <div className="flex items-center border-b border-gray-200 pb-4">
          <input
            type="text"
            placeholder="Search for a word"
            className="flex-grow px-3 font-mono py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="ml-2 font-mono   dark:text-white rounded-md focus:outline-none transition duration-200 ease-in-out"
            onClick={handleSpeechRecognition}
            disabled={loading}
          >
            <FaMicrophone />
          </button>
          <button
            className="ml-2 px-4 py-2 font-mono bg-sky-500 dark:bg-black text-white dark:text-white rounded-md focus:outline-none hover:bg-blue-600 dark:hover:bg-gray-900 transition duration-200 ease-in-out"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
          
        </div>
        <div className="mt-4">
          {searchResults.length === 0 ? (
            <p className="text-gray-500 font-mono">No results found</p>
          ) : (
            searchResults.map((result) => (
              <div key={result.id} className="mb-4">
                <h2 className="text-xl font-semibold text-black dark:text-white text-center">
                  {result.word}
                </h2>
                {result.phonetics &&
                  result.phonetics.map((phonetic, index) => (
                    <div key={index}>
                      <p className="ext-black dark:text-white font-mono">
                        Phonetic: {phonetic.text}
                      </p>
                      {phonetic.audio && (
                        <button
                          className="px-2 py-1 font-mono bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600 transition duration-200 ease-in-out"
                          onClick={() => playAudio(phonetic.audio)}
                        >
                          <FaPlay />
                        </button>
                      )}
                    </div>
                  ))}
                {result.meanings.map((meaning, index) => (
                  <div key={index}>
                    <p className="ext-black dark:text-white font-mono">
                      {meaning.definition}
                    </p>
                    {meaning.synonyms && (
                      <p className="ext-black dark:text-white font-mono">
                        Synonyms: {meaning.synonyms.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
        <p className="text-black dark:text-white font-mono text-center mt-4">
          <a
            href="https://github.com/BakangMonei"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Author: BakangMonei
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
