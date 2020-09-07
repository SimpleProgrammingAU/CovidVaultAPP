import { Action, LocationData, LocationCheckitem } from "../interfaces";

export const locationChecklist = (
  checklist: LocationCheckitem[] = [],
  action: Action<LocationData | number | boolean>
): LocationCheckitem[] => {
  switch (action.type) {
    case "SAVE_LOCATION_DATA":
      return (action as Action<LocationData>).payload.statements.map((item) => ({ text: item, checked: false }));
    case "TOGGLE_CHECK_ITEM":
      checklist[action.payload as number].checked = !checklist[action.payload as number].checked;
      return [ ...checklist ];
    case "CHECKLIST_SELECT_ALL":
      checklist.forEach((item) => (item.checked = action.payload as boolean));
      return [ ...checklist ];
  }
  return checklist;
};
