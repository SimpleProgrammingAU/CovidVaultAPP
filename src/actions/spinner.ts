import { Action } from "redux"

export const spinner = ():Action => {
  return {
    type: 'TOGGLE_LOADING'
  }
}