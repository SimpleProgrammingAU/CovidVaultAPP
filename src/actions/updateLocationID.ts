import { Action } from "../interfaces"

export const updateLocationID = (id:number):Action<number> => {
  return {
    type: 'SET_LOCATION_ID',
    payload: id
  }
}