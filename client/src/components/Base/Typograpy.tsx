import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { shades } from '../../styles/theme'

const SHeading = styled(Typography)`
    letter-spacing: -2px;
    display: flex;
    align-items: flex-end;
`
const Dot = styled.div`
    background-color: ${shades.special[100]};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left: 7px;
    margin-bottom: 6px;
`
type Props = {
    title: string
}
export const MainHeading = ({ title }: Props) => {
    return (
        <SHeading variant="h2">
            {title}
            <Dot />
        </SHeading>
    )
}
