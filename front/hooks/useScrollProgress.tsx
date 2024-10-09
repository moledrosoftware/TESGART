import React, { useEffect, useState } from "react";

const useScrollProgress = () => {
    const [completion, setCompletion] = useState(0);

    useEffect(() => {
        const updateScrollCompletion = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;

            if (scrollHeight > 0) {
                // Calculate scroll progress and convert to percentage
                const progress = (currentProgress / scrollHeight) * 100;
                setCompletion(Number(progress.toFixed(2))); // Ensure it's a number
            }
        };

        // Add event listener for scroll events
        window.addEventListener('scroll', updateScrollCompletion);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', updateScrollCompletion);
        };
    }, []); // Empty dependency array ensures this effect runs once on mount

    return completion; // Return the completion percentage
};

export default useScrollProgress;
