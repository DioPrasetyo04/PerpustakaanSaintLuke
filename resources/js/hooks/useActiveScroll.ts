import { useEffect, useState } from "react";

export function useActiveScroll() {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        function handleScroll() {
            const sections = [
                "home",
                "services",
                "products",
                "about",
                "contact",
            ];

            for (const section of sections) {
                const element = document.getElementById(section);

                if (element) {
                    const positionSection = element.getBoundingClientRect();
                    if (
                        positionSection.top <= 100 &&
                        positionSection.bottom >= 100
                    ) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        }
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return { activeSection };
}
