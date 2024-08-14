import { useState } from "react";
import Button from "../modules/Button/Button";

export default function CssPopupCustomizer() {
    const [popupVisible, setPopupVisible] = useState(false);
    const [settings, setSettings] = useState({
        color: '',
        width: 55,
        fontSize: 16,
        textPosition: 'start'
    });

    const openPopup = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    const saveSettings = (newSettings) => {
        setSettings(newSettings);
        document.documentElement.style.setProperty('--reader-background-light', newSettings.color);
        closePopup();
    };

    const handleSave = () => {
        saveSettings(settings);
    };

    return (
        <div>
            <Button onClick={openPopup}>Open Customizer</Button>
            {popupVisible && (
                <div className="modal-overlay" onClick={closePopup}>
                    <div className="popup-customizer popup-active" onClick={(e) => e.stopPropagation()}>
                        <form>
                            <div className="customizer-item">
                                <label>
                                    <select value={settings.color} onChange={(e) => setSettings({ ...settings, color: e.target.value })}>
                                        <option value="">Select a color</option>
                                        <option value="#e5cf9d">Good one</option>
                                        <option value="brown">Okay color</option>
                                    </select>
                                </label>
                            </div>
                            <div className="customizer-item">
                                <label>
                                    Container width: {settings.width}%
                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        step="1"
                                        value={settings.width}
                                        onChange={(e) => setSettings({ ...settings, width: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div className="customizer-item">
                                <label>
                                    Font Size: {settings.fontSize}px
                                    <input
                                        type="range"
                                        min="10"
                                        max="50"
                                        step="1"
                                        value={settings.fontSize}
                                        onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div className="customizer-item">
                                <label>
                                    Text position:
                                    <button type="button" onClick={() => setSettings({ ...settings, textPosition: 'center' })}>Center</button>
                                    <button type="button" onClick={() => setSettings({ ...settings, textPosition: 'start' })}>Start</button>
                                </label>
                            </div>
                        </form>
                        <div className="customizer-item">
                            <Button onClick={handleSave}>Save</Button>
                            <Button onClick={closePopup}>Cancel</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}