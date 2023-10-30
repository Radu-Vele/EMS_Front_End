export type NewUserData = {
    emailAddress : string,
    firstName : string,
    lastName : string,
    password : string
}

export type UserSignupData = NewUserData & {
    passwordRepeated: string
    isAdmin: boolean
}