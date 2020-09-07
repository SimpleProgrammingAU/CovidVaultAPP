import { combineReducers } from "redux";
import { locationChecklist } from "./locationChecklist";
import { locationID } from "./locationID";
import { locationName } from "./locationName";
import { logoURL } from "./logoURL";
import { selectAll } from "./selectAll";
import { spinner } from "./spinner";

export default combineReducers({
  locationChecklist,
  locationID,
  locationName,
  logoURL,
  selectAll,
  spinner,
});
