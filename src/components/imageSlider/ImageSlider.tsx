import { useEffect } from "react";
import { useRef } from "react";
import "./imageSlider.scss";

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
            const activeDot = container.querySelector(".current");
            const dots = Array.from(container.querySelectorAll(".dot"));
            const carousel = container?.querySelector(
                "ul"
            ) as HTMLElement | null;
            const activeElement = container?.querySelector(
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

                    const dotIndex = dots.indexOf(dotEl);

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
                    if (carousel && activeElement) {
                        if (indexRef.current === 0) {
                            transformRef.current -= 620 * (images.length - 1);
                            indexRef.current = images.length - 1;
                            carousel.style.transform = `translateX(${transformRef.current}px)`;

                            activeElement.classList.remove("active");
                            carousel.lastElementChild?.classList.add(
                                "active"
                            );

                            activeDot?.classList.remove("current");
                            dots[0]?.classList.add("current");
                        } else {
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
                    }

                    break;
                case "right":
                    if (carousel && activeElement) {
                        if (indexRef.current === images.length - 1) {
                            transformRef.current += 620 * indexRef.current;
                            indexRef.current = 0;
                            carousel.style.transform = `translateX(${transformRef.current}px)`;

                            activeElement.classList.remove("active");
                            carousel.firstElementChild?.classList.add("active");

                            activeDot?.classList.remove("current");
                            dots[0]?.classList.add("current");
                        } else {
                            indexRef.current++;
                            transformRef.current -= 620;
                            carousel.style.transform = `translateX(${transformRef.current}px)`;

                            activeElement.classList.remove("active");
                            (
                                activeElement.nextElementSibling as HTMLElement
                            )?.classList.add("active");

                            activeDot?.classList.remove("current");
                            dots[indexRef.current]?.classList.add("current");
                        }
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
                    <div className="left" data-target="left">
                        {"<"}
                    </div>
                    <div className="right" data-target="right">
                        {">"}
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
