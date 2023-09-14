export type User = {
    [x:string]:any
}
export type LogIn = {
    username:string
    // email:string
    password:string
}
export type CognitoPoolConfig = {
    userPoolId:string
    clientId:string
    client: any
    advancedSecurityDataCollectionFlag: boolean

}
export type CognitoClient = {
    endpoint:string
    fetchOptions:any
}

export type CognitoSignInUserSession = {
    idToken: any,
    refreshToken: any,
    accessToken: any,
    clockDrift: number
}
export type CognitoAttributes = {
    address: any
    birthdate: any
    email: any
    family_name: any
    gender: any
    given_name: any
    locale: any
    middle_name: any
    name: any
    nickname: any
    phone_number: any
    picture: any
    preferred_username: any
    profile: any
    sub: any
    updated_at: any
    website: any
    zoneinfo: any
}

export type CognitoUser = {

    username: string,
    pool: CognitoPoolConfig,
    Session: any,
    client: CognitoClient,
    signInUserSession: CognitoSignInUserSession
    authenticationFlowType: string,
    keyPrefix: string,
    userDataKey: string,
    attributes: CognitoAttributes
    preferredMFA: string
}
