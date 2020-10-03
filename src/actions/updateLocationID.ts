import { Action } from "../interfaces"

export const updateLocationID = (id:string):Action<string> => {
  return {
    type: 'SET_LOCATION_ID',
    payload: id
  }
}