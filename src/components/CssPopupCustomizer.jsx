import Button from "../modules/Button/Button";
import { useState } from "react";

export default function CssPopupCustomizer({ onClose, onSave }) {
    const [color, setColor] = useState('');
    const [width, setWidth] = useState('');
    const [fontSize, setFontSize] = useState('');

    function handleSave() {
        onSave({ color, width, fontSize });
        onClose()
    }

    return (

        <div className="popup-customizer">
            <form>
                <label>
                    <select value={color} onChange={(e) => setColor(e.target.value)}>
                        <option value="">Select a color</option>
                        <option value="#e5cf9d">Good one</option>
                        <option value="brown">Okay color</option>
                    </select>
                </label>

                <label>
                    Container width:
                    <input type="text" value={width} onChange={(e) => setWidth(e.target.value)} />
                </label>

                <label>
                    Font Size:
                    <input type="text" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
                </label>
            </form>


            <Button onClick={handleSave}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
        </div>

    )
}