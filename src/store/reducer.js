import { taskDeleted, taskUpdated } from "./actionTypes";

export default function taskReducer(state, action) {
  switch (action.type) {
    case taskDeleted: {
      const arr = [];
      state.forEach((el) => {
        action.payload.id !== el.id && arr.push(el);
      });
      return arr;
    }

    case taskUpdated: {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
      return newArray;
    }

    default:
      return state;
  }
}
