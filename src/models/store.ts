import { User } from "./user";

export type AsyncState = 'fulfilled' | 'rejected' | 'pending' | null;

export interface BaseState {
  status: AsyncState,
  message: string,
}

export interface AuthState extends BaseState {
  user: User | null,
}