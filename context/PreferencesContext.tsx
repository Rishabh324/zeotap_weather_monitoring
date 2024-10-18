import { createContext, useContext, useState, ReactNode } from "react";

interface PreferancesContextType {
    temperatureThreshold: number;
    city: 'Delhi' | 'Mumbai' | 'Chennai' | 'Bangalore' | 'Kolkata' | 'Hyderabad';
    weatherConditionThreshold: string;
    setTemperatureThreshold: (threshold: number) => void;
    setCity: (city: 'Delhi' | 'Mumbai' | 'Chennai' | 'Bangalore' | 'Kolkata' | 'Hyderabad') => void;
    setWeatherConditionThreshold: (condition: string) => void;
}

const PreferencesContext = createContext<PreferancesContextType | undefined>(undefined);

export const PreferencesProvider = ({children}:{children: ReactNode}) => {
    const [temperatureThreshold, setTemperatureThreshold] = useState<number>(35);
    const [city, setCity] = useState<'Delhi' | 'Mumbai' | 'Chennai' | 'Bangalore' | 'Kolkata' | 'Hyderabad'>('Delhi');
    const [weatherConditionThreshold, setWeatherConditionThreshold] = useState<string>('Rain');

    return (
        <PreferencesContext.Provider value={{ city, temperatureThreshold, weatherConditionThreshold, setTemperatureThreshold, setCity,  setWeatherConditionThreshold }}>
            {children}
        </PreferencesContext.Provider>
    );
};

export const usePreferences = () => {
    const context = useContext(PreferencesContext);
    if(!context){
        throw new Error('usePreferences must be used within PreferencesProvider');
    }

    return context;
}