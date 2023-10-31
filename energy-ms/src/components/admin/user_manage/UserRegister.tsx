import { useState } from "react";
import SignUpForm from "../../system/SignUpForm";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export function UserRegister(): React.JSX.Element {
    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <>
        <FormGroup>
            <FormControlLabel 
            control={<Checkbox 
                checked={isAdmin} 
                onChange={() => setIsAdmin(!isAdmin)}
            />}
            label="Register user as admin"
            />
        </FormGroup>
        <SignUpForm isAdmin={isAdmin}  goToLoginOnSubmit={false}/>
        </>
    )
}