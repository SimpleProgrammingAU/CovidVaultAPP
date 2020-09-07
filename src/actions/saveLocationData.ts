import { Action, LocationData } from '../interfaces'

export const saveLocationData = (data:LocationData):Action<LocationData> => {
  return {
    type: 'SAVE_LOCATION_DATA',
    payload: data
  }
}