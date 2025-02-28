import { useRef, useState } from "react";
import axios from "axios";
import Button from "../components/ui/Button";
import InputBox from "../components/ui/InputBox";
import { useNavigate } from "react-router-dom";

function AppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mb-6">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
      <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
      <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
      <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
      <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
      <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
    </svg>
  );
}

export function SignIn() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  // SignIn Handler with Token Storage
  async function SignInHandler() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError("Both fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // If signin is successful, store token in localStorage
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Store JWT token

        // Redirect after successful signin
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Error during signin:", error);
      setError("Invalid credentials. Please try again.");
    }
  }

  const sentence = "a step away from your vault";

  return (
    <div className="h-screen w-screen flex overflow-hidden"> {/* Prevent scrolling by using overflow-hidden */}

      {/* Left Side - Gradient Background */}
      <div className="w-3/5 h-full bg-gradient-to-r from-indigo-600 to-teal-700 flex items-center justify-center px-8 py-6">
        <div className="flex flex-col items-center space-y-4"> {/* Logo and Name container */}
          <div className="flex items-center space-x-4 "> {/* Logo and Name row */}
            <AppIcon />
            <h1 className="text-5xl font-extrabold text-white transition-all ease-in-out duration-500 hover:text-teal-300 -mt-7">MindSnap</h1>
          </div>
          <p className="text-sm text-white opacity-80 -mt-8 -mr-1 animate-fade-in-characters">
            {sentence.split("").map((char, index) => (
              <span
                key={index}
                style={{ "--char-index": index } as React.CSSProperties}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char} {/* Ensure spaces are visible */}
              </span>
            ))}
          </p> {/* Updated text animation */}
        </div>
      </div>

      {/* Right Side - White Form with Shadows */}
      <div className="w-2/5 h-full bg-white flex flex-col justify-center items-center px-8 py-6 shadow-xl transform transition-all ease-in-out duration-500 hover:scale-105">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Sign In</h2>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        <div className="space-y-4 flex flex-col justify-center items-center">
          <InputBox type="text" placeholder="Username" reference={usernameRef} className="transition-all ease-in-out duration-300 focus:ring-2 focus:ring-teal-500 focus:outline-none" />
          <InputBox type="password" placeholder="Password" reference={passwordRef} className="transition-all ease-in-out duration-300 focus:ring-2 focus:ring-teal-500 focus:outline-none" />
        </div>

        <div className="mt-6 flex justify-center items-center">
          <Button variant="primary" text="Sign In" onClick={SignInHandler} className="transition-all ease-in-out duration-300 hover:bg-teal-500 p-2" />
        </div>

        <div className="mt-6 text-center text-gray-600">
          <p>Don't have an account? <a href="/signup" className="text-indigo-600 font-semibold hover:underline transition-all ease-in-out duration-300 hover:text-teal-500">Sign up here</a></p>
        </div>
      </div>

    </div>
  );
}

