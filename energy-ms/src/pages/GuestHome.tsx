import { Typography, 
    Button, 
    Grid,
    Box} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function GuestHome(): React.JSX.Element {
    return (
        <div>
            <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="60vh"
            >
                <br></br>
                <Typography variant='h5'>
                    Welcome to the Energy Management System! 
                </Typography>
            </Box>
        </div>
    )
}