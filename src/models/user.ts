export interface User extends UserCredentials {
  username: string,
}

export interface UserCredentials {
  old_password?: string
  email_address: string,
  password?: string
  createdAt?: Date
  confirm_password?: string
}