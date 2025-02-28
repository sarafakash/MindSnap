import { ReactElement } from "react";
import SideBarElement from "./SideBarElement";

const defaultSideBarStyles = "fixed top-0 bottom-0 bg-white min-h-screen w-52 border-r border-gray-300 shadow-md transition-all duration-300";

interface SideBarProps {
    heading: string;
    AppIcon: ReactElement;
    onFilterSelect: (filter: string) => void; // Accepts filter function
}

function SideBar({ heading, AppIcon, onFilterSelect }: SideBarProps) {
    return (
        <div className={`${defaultSideBarStyles} flex flex-col p-4`}>
            <div className="flex items-center -mt-1">
                <div className="text-blue-900">{AppIcon}</div>
                <div className="text-2xl font-extrabold text-gray-700 hover:text-blue-900 transition-all duration-300 -mr-222 ">
                    {heading}
                </div>
            </div>
            <div className="mt-8">
                <SideBarElement onFilterSelect={onFilterSelect} />
            </div>
        </div>
    );
}

export default SideBar;
