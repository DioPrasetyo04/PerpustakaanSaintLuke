import { useEffect, useState } from "react";

export function useScroll() {
    const [isScrolled, setIsScrolled] = useState(false);

    // use effect digunakan buat animation, scroll, inject js, inject API
    useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 20);
        }
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return { isScrolled };
}
