import React from 'react'
import Header from './Header'
import { Box } from '@mui/system'
import styled from '@emotion/styled'
import { PAGE_WIDTH } from '../../contants/message'

type Props = {
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
}

function Template({ children, size = 'md' }: Props) {
    const checkSize = () => {
        switch (size) {
            case 'sm':
                return 80
            case 'md':
                return 90
            case 'lg':
                return 95
            default:
                return 1
        }
    }
    return (
        <>
            <Header />
            <TemplateBody width={`${checkSize()}%`}>{children}</TemplateBody>
        </>
    )
}
const TemplateBody = styled(Box)`
    max-width: ${PAGE_WIDTH}px;
    margin: 0 auto;
    height: 100%;
    padding-top: 60px;
`
export default Template
