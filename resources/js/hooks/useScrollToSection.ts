export function useScrollToSection() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);

        if (!element) return;

        const offset = 80; // tinggi navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    };

    return { scrollToSection };
}
