import { useContext } from "react";
import "./slide.scss";
import { ImageSliderContext } from "../../image-slider-context";

interface SlideProps {
    children: React.ReactNode;
}

export const Slide = ({ children }: SlideProps) => {
    const { width } = useContext(ImageSliderContext);

    return (
        <div
            className="slide"
            style={{
                minWidth: `${width}px`,
                maxWidth: `${width}px`,
            }}
        >
            {children}
        </div>
    );
};
