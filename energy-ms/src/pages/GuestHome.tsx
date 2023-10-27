import { Typography, 
    Button } from '@mui/material'

function GuestHome(): React.JSX.Element {
    return (
        <>
            <Typography variant='h5'>
                Welcome to the Energy Management System!
            </Typography>
            <br></br>
            <Button variant='contained'>
                Log in
            </Button>
            <Button variant='contained'>
                Sign up
            </Button>
        </>
    )
}

export default GuestHome