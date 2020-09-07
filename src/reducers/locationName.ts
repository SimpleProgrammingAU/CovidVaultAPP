import { Action, LocationData } from "../interfaces";

export const locationName = (name:string = "", action:Action<LocationData>):string => {
  switch (action.type) {
    case 'SAVE_LOCATION_DATA':
      return action.payload.name;
  }
  return name;
}