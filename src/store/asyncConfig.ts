import { BaseState } from "src/models/store";

export const asyncIsPending = (state: BaseState) => {
  state.status = 'pending';
}

export const asyncIsRejected = (state: BaseState, action: any) => {
  console.log('REJECTED:: ', action);
  state.status = 'rejected';
  state.message = action.payload?.message;
}

export const asyncIsFulfilled = (state: BaseState, action: any) => {
  console.log('FULFILLED:: ', action.payload.message);
  state.status = 'fulfilled';
  state.message = action.payload?.message;
}