import "./Checklist.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox, FormControlLabel, FormControl } from "@material-ui/core";
import { LocationCheckitem } from "../interfaces";
import { toggleCheckitem, toggleSelectAll } from "../actions";

class Checklist extends Component<ChecklistProps, ChecklistState> {
  private _checkUpdate = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean, index: number) => {
    const { toggleCheckitem } = this.props;
    toggleCheckitem(index);
  };

  render = () => {
    const { selectAll, locationChecklist } = this.props;
    const selectAllCheckbox = selectAll ? (
      <FormControlLabel label="Confirm all" control={<Checkbox onChange={({ target }) => toggleSelectAll(target.checked)} />} />
    ) : null;
    const list = locationChecklist.map((item, index) => {
      return (
        <FormControlLabel
          label={item.text}
          control={<Checkbox checked={item.checked} key={index} onChange={(e, c) => this._checkUpdate(e, c, index)} />}
          key={index}
        />
      );
    });
    if (locationChecklist.length === 0) return null;

    return (
      <FormControl className="Checklist" component="fieldset">
        <h2>Conditions of entry</h2>
        {list}
        {selectAllCheckbox}
        <p style={{ textAlign: "left" }}>
          If you are unable to confirm all of the above conditions, you are not permitted entry to the premises.
        </p>
      </FormControl>
    );
  };
}

const mapStateToProps = (state: ChecklistMapState) => {
  const { locationChecklist, selectAll } = state;
  return {
    locationChecklist,
    selectAll,
  };
};

export default connect(mapStateToProps, { toggleCheckitem, toggleSelectAll })(Checklist);

interface ChecklistProps {
  locationChecklist: LocationCheckitem[];
  selectAll: boolean;
  toggleCheckitem: Function;
  toggleSelectAll: Function;
}
interface ChecklistState {
  checked: boolean[];
}
interface ChecklistMapState {
  locationChecklist: LocationCheckitem[];
  selectAll: boolean;
}
