import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "icon-type" | "sidebarbutton";
  text?: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  setPrimary?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string; // ✅ Add this line
  disabled?: boolean;
}


const VariantClasses = {
    primary: " bg-blue-900 text-white pr-2 rounded-sm hover:ring hover:ring-gray-950 h-9",
    secondary: " bg-blue-300 text-blue-500 px-2 rounded-sm h-9 ",
    "icon-type": " bg-white text-black hover:ring hover:ring-blue-200 h-6 -m-0 rounded-sm pl-1",
    sidebarbutton: `
        bg-gray-100 text-gray-700 px-4 py-2 rounded-lg 
        flex items-center gap-3 shadow-md 
        transition-all duration-300 ease-in-out 
        hover:bg-blue-100 hover:text-blue-900 
        hover:shadow-lg hover:scale-105 
        active:scale-95
    `,
};

const defaultStyles = "cursor-pointer flex items-center hover:ring hover:ring-blue-400";

const Button = ({ variant, text, startIcon, onClick, disabled = false, className = "" }: ButtonProps) => {
  const buttonClasses = `${VariantClasses[variant]} ${defaultStyles} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <div>
      <button
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled}
      >
        {startIcon && <div className="px-2">{startIcon}</div>}
        {text}
      </button>
    </div>
  );
};


export default Button;
