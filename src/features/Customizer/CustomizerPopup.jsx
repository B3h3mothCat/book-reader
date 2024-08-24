import Button from "../../modules/Button/Button";
import { useState, useEffect } from "react";
import { useCustomizer } from "./CustomizerContext";
import debounce from "lodash/debounce"
import styled from "styled-components";

const colorPresets = [
    { backgroundColor: '#f2f2f3', textColor: '#212529' },
    { backgroundColor: '#dce5e2', textColor: '#27262b' },
    { backgroundColor: '#f5f1e5', textColor: '#28282a' },
    { backgroundColor: '#e5cf9d', textColor: '#262425' },
    { backgroundColor: '#434751', textColor: '#dbdbdb' },
    { backgroundColor: '#141414', textColor: '#dddddd' },
]

export default function CustomizerPopup({ onClose, onSave }) {
    const { settings, updateSetting } = useCustomizer()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true);
    }, []);

    function handleSave() {
        onSave(settings);
        setIsMounted(false);
        setTimeout(() => {
            onClose();
        }, 250);
    }

    function handleColorPreset(bgColor, txtColor) {
        updateSetting('color', bgColor)
        updateSetting('textColor', txtColor)
    }

    return (
        <Div_ModalOverlay isMounted={isMounted} onClick={handleSave}>
            <Div_Customizer isActive={isMounted} onClick={(e) => e.stopPropagation()}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    paddingLeft: '10%',
                    paddingRight: '5%'
                }}>
                    <h3>Settings</h3>
                    <span onClick={handleSave}>X</span>
                </div>
                <form>
                    <Div_CustomizerItem>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-around",

                        }}>
                            {colorPresets.map((preset, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleColorPreset(preset.backgroundColor, preset.textColor)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px',
                                        marginBottom: '5px',
                                        cursor: 'pointer',
                                        backgroundColor: preset.backgroundColor,
                                        color: preset.textColor,
                                        borderRadius: '35%',
                                        width: '45px',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <span>A</span>
                                </div>
                            ))}
                        </div>

                    </Div_CustomizerItem>

                    <Div_CustomizerItem>
                        <label>
                            <span>Screen desired color:</span>
                            <Input_ColorPicker
                                value={settings.color || "#000000"}
                                onChange={(e) => updateSetting('color', e.target.value)}
                            />
                        </label>
                        <Span_ColorHexCode>{settings.color}</Span_ColorHexCode>
                    </Div_CustomizerItem>

                    <Div_CustomizerItem>
                        <label>
                            <span>Text desired color:</span>
                            <Input_ColorPicker
                                value={settings.textColor || "#000000"}
                                onChange={(e) => updateSetting('textColor', e.target.value)}
                            />
                        </label>
                        <Span_ColorHexCode>{settings.textColor}</Span_ColorHexCode>
                    </Div_CustomizerItem>

                    <Div_CustomizerItem>
                        <label>
                            Container width: {settings.width}%
                            <input
                                type="range"
                                min="10"
                                max="100"
                                step="2"
                                value={settings.width}
                                onChange={(e) => updateSetting('width', e.target.value)}
                            />
                        </label>
                    </Div_CustomizerItem>
                    <Div_CustomizerItem>
                        <label>
                            Font Size: {settings.fontSize}px
                            <input
                                type="range"
                                min="10"
                                max="40"
                                step="1"
                                value={settings.fontSize}
                                onChange={(e) => updateSetting('fontSize', e.target.value)}
                            />
                        </label>
                    </Div_CustomizerItem>
                    <Div_CustomizerItem>
                        <label>
                            Text position:
                            <button type="button" onClick={() => updateSetting('textPosition', 'start')}>Start</button>
                            <button type="button" onClick={() => updateSetting('textPosition', 'center')}>Center</button>
                        </label>
                    </Div_CustomizerItem>

                    <Div_CustomizerItem>
                        <label>
                            Text Indent:
                            <button type="button" onClick={() => updateSetting('textIndent', '0')}>None</button>
                            <button type="button" onClick={() => updateSetting('textIndent', '2')}>Indent</button>
                        </label>
                    </Div_CustomizerItem>
                </form>
            </Div_Customizer>
        </Div_ModalOverlay>
    )
}

const Div_ModalOverlay = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isMounted'
})`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); 
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: opacity 0.25s ease-in-out;
    opacity: ${({ isMounted }) => (isMounted ? '1' : '0')};
`;

const Div_Customizer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isActive'
})`
    position: fixed; 
    top: 0;                 
    right: 0;               
    height: 100%;          
    width: 30%;             
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5); 
    display: flex;
    flex-direction: column; 
    background-color: var(--background-module-light);
    transition: transform 0.25s ease-in-out;
    transform: ${({ isActive }) => (isActive ? 'translateX(0)' : 'translateX(100%)')};
`;

const Div_CustomizerItem = styled.div`
    margin-top: 2%;
`;

const Input_ColorPicker = styled.input.attrs({ type: 'color' })`
        width: 24px;
        height: 24px;
        border: none;
        padding: 0;
        border-radius: 10%;
        background: none;
        cursor: pointer;
        appearance: none; 

&::-webkit-color-swatch {
    border: none; 
    border-radius: 10%;
}

&::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 10%;
}
`;

const Span_ColorHexCode = styled.span`
    font-size: 16px;
    font-weight: 400;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    letter-spacing: 0.5px
`;
