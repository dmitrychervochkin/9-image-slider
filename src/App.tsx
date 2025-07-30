import "./App.scss";
import { ImageSlider } from "./components";

const IMAGES = [
    { src: "img-1.jpg", title: "Image title", alt: "Alt tag for image" },
    { src: "img-2.jpg", title: "Image title", alt: "Alt tag for image" },
    { src: "img-3.jpg", title: "Image title", alt: "Alt tag for image" },
    { src: "img-4.jpg", title: "Image title", alt: "Alt tag for image" },
    { src: "img-5.jpg", title: "Image title", alt: "Alt tag for image" },
    { src: "img-6.jpg", title: "Image title", alt: "Alt tag for image" },
];

function App() {
    return (
        <div className="app">
            <ImageSlider
                images={IMAGES}
                trigger="click"
                arrows={true}
                dots={true}
            />
        </div>
    );
}

export default App;
