import { Typography, 
    Button, 
    Grid} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function GuestHome(): React.JSX.Element {
    const navigate = useNavigate()

    return (
        <div>
            <Typography variant='h5'>
                Welcome to the Energy Management System!
            </Typography>
            <br></br>
            <Button variant='contained'>
                Log in
            </Button>
            <br></br>
            <br></br>
            <Button variant='contained'>
                Sign up
            </Button>
        </div>
    )
}