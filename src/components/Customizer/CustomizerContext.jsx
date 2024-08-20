import { createContext, useState, useContext } from "react";

const CustomizerContext = createContext()

export const useCustomizer = () => useContext(CustomizerContext)


export default function CustomizerProvider({ children }) {

    const [popupVisible, setPopupVisible] = useState(false);
    const [settings, setSettings] = useState({
        color: '',
        width: '',
        fontSize: '',
        textPosition: '',
        textColor: '',
    });

    const updateSetting = (key, value) => {
        setSettings((prevSettings) => {
            const newSettings = {
                ...prevSettings,
                [key]: value,
            };

            if (newSettings.color) {
                document.documentElement.style.setProperty('--reader-background-light', newSettings.color);
            }

            return newSettings;
        })
    }

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
        <CustomizerContext.Provider value={{
            settings,
            saveSettings,
            popupVisible,
            openPopup,
            closePopup,
            updateSetting
        }}>
            {children}
        </CustomizerContext.Provider>
    )
}
