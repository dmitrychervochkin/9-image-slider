import "./App.scss";
import { ImageSlider } from "./components";


function App() {
    return (
        <div className="app">
            <ImageSlider infinite arrows dots>
                <ImageSlider.Slide>
                    <img src="./src/assets/img-1.jpg" />
                </ImageSlider.Slide>
                <ImageSlider.Slide>
                    <img src="./src/assets/img-2.jpg" />
                </ImageSlider.Slide>
                <ImageSlider.Slide>
                    <img src="./src/assets/img-3.jpg" />
                </ImageSlider.Slide>
                <ImageSlider.Slide>
                    <img src="./src/assets/img-4.jpg" />
                </ImageSlider.Slide>
                <ImageSlider.Slide>
                    <img src="./src/assets/img-5.jpg" />
                </ImageSlider.Slide>
                <ImageSlider.Slide>
                    <img src="./src/assets/img-6.jpg" />
                </ImageSlider.Slide>
            </ImageSlider>
        </div>
    );
}

export default App;
