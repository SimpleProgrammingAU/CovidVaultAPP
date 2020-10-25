import { Action } from "../interfaces";

export const locationID = (id: string = "2648426503770809307", action: Action<string>): string => {
  switch (action.type) {
    case "SET_LOCATION_ID":
      return action.payload;
  }
  return id;
};
