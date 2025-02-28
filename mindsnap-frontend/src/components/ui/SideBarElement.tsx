import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinkIcon } from "../../icons/LinkIcon";
// import { TagIcon } from "../../icons/TagIcon";
import { TweetIcon } from "../../icons/TweetIcon";
import { VideoIcon } from "../../icons/VideoIcon";
import Button from "./Button";

interface SideBarElementProps {
    onFilterSelect: (filter: string) => void;
}

const SideBarElement = ({ onFilterSelect }: SideBarElementProps) => {
    return (
        <div className="flex flex-col gap-3">
            <Button variant="sidebarbutton" text="All" startIcon={<VideoIcon />} onClick={() => onFilterSelect('all')} />
            <Button variant="sidebarbutton" text="Tweets" startIcon={<TweetIcon />} onClick={() => onFilterSelect('Tweet')} />
            <Button variant="sidebarbutton" text="Videos" startIcon={<VideoIcon />} onClick={() => onFilterSelect('Video')} />
            <Button variant="sidebarbutton" text="Documents" startIcon={<DocumentIcon />} onClick={() => onFilterSelect('Document')} />
            <Button variant="sidebarbutton" text="Links" startIcon={<LinkIcon />} onClick={() => onFilterSelect('Link')} />
            {/* <Button variant="sidebarbutton" text="Tags" startIcon={<TagIcon />} onClick={() => onFilterSelect('Tag')} /> */}
        </div>
    );
};

export default SideBarElement;
