import { Box } from "@mui/material";
import SignUpForm from "../components/SignUpForm";

export default function SignUp(): React.JSX.Element {
    return (
        <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="80vh"
        >
            <SignUpForm isAdmin={false}/>
        </Box>
    )
}