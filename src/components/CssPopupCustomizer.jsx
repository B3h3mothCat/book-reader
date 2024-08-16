import Button from "../modules/Button/Button";
import { useState, useEffect } from "react";

export default function CssPopupCustomizer({ onSave, onClose }) {
    const [color, setColor] = useState('');
    const [width, setWidth] = useState(55);
    const [fontSize, setFontSize] = useState(16);
    const [textPosition, setTextPosition] = useState('start')

    const [isMounted, setIsMounted] = useState(false);



    function handleSave() {
        onSave({ color, width, fontSize, textPosition });

    }



    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div
            onClick={() => handleSave()}
        >
            <div className={`customizer ${isMounted ? 'active' : ''}`}
            //  id="customizer"
            >
                <form>
                    <div className="customizer-item">
                        <label>
                            <select value={color} onChange={(e) => setColor(e.target.value)}>
                                <option value="">Select a color</option>
                                <option value="#e5cf9d">Good one</option>
                                <option value="brown">Okay color</option>
                            </select>
                        </label>
                    </div>
                    <div className="customizer-item">
                        <label>
                            Container width: {width}%
                            <input
                                type="range"
                                min="10"
                                max="100"
                                step="1"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="customizer-item">
                        <label>
                            Font Size: {fontSize}px
                            <input
                                type="range"
                                min="10"
                                max="50"
                                step="1"
                                value={fontSize}
                                onChange={(e) => setFontSize(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="customizer-item">
                        <label>
                            Text position:
                            <button type="button" onClick={() => setTextPosition('center')}>Center</button>
                            <button type="button" onClick={() => setTextPosition('start')}>Start</button>
                        </label>
                    </div>
                </form>

                <div className="customizer-item">
                    {/* <Button onClick={handleSave}>Save</Button> */}
                </div>

            </div>
        </div>


    )
}