import { useEffect } from "react";
import { useRef } from "react";
import "./imageSlider.scss";
import { ArrowLeft, ArrowRight } from "lucide-react";

type ImagesType = {
    src: string;
    alt: string;
    title: string;
};

interface ImageSliderProps {
    images: ImagesType[];
    trigger: "click" | "hover";
    arrows: boolean;
    dots: boolean;
}

export const ImageSlider = ({
    images,
    trigger = "click",
    arrows = true,
    dots = false,
}: ImageSliderProps) => {
    const even = images.length % 2 === 0;
    const activeImageIndex = Math.floor(images.length / 2);

    const transformRef = useRef(even ? -310 : 0);
    const indexRef = useRef(activeImageIndex);

    useEffect(() => {
        const container = document.querySelector(".image-slider");
        if (!container) return;

        const handleMouseOver = (event: Event) => {
            const target = event.target as HTMLElement | null;
            if (target && target.dataset && target.dataset.target === "img") {
                target.classList.add("zoom");
            }
        };

        const handleMouseOut = (event: Event) => {
            const target = event.target as HTMLElement | null;
            if (target && target.dataset && target.dataset.target === "img") {
                target.classList.remove("zoom");
            }
        };

        const handleClick = (event: Event) => {
            const target = event.target as HTMLElement | null;
            const activeDot = document.querySelector(".current");
            const dots = Array.from(container.querySelectorAll(".dot"));
            const carousel = container.querySelector(
                "ul"
            ) as HTMLElement | null;
            const activeElement = container.querySelector(
                ".active"
            ) as HTMLElement | null;

            if (!target || !target.dataset) return;

            switch (target.dataset.target) {
                case "img":
                    if (trigger !== "hover") {
                        target.classList.toggle("zoom");
                    }
                    break;
                case "dot": {
                    if (!carousel || !activeElement) return;

                    const dotEl = (event.target as HTMLElement).closest(
                        ".dot"
                    ) as HTMLElement | null;
                    if (!dotEl) return;

                    const dots = Array.from(container.querySelectorAll(".dot"));
                    const dotIndex = dots.indexOf(dotEl);
                    const activeDot = container.querySelector(".current");

                    if (
                        dotIndex === -1 ||
                        dotIndex === indexRef.current ||
                        !activeDot
                    )
                        return;

                    const getTranslateX = (newIndex: number) => {
                        const itemWidth = 600;
                        const gap = 20;
                        const offset = newIndex - indexRef.current;
                        return (
                            transformRef.current - offset * (itemWidth + gap)
                        );
                    };

                    transformRef.current = getTranslateX(dotIndex);
                    indexRef.current = dotIndex;
                    carousel.style.transform = `translateX(${transformRef.current}px)`;

                    activeElement.classList.remove("active");
                    activeDot.classList.remove("current");

                    const items = carousel.querySelectorAll("li");
                    items[dotIndex]?.classList.add("active");
                    dots[dotIndex]?.classList.add("current");
                    break;
                }
                case "left":
                    if (indexRef.current !== 0 && carousel && activeElement) {
                        indexRef.current--;
                        transformRef.current += 620;
                        carousel.style.transform = `translateX(${transformRef.current}px)`;

                        activeElement.classList.remove("active");
                        if (activeElement.previousElementSibling) {
                            (
                                activeElement.previousElementSibling as HTMLElement
                            ).classList.add("active");
                        }

                        activeDot?.classList.remove("current");
                        dots[indexRef.current]?.classList.add("current");
                    }
                    break;
                case "right":
                    if (
                        indexRef.current !== images.length - 1 &&
                        carousel &&
                        activeElement
                    ) {
                        indexRef.current++;
                        transformRef.current -= 620;
                        carousel.style.transform = `translateX(${transformRef.current}px)`;

                        activeElement.classList.remove("active");
                        if (activeElement.nextElementSibling) {
                            (
                                activeElement.nextElementSibling as HTMLElement
                            ).classList.add("active");
                        }

                        activeDot?.classList.remove("current");
                        dots[indexRef.current]?.classList.add("current");
                    }
                    break;
            }
        };

        if (trigger === "hover") {
            container.addEventListener("mouseover", handleMouseOver);
            container.addEventListener("mouseout", handleMouseOut);
        }
        container.addEventListener("click", handleClick);

        return () => {
            if (trigger === "hover") {
                container.removeEventListener("mouseover", handleMouseOver);
                container.removeEventListener("mouseout", handleMouseOut);
            }
            container.removeEventListener("click", handleClick);
        };
    }, [trigger, images.length, even, activeImageIndex]);

    return (
        <div className="image-slider">
            <ul className={even ? "even" : ""}>
                {images.map((image, index) => (
                    <li
                        key={image.src}
                        className={index === activeImageIndex ? "active" : ""}
                    >
                        <h3>{image.title}</h3>

                        <img
                            data-target="img"
                            src={`./src/assets/${image.src}`}
                            alt={image.alt}
                        />
                    </li>
                ))}
            </ul>
            {arrows && (
                <div className="arrows">
                    <div className="left">
                        <ArrowLeft
                            size="30px"
                            strokeWidth="3px"
                            data-target="left"
                        />
                    </div>
                    <div className="right">
                        <ArrowRight
                            size="30px"
                            strokeWidth="3px"
                            data-target="right"
                        />
                    </div>
                </div>
            )}
            {dots && (
                <div className="dots">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${
                                index === activeImageIndex ? "current" : ""
                            }`}
                            data-target="dot"
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
};
