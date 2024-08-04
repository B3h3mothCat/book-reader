import { createContext, useState, useContext } from "react";

const CustomizerContext = createContext()

export const useCustomizer = () => useContext(CustomizerContext)

export default function CustomizerProvider({ children }) {
    const [popupVisible, setPopupVisible] = useState(false);
    const [settings, setSettings] = useState({
        color: '',
        width: '',
        fontSize: '',
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
    };

    return (
        <CustomizerContext.Provider value={{ popupVisible, settings, openPopup, closePopup, saveSettings }}>
            {children}
        </CustomizerContext.Provider>
    )
}