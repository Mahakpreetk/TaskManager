import { createSlice } from '@reduxjs/toolkit';
import { TaskState } from 'src/models/store';
import { asyncIsFulfilled, asyncIsPending, asyncIsRejected } from '../asyncConfig';
import {
  addTask,
  deleteTaskById, getAllTasks, updateTaskById
} from './taskService';

const initialState: TaskState = {
  message: '',
  tasks: [],
  status: null,
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    clearTaskState: (state) => {
      state.status = null;
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addTask.pending, asyncIsPending)
    builder.addCase(addTask.rejected, asyncIsRejected)
    builder.addCase(addTask.fulfilled, asyncIsFulfilled)
    builder.addCase(getAllTasks.pending, asyncIsPending)
    builder.addCase(getAllTasks.rejected, asyncIsRejected)
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.tasks = action.payload.tasks;
    })
    builder.addCase(updateTaskById.pending, asyncIsPending)
    builder.addCase(updateTaskById.fulfilled, asyncIsFulfilled)
    builder.addCase(updateTaskById.rejected, asyncIsRejected)
    builder.addCase(deleteTaskById.pending, asyncIsPending)
    builder.addCase(deleteTaskById.fulfilled, asyncIsFulfilled)
    builder.addCase(deleteTaskById.rejected, asyncIsRejected)
  }
});

export const { clearTaskState } = taskSlice.actions;
export default taskSlice.reducer;