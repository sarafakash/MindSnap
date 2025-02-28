import { ReactElement } from "react";
import { TweetIcon } from "../../icons/TweetIcon";
import { VideoIcon } from "../../icons/VideoIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinkIcon } from "../../icons/LinkIcon";
import Button from "./Button";
import { ShareIcon } from "../../icons/ShareIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import { Tweet } from "react-tweet";
import YouTube from "react-youtube";
import axios from "axios";

interface CardProps {
  CardIconType: keyof typeof CardIcon;
  title: string;
  ShareButton?: ReactElement;
  DeleteButton?: ReactElement;
  InputId?: string;
  Description?: string;
  link?: string; // Link to share for different types
  key?: React.Key | null | undefined;
  keyid?: React.Key | null | undefined;
}

const CardIcon = {
  Tweet: TweetIcon,
  Video: VideoIcon,
  Document: DocumentIcon,
  Link: LinkIcon,
};

const defaultCardStyle =
  "bg-white shadow-lg w-80 h-min flex flex-col rounded-lg overflow-hidden pt-2 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 hover:ring hover:ring-blue-400 ring ring-gray-300";

const Card = ({
  keyid,
  CardIconType,
  title,
  InputId,
  Description,
  link, // The link to share for the content
}: CardProps) => {
  const IconComponent = CardIcon[CardIconType];

  function DeleteContent() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      axios
        .delete("http://localhost:3000/api/v1/content", {
          params: { contentId: keyid },
          headers: { token },
        })
        .then(() => {
          alert("Content Deleted!");
        })
        .catch((error) => {
          console.log("Error while deleting the content:", error);
        });
    } catch (error) {
      console.log("Error while deleting the content!", error);
    }
  }

  // Handle share functionality for different types of content
  function handleShare() {
    let contentLink = "";

    // Set contentLink based on the content type
    if (CardIconType === "Tweet" && InputId) {
      contentLink = `https://twitter.com/i/web/status/${InputId}`; // Construct Tweet URL
    } else if (CardIconType === "Video" && InputId) {
      contentLink = `https://www.youtube.com/watch?v=${InputId}`; // Construct YouTube URL
    } else if (CardIconType === "Link" && link) {
      contentLink = link; // For Link content
    }

    // Open the link in a new tab if it's defined
    if (contentLink) {
      window.open(contentLink, "_blank");
    }
  }

  return (
    <div className={defaultCardStyle}>
      {/* Card Header */}
      <div className="h-1/5 flex gap-2 p-2 justify-between">
        <div className="flex gap-2">
          <div className="text-gray-600">{IconComponent && <IconComponent />}</div>
          <div className="text-black w-44 overflow-hidden text-ellipsis whitespace-nowrap uppercase">
            {title}
          </div>
        </div>
        <div className="flex gap-0.5 ">
          {/* Share Button with onClick */}
          <Button variant="icon-type" startIcon={<ShareIcon />} onClick={handleShare} />
          <Button variant="icon-type" startIcon={<DeleteIcon />} onClick={DeleteContent} />
        </div>
      </div>

      {/* Tweet Section */}
      {CardIconType === "Tweet" && (
        <div className="text-black bg-white flex flex-col justify-center items-center p-2">
          <div className="w-fit h-fit mx-auto light scale-90 -mt-10">
            <Tweet id={InputId as string} />
          </div>
        </div>
      )}

      {/* Video Section */}
      {CardIconType === "Video" && (
        <div className="text-black bg-white flex justify-center items-center p-2">
          <div className="w-full h-auto max-w-xs mx-auto rounded-lg overflow-hidden">
            <YouTube videoId={InputId} opts={{ width: "100%", height: "200" }} />
          </div>
        </div>
      )}

      {/* Link Section */}
      {CardIconType === "Link"  && (
        <div className="text-black bg-white p-3">
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {Description}
          </a>
        </div>
      )}

      {/* Document Section */}
      {CardIconType === "Document" && (
        <div className="text-black bg-white p-3">{Description}</div>
      )}
    </div>
  );
};

export default Card;
