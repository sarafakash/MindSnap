import { useState, useRef } from "react";
import CloseIcon from "../../icons/CloseIcon";
import Button from "./Button";
import InputBox from "./InputBox";
import axios from "axios";

// Reusable Content Type Button Component
const ContentTypeButton = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div
    className={`w-18 h-8 ${isSelected ? "bg-blue-100" : "bg-gray-300"} ring hover:ring-2 hover:ring-gray-400 hover:bg-blue-100 text-black rounded-md flex justify-center items-center cursor-pointer`}
    onClick={onClick}
  >
    {label}
  </div>
);

const AddContent = ({ onClick }: { onClick: () => void }) => {
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
//   const typeRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  async function SubmitContent() {
    const title = titleRef.current?.value;
    const type = selectedContentType;
    const link = linkRef.current?.value;
    const description = descriptionRef.current?.value;
    const tags = ["Cat", "Dog"];

    if (!title || !type || !link) {
      console.log("All fields are required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/v1/content",
        { title, type, link, tags, description },
        { headers: { token } }
      );
      alert("Content added successfully");
    } catch (e) {
      console.log("Problem while sending content data to the backend", e);
    }
  }

  const handleContentTypeChange = (type: string) => {
    setSelectedContentType(type);
  };

  return (
    <div className="flex flex-col justify-between items-center p-2 gap-7 rounded mt-20">
      {/* Close Button */}
      <div
        className="flex -mt-20 -mr-100 cursor-pointer hover:ring hover:ring-blue-600 hover:rounded"
        onClick={onClick}
      >
        <CloseIcon />
      </div>

      {/* Add Content Title */}
      <div className="-mt-13">
        <span className="text-xl font-bold">Add a new idea</span>
      </div>

      {/* Content Type Selector (Colorful Divs) */}
      <div className="flex space-x-4 mt-4">
        <ContentTypeButton
          label="Video"
          isSelected={selectedContentType === "Video"}
          onClick={() => handleContentTypeChange("Video")}
        />
        <ContentTypeButton
          label="Tweet"
          isSelected={selectedContentType === "Tweet"}
          onClick={() => handleContentTypeChange("Tweet")}
        />
        <ContentTypeButton
          label="Link"
          isSelected={selectedContentType === "Link"}
          onClick={() => handleContentTypeChange("Link")}
        />
        <ContentTypeButton
          label="Document"
          isSelected={selectedContentType === "Document"}
          onClick={() => handleContentTypeChange("Document")}
        />
      </div>

      {/* Input Fields based on Selected Content Type */}
      {selectedContentType && (
        <div className="mt-4 w-full max-w-lg flex flex-col justify-center items-center gap-3">
          <InputBox reference={titleRef} type="text" placeholder="Title" />
          <InputBox reference={linkRef} type="text" placeholder="Link" />

          {selectedContentType === "Document" && (
            <InputBox reference={descriptionRef} type="text" placeholder="Description (optional)" />
          )}

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <Button
              variant="primary"
              text="Submit"
              onClick={SubmitContent}
              className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-gray-800 transition pr-4"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContent;
