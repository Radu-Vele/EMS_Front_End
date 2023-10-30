import { Box, Typography } from "@mui/material";

export default function PathErrorPage(): React.JSX.Element {
    return(
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="60vh"
        >
            <Typography variant = "h3"> Oops! 🐒</Typography>
            <Typography variant = "h4"> Some error occured 🤷🏽‍♂️</Typography>
        </Box>
    )
}