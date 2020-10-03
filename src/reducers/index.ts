import { combineReducers } from "redux";
import { hasAvatar } from "./hasAvatar";
import { locationChecklist } from "./locationChecklist";
import { locationID } from "./locationID";
import { locationName } from "./locationName";
import { selectAll } from "./selectAll";
import { spinner } from "./spinner";

export default combineReducers({
  hasAvatar,
  locationChecklist,
  locationID,
  locationName,
  selectAll,
  spinner,
});
