export interface User extends UserCredentials {
  _id?: string
  username: string,
  createdAt?: Date
  updatedAt?: Date
}

export interface UserCredentials {
  old_password?: string
  email_address: string,
  password?: string
  confirm_password?: string
}