import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { AuthenticationUtils } from "../utils/auth/AuthenticationUtils";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Navbar(): React.JSX.Element {
    const isUserLoggedIn = AuthenticationUtils.isUserLoggedIn()
    const isAdminLoggedIn = AuthenticationUtils.isAdminLoggedIn()
    const navigate = useNavigate()

    return(
        <>
            <AppBar position="static">
                <Toolbar>
                    {!isUserLoggedIn && !isAdminLoggedIn && (
                    <>
                        <Button component={Link} to="/"  sx={{ my: 2, color: 'white', display: 'block' }}> Home</Button>
                        <Button component={Link} to="/login" sx={{ my: 2, color: 'white', display: 'block' }}> Log in</Button>
                        <Button component={Link} to="/signup" sx={{ my: 2, color: 'white', display: 'block' }}> Sign up</Button>
                    </>
                    )}
                    {(isUserLoggedIn || isAdminLoggedIn) && (
                    <>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => {
                            AuthenticationUtils.logOut()
                            navigate("/")
                        }
                        }>
                            Log out
                        </Button>
                    </>
                    )}
                </Toolbar>
            </AppBar>
            <div id="detail">
                <Outlet />
            </div>
        </>
    )
}