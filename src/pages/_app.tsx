import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {AppStateProvider} from "@/context/AppStateContext";

export default function App({Component, pageProps}: AppProps) {
    return (<AppStateProvider>
        <Component {...pageProps} />
    </AppStateProvider>)
}
