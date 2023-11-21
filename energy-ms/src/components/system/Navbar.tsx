import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { AuthenticationUtils } from "../../utils/auth/AuthenticationUtils";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useWebSocketContext } from "./WebSocket";

export default function Navbar(): React.JSX.Element {
    const isUserLoggedIn = AuthenticationUtils.isUserLoggedIn()
    const isAdminLoggedIn = AuthenticationUtils.isAdminLoggedIn()
    const navigate = useNavigate()
    const { setSocketUrl } = useWebSocketContext()

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
                    { isAdminLoggedIn && (
                    <>
                        <Button component={Link} to="/adminHome"  sx={{ my: 2, color: 'white', display: 'block' }}> Home</Button>
                        <Button component={Link} to="/usersManagement"  sx={{ my: 2, color: 'white', display: 'block' }}> Manage users</Button>
                        <Button component={Link} to="/devicesManagement"  sx={{ my: 2, color: 'white', display: 'block' }}> Manage devices</Button>
                        <Button component={Link} to="/userDevices"  sx={{ my: 2, color: 'white', display: 'block' }}> Users & devices</Button>
                    </>
                    )}
                    {(isUserLoggedIn || isAdminLoggedIn) && (
                    <>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => {
                            AuthenticationUtils.logOut()
                            // close web socket
                            setSocketUrl('')
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