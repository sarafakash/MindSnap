import axios from "axios";
import { useEffect, useState } from "react";

interface Content {
    _id: string;
    title: string;
    type: string;
    link: string;
    tags: { _id: string; title: string }[];
    userId: { _id: string; username: string };
}


export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);

    async function fetchData() {
        try {
            const response = await axios.get<{ message: Content[] }>("http://localhost:3000/api/v1/content", {
                headers: { token: localStorage.getItem("token") },
            });
            setContents(response.data.message);
        } catch (error) {
            console.error("Error fetching content:", error);
        }
    }

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 2 * 1000); 
        return () => clearInterval(interval);  

        
    }, []);

    return contents;
}

