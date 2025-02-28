import { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SideBar from '../components/ui/SideBar';
import { AppIcon1 } from '../icons/AppIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import AddContent from '../components/ui/AddContent';
import { useContent } from '../hooks/useContent';
import LogoutButton from '../components/ui/Logout';

function Dashboard() {
    const [primaryToggle, setPrimary] = useState(false);
    const contents = useContent();
    const [filterType, setFilterType] = useState<string>('all'); // Default: Show all

    function extractYouTubeId(link: string) {
        try {
            const url = new URL(link);
            return url.searchParams.get("v");
        } catch {
            return null;
        }
    }

    function extractTwitterId(link: string) {
        return link.split("/").pop();
    }

    function extractId(link: string) {
        if (link.includes("youtube.com")) return extractYouTubeId(link);
        if (link.includes("x.com") || link.includes("twitter.com")) return extractTwitterId(link);
        return null;
    }

    // Apply Filtering Logic
    const filteredContents = filterType === 'all'
        ? contents
        : contents.filter(content => content.type.toLowerCase() === filterType.toLowerCase());

    return (
        <div className="flex">
            {/* Sidebar with filtering applied to buttons */}
            <SideBar
                heading="MindSnap"
                AppIcon={<AppIcon1 />}
                onFilterSelect={setFilterType} // Sidebar buttons now update filterType
            />

            <div className="flex-1">
                {/* Top Navbar */}
                <div className='fixed top-0 left-52 right-0 z-10 p-3 h-16 flex justify-between bg-white/30 backdrop-blur-md'>
                    <h1 className='text-2xl text-black-700 mt-2 font-bold ml-5'>
                        {filterType === 'all' ? "All Notes" : `${filterType} Notes`}
                    </h1>
                    <div className="flex gap-2 mt-1 mb-2">
                        <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon />} />
                        <Button
                            variant='primary'
                            text='Add Content'
                            startIcon={<PlusIcon />}
                            onClick={() => setPrimary(prev => !prev)}
                        />
                        <LogoutButton />
                    </div>
                </div>

                {/* Filtered Content Display */}
                <div className={`relative min-h-screen pr-2 w-250 ml-60 mr-3 mt-20 columns-3 gap-6 space-y-6 py-2 ${primaryToggle ? "blur-sm" : ""}`}>
                    {filteredContents.length === 0 ? (
                        <div className="text-center text-xl text-gray-600 mt-40 ml-50 w-max">
                            <p>"We are shaped by our thoughts; we become what we think"</p>
                        </div>
                    ) : (
                        filteredContents.map(({ type, title, link, _id }, index) => {
                            const extractedId = extractId(link);
                            return (
                                <Card
                                    key={_id || index}
                                    keyid={_id}
                                    CardIconType={type as any}
                                    title={title}
                                    InputId={extractedId as any}
                                    Description={link}
                                />
                            );
                        })
                    )}
                </div>

                {/* Add Content Modal */}
                {primaryToggle && (
                    <div className='fixed top-0 w-full h-full flex justify-center items-center'>
                        <div className="bg-white-300 size-120 rounded-sm opacity-95 mt-10 ring ring-gray-300 h-min p-3">
                            <AddContent onClick={() => setPrimary(prev => !prev)} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
