import { TaskStatus } from "./task";

export interface NavTab {
  title: TaskStatus,
  body: React.ReactNode
}