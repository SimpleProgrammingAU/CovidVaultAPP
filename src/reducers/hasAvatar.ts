import { Action, LocationData } from "../interfaces";

export const hasAvatar = (hasAvatar:boolean = false, action:Action<LocationData>):boolean => {
  switch (action.type) {
    case 'SAVE_LOCATION_DATA':
      return action.payload.avatar;
  }
  return hasAvatar;
}