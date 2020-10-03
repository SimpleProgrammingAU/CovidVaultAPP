import { Action } from "../interfaces";

export const locationID = (id: string = "1", action: Action<string>): string => {
  switch (action.type) {
    case "SET_LOCATION_ID":
      return action.payload;
  }
  return id;
};
