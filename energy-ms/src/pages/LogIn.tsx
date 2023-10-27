import { Box } from "@mui/material";
import LogInForm from "../components/LogInForm";

export default function LogIn(): React.JSX.Element {
    return (
        <div>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="80vh"
            >
                <LogInForm />
            </Box>
        </div>
    )
}
