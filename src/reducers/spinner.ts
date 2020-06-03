import { Action } from "redux";

export const spinner = (loading:boolean = false, action:Action):boolean => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return !loading;
  }
  return loading;
}