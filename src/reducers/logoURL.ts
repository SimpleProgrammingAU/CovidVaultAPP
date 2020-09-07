import { Action, LocationData } from "../interfaces";

export const logoURL = (url: string = "", action: Action<LocationData>): string => {
  switch (action.type) {
    case "SAVE_LOCATION_DATA":
      return action.payload.logo;
  }
  return url;
};
