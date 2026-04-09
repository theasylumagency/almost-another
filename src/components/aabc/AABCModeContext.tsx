"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Mode = 'lounge' | 'observatory';

interface AABCModeContextType {
    mode: Mode;
    setMode: (mode: Mode) => void;
}

const AABCModeContext = createContext<AABCModeContextType | undefined>(undefined);

export function AABCModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<Mode>('lounge');
    
    return (
        <AABCModeContext.Provider value={{ mode, setMode }}>
            {children}
        </AABCModeContext.Provider>
    );
}

export function useAABCMode() {
    const context = useContext(AABCModeContext);
    if (context === undefined) {
        throw new Error('useAABCMode must be used within an AABCModeProvider');
    }
    return context;
}
