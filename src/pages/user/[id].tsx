// 'use client'

import {useRouter} from 'next/router';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {useAppState} from "@/context/AppStateContext";

export default function User() {
    const router = useRouter();

    let {setAppState} = useAppState();

    const handleClickBackToFirstPage = () => {
        router.back()
        // router.push('/users', undefined, {shallow: true})
        // const newUrl = "/users"
        // window.history.replaceState(window.history.state, '', newUrl);
    }

    const handleClickBackWithCache = () => {
        router.back()

        setAppState(prevState => ({
            ...prevState,
            useCache: true
        }));
    }


    return (
        <Container sx={{height: '100vh'}}>
            <h1>Demo: Keep page state when go back</h1>
            <h1>User ID: {router.query.id}</h1>

            <div>
                <Button onClick={handleClickBackWithCache}>Go Back With Cache</Button>
            </div>

            <div>
                <Button onClick={handleClickBackToFirstPage}>Go Back To First Page</Button>
            </div>
        </Container>
    )
}
