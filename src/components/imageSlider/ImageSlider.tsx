import "./imageSlider.scss";
import { Slide } from "./components";
import { ImageSliderContext } from "./image-slider-context";
import React, { cloneElement, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
    children: React.ReactNode;
    infinite: boolean;
    arrows: boolean;
    dots: boolean;
}

const TRANSITION_DURATION = 300;
const GAP = 30;
const CONTAINER_WIDTH = 1000;

export const ImageSlider = ({
    children,
    infinite,
    arrows = true,
    dots = false,
}: ImageSliderProps) => {
    const [width, setWidth] = useState(600);
    const [pages, setPages] = useState<React.ReactNode[]>([]);
    const [offset, setOffset] = useState(
        -(1 * (width + GAP)) + (CONTAINER_WIDTH - width) / 2
    );
    const [clonesCount, setClonesCount] = useState({ head: 0, tail: 0 });
    const [transitionDuration, setTransitionDuration] = useState(300);
    const [activeIndex, setActiveIndex] = useState(0);

    const windowElRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (infinite) {
            const childrenArray = React.Children.toArray(children);
            if (childrenArray.length > 0) {
                setPages([
                    cloneElement(
                        childrenArray[
                            childrenArray.length - 1
                        ] as React.ReactElement,
                        {
                            key: "__clone_head__",
                        }
                    ),
                    ...childrenArray,
                    cloneElement(childrenArray[0] as React.ReactElement, {
                        key: "__clone_tail__",
                    }),
                ]);
                setClonesCount({ head: 1, tail: 1 });
            } else {
                setPages([]);
                setClonesCount({ head: 0, tail: 0 });
            }
            return;
        }
        setPages(React.Children.toArray(children));
    }, [children, infinite]);

    useEffect(() => {
        const resizeHandler = () => {
            const windowElWidth = windowElRef?.current?.offsetWidth;
            if (windowElWidth && windowElWidth < 1000) {
                setWidth(windowElWidth);
                setOffset(-(clonesCount.head * width));
            }
        };

        resizeHandler();
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, [clonesCount, width]);

    useEffect(() => {
        if (transitionDuration === 0) {
            setTimeout(() => {
                setTransitionDuration(TRANSITION_DURATION);
            }, TRANSITION_DURATION);
        }
    }, [transitionDuration]);

    useEffect(() => {
        if (!infinite) return;

        const containerCenter = (CONTAINER_WIDTH - width) / 2;

        const isAtHeadClone = offset === containerCenter;

        if (isAtHeadClone) {
            setTransitionDuration(0);
            setTimeout(() => {
                const lastRealIndex = pages.length - 1 - clonesCount.tail;
                const offsetToLast =
                    -(lastRealIndex * (width + GAP)) + containerCenter;
                setOffset(offsetToLast);
            }, TRANSITION_DURATION);
            return;
        }

        const isAtTailClone =
            offset === -(pages.length - 1) * (width + GAP) + containerCenter;

        if (isAtTailClone) {
            setTransitionDuration(0);
            setTimeout(() => {
                const offsetToFirst =
                    -(clonesCount.head * (width + GAP)) + containerCenter;
                setOffset(offsetToFirst);
            }, TRANSITION_DURATION);
            return;
        }
    }, [offset, infinite, pages, clonesCount, width]);

    const handleLeftArrowClick = () => {
        const childrenArray = React.Children.toArray(children);

        if (activeIndex === 0) {
            setActiveIndex(childrenArray.length - 1);
        } else {
            setActiveIndex(prev => (prev -= 1));
        }

        setOffset(currentOffset => {
            const newOffset = currentOffset + width + GAP;
            return Math.min(newOffset, width / 2);
        });
    };
    const handleRightArrowClick = () => {
        const childrenArray = React.Children.toArray(children);

        if (activeIndex === childrenArray.length - 1) {
            setActiveIndex(0);
        } else {
            setActiveIndex(prev => (prev += 1));
        }

        setOffset(currentOffset => {
            const newOffset = currentOffset - width - GAP;
            // const maxOffset = -(width * (pages.length - 1));
            return newOffset;
        });
    };

    const onDotClicked = (index: number) => {
        setActiveIndex(index);

        if (index < activeIndex) {
            setOffset(currentOffset => {
                const newOffset =
                    currentOffset +
                    (activeIndex - index) * width +
                    (activeIndex - index) * GAP;
                return newOffset;
            });
        } else if (index > activeIndex) {
            setOffset(currentOffset => {
                const newOffset =
                    currentOffset -
                    (index - activeIndex) * width -
                    (index - activeIndex) * GAP;

                return newOffset;
            });
        } else {
            return;
        }
    };

    return (
        <ImageSliderContext.Provider value={{ width }}>
            <div className="image-slider">
                <div className="window" ref={windowElRef}>
                    <div
                        className="all-images-container"
                        style={{
                            gap: `${GAP}px`,
                            transform: `translateX(${offset}px)`,
                            transitionDuration: `${transitionDuration}ms`,
                        }}
                    >
                        {pages}
                    </div>
                    <div
                        className="window-wrapper"
                        style={{
                            width: `${width}px`,
                        }}
                    ></div>
                </div>
                {arrows && (
                    <div className="arrows">
                        <ChevronLeft
                            className="arrow"
                            size="30px"
                            strokeWidth="3px"
                            onClick={handleLeftArrowClick}
                        />
                        <ChevronRight
                            className="arrow"
                            size="30px"
                            strokeWidth="3px"
                            onClick={handleRightArrowClick}
                        />
                    </div>
                )}
                {dots && (
                    <div className="dots">
                        {React.Children.toArray(children).map((_, index) => (
                            <div
                                key={index}
                                className={`dot ${
                                    activeIndex === index ? "current" : ""
                                }`}
                                onClick={() => onDotClicked(index)}
                            ></div>
                        ))}
                    </div>
                )}
            </div>
        </ImageSliderContext.Provider>
    );
};

ImageSlider.Slide = Slide;
