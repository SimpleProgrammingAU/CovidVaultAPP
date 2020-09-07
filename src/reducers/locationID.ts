import { Action } from "../interfaces";

export const locationID = (id: number = 1, action: Action<number>): number => {
  switch (action.type) {
    case "SET_LOCATION_ID":
      return parseInt(action.payload.toString());
  }
  return id;
};
