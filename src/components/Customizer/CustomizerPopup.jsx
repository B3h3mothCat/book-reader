import Button from "../../modules/Button/Button";
import { useState, useEffect } from "react";
import { useCustomizer } from "./CustomizerContext";

export default function CustomizerPopup({ onClose, onSave, isVisible }) {
    const { settings, updateSetting } = useCustomizer()


    function handleSave() {
        onSave(settings)
        onClose()
    }

    return (
        <div
            className="modal-overlay"
            onClick={() => handleSave()}
        >
            <div className={`customizer ${isVisible ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                <form>
                    <div className="customizer-item">
                        <label>
                            <select
                                value={settings.color}
                                onChange={(e) => updateSetting('color', e.target.value)}
                            >
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
                                onChange={(e) => updateSetting('width', e.target.value)}
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
                                onChange={(e) => updateSetting('fontSize', e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="customizer-item">
                        <label>
                            Text position:
                            <button type="button" onClick={() => updateSetting('textPosition', 'center')}>Center</button>
                            <button type="button" onClick={() => updateSetting('textPosition', 'start')}>Start</button>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
}