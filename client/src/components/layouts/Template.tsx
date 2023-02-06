import React from 'react'
import Header from './Header'
import { Box } from '@mui/system'
import styled from '@emotion/styled'

type Props = {
    children: React.ReactNode
}

function Template({ children }: Props) {
    return (
        <>
            <Header />
            <TemplateBody>{children}</TemplateBody>
        </>
    )
}
const TemplateBody = styled(Box)`
    width: 90%;
    max-width: 1140px;
    margin: 0 auto;
    height: 100%;
    padding-top: 60px;
`
export default Template
