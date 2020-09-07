import { Action } from "../interfaces"

export const toggleCheckitem = (index:number):Action<number> => {
  return {
    type: 'TOGGLE_CHECK_ITEM',
    payload: index
  }
}