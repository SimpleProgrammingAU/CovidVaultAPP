import { Action } from "../interfaces";

export const toggleSelectAll = (): Action<undefined> => {
  return {
    type: "CHECKLIST_SELECT_ALL_TOGGLE",
    payload: undefined,
  };
};
