import {createContext, useContext, useState} from 'react'

const AppStateContext = createContext(undefined)

export function AppStateProvider({children}) {
    const [appState, setAppState] = useState({})
    return (
        <AppStateContext.Provider
            value={{
                appState,
                setAppState,
            }}
        >
            {children}
        </AppStateContext.Provider>
    )
}

export function useAppState() {
    const context = useContext(AppStateContext)

    if (!context)
        throw new Error('useAppState must be used inside a `AppStateProvider`')

    return context
}
