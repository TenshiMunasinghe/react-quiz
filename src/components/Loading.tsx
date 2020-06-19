import React from 'react'
import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'

interface Props {}

const Loading = () => {
    return (
        <Container>
            <CircularProgress />
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    z-index: 999;
`

export default Loading
