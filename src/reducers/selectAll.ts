import { Action, LocationData } from "../interfaces";

export const selectAll = (selectAll: boolean = false, action: Action<LocationData>): boolean => {
  switch (action.type) {
    case "SAVE_LOCATION_DATA":
      return action.payload.selectAll;
  }
  return selectAll;
};
