export interface User extends UserCredentials {
  username: string,
}

export interface UserCredentials {
  email_address: string,
  password?: string
}