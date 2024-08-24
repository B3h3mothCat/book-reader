import { createContext, useState, useContext, useEffect } from "react";

const CustomizerContext = createContext()

export const useCustomizer = () => useContext(CustomizerContext)


export default function CustomizerProvider({ children }) {

    const [popupVisible, setPopupVisible] = useState(false);
    const [settings, setSettings] = useState(loadSettings);

    function loadSettings() {
        const savedSettings = localStorage.getItem('customizerSettings');
        if (savedSettings) {
            return JSON.parse(savedSettings)
        }
        return {
            color: '',
            width: '65',
            fontSize: '16',
            textPosition: '',
            textColor: '',
            textIndent: ''
        }
    }

    useEffect(() => {
        localStorage.setItem('customizerSettings', JSON.stringify(settings));
    }, [settings]);


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
