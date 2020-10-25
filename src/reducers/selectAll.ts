import { Action } from "../interfaces";

export const selectAll = (selectAll: boolean = false, action: Action<undefined>): boolean => {
  switch (action.type) {
    case "CHECKLIST_SELECT_ALL_TOGGLE":
      return !selectAll;
  }
  return selectAll;
};
