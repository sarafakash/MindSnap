import { useRef, useState } from "react";
import axios, { AxiosError } from "axios";
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

export function Signup() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function SignupHandler() {
    const username = usernameRef.current?.value;
    const firstName = firstnameRef.current?.value;
    const lastName = lastnameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !firstName || !lastName || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          username,
          firstName,
          lastName,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

//      alert("Signup successful!");
      navigate("/signin");
    } catch (error: unknown) {
      console.error("Error during signup:", error);

      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.status === 403) {
            setError(error.response.data.message); // User already exists
          } else {
            setError("An error occurred during signup.");
          }
        } else {
          setError("Network error occurred.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }

    setIsLoading(false); // Reset loading state after signup attempt
  }

  const sentence = "the perfect vault for your ideas";

  return (
    <div className="h-screen w-screen flex overflow-hidden">

      <div className="w-3/5 h-full bg-gradient-to-r from-indigo-600 to-teal-700 flex items-center justify-center px-8 py-6">
        <div className="flex flex-col items-center space-y-4">

          <div className="flex items-center space-x-4 ">

            <AppIcon />
            <h1 className="text-5xl font-extrabold text-white transition-all ease-in-out duration-500 hover:text-teal-300 -mt-7">
              MindSnap
            </h1>
          </div>
          <p className="text-sm text-white opacity-80 -mt-8 -mr-6 animate-fade-in-characters">
            {sentence.split("").map((char, index) => (
              <span
                key={index}
                style={{ "--char-index": index } as React.CSSProperties}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
      </div>


      <div className="w-2/5 h-full bg-white flex flex-col justify-center items-center px-8 py-6 shadow-xl transform transition-all ease-in-out duration-500 hover:scale-105">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
          Create an Account
        </h2>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        <div className="space-y-4 flex flex-col justify-center items-center">
          <InputBox
            type="text"
            placeholder="Username"
            reference={usernameRef}
            className="transition-all ease-in-out duration-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <InputBox
            type="text"
            placeholder="First Name"
            reference={firstnameRef}
            className="transition-all ease-in-out duration-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <InputBox
            type="text"
            placeholder="Last Name"
            reference={lastnameRef}
            className="transition-all ease-in-out duration-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <InputBox
            type="password"
            placeholder="Password"
            reference={passwordRef}
            className="transition-all ease-in-out duration-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <div className="mt-6 flex justify-center items-center">
          <Button
            variant="primary"
            text="Signup with username"
            onClick={SignupHandler}
            className="transition-all ease-in-out duration-300 hover:bg-teal-500 p-2"
            disabled={isLoading} // Disable button during loading
          />
        </div>

        <div className="mt-6 text-center text-gray-600">
          <p>
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-indigo-600 font-semibold hover:underline transition-all ease-in-out duration-300 hover:text-teal-500"
            >
              Signin here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
