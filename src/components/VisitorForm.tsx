import "./VisitorForm.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import axios, { AxiosResponse } from "axios";
import ordinal from "ordinal";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { Funding, Checklist } from "./";
import { toggleSelectAll } from "../actions";
import { Action, LocationCheckitem } from "../interfaces";

class VisitorForm extends Component<VisitorFormProps, VisitorFormState> {
  private _id: number;
  private _countdown: number;

  constructor(props: VisitorFormProps) {
    super(props);
    this._id = 0;
    this._countdown = 0;
    this.state = {
      coffee: false,
      form: {
        name: localStorage.getItem("name") === null || props.kiosk ? "" : localStorage.name,
        phone: localStorage.getItem("phone") === null || props.kiosk ? "" : localStorage.phone,
        display: "inline-block",
        btnText: "Check In",
        btnDisabled: false,
      },
      message: {
        success: "",
        error: "",
      },
      followOn: {
        text: "",
        imgSrc: "",
        href: "",
      },
    };
  }

  private _nameChange = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ form: { ...this.state.form, name: e.target.value } });
  };

  private _phoneChange = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3) e.target.value = "+61";
    e.target.value = e.target.value.replace(/[^0-9|+]/, "");
    if (e.target.value.length > 12) e.target.value = e.target.value.substr(0, 12);
    this.setState({ form: { ...this.state.form, phone: e.target.value } });
  };

  private _formSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    this.setState({ form: { ...this.state.form, btnDisabled: true } });
    if (this._id === 0) {
      this.setState({ form: { ...this.state.form, btnText: "Sending..." } });
      axios
        .post(
          "../api/entry/" + this.props.locationID,
          {
            name: this.state.form.name,
            phone: this.state.form.phone,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            this._id = this.props.kiosk ? 0 : parseInt(response.data.data.id);
            localStorage.name = this.state.form.name;
            localStorage.phone = this.state.form.phone;
            this.setState({
              coffee: true,
              form: {
                ...this.state.form,
                display: "none",
                btnText: "Check Out",
                btnDisabled: false,
              },
              message: {
                error: "",
                success: `You are the ${ordinal(
                  this._id
                )} person to check-in using CovidVault. Your support is helping Australia be a safer place as we grapple with the challenges of COVID-19.`,
              },
            });
            if (this.props.kiosk) this._kioskCountdown(6);
          }
        })
        .catch((error) => {
          this.setState({
            form: {
              ...this.state.form,
              btnText: "Check In",
              btnDisabled: false,
            },
            message: {
              success: "",
              error: error.response.data.messages[0],
            },
          });
        });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          btnText: "Sending...",
        },
      });
      axios
        .patch("../api/exit/" + this._id)
        .then((response) => {
          if (response.data.success) {
            this.setState({
              form: {
                ...this.state.form,
                btnText: "Goodbye",
              },
              message: {
                success: "You have been successfully checked out. Goodbye.",
                error: "",
              },
            });
          }
        })
        .catch((error) => {
          this.setState({
            form: {
              ...this.state.form,
              btnDisabled: false,
            },
            message: {
              success: "",
              error: error.response.data.messages[0],
            },
          });
        });
    }
    e.preventDefault();
  };

  private _kioskCountdown = (n?: number): void => {
    const { toggleSelectAll } = this.props;
    if (typeof n === "number") {
      this._countdown = n;
      this._kioskCountdown();
    } else {
      this.setState({ form: { ...this.state.form, btnDisabled: true, btnText: (--this._countdown).toString() } });
      if (this._countdown > 0) setTimeout(this._kioskCountdown, 1000);
      else {
        toggleSelectAll();
        this.setState({
          form: {
            ...this.state.form,
            name: "",
            phone: "",
            display: "inline-block",
            btnText: "Check In",
            btnDisabled: false,
          },
          message: {
            success: "",
            error: "",
          },
        });
      }
    }
  };

  componentDidMount() {
    axios
      .get("../api/followon/" + this.props.locationID)
      .then((response: AxiosResponse) => {
        if (response.data.success) {
          const { data } = response.data;
          data.forEach((followOn:any) => {
            const start = followOn.start === null ? null : new Date(followOn.start);
            const expiry = followOn.expiry === null ? null : new Date(followOn.expiry);
            if ((start === null || start.getTime() < Date.now()) && (expiry === null || expiry.getTime() > Date.now())) {
              this.setState({
                followOn: {
                  text: followOn.text,
                  imgSrc: "https://www.covidvault.com.au/api/controller/render.php?id=" + followOn.id,
                  href: followOn.url,
                },
              });
            }
          });
        }
      })
      .catch((e) => {
        if (typeof e.message !== "string" && e.response.data.statusCode !== 404) console.error(e.response.data.messages[0]);
      });
  }

  render() {
    const { locationChecklist, locationID } = this.props;
    const { coffee, form, message, followOn } = this.state;
    const errorMsg = message.error.length === 0 ? null : <p className="error">{message.error}</p>;
    const successMsg = message.success.length === 0 ? null : <p className="success">{message.success}</p>;
    const followOnText =
      message.success.length > 0 && followOn.text.length > 0 ? (
        <p className="followon">
          <a href={followOn.href}>{followOn.text}</a>
        </p>
      ) : null;
    const followOnImg =
      message.success.length > 0 && followOn.imgSrc.length > 0 ? (
        <a href={followOn.href} className="followOnImg">
          <img style={{ maxWidth: "100%" }} src={`${followOn.imgSrc}`} alt="Promotional link" />
        </a>
      ) : null;
    const submitDisabled =
      form.btnDisabled || locationChecklist.length !== locationChecklist.reduce((a, c) => (a += c.checked ? 1 : 0), 0);
    const checklist = form.btnText === "Check Out" || form.btnText === "Goodbye" || this._countdown > 0 ? null : <Checklist />;
    const demoWarning = (locationID === "8634291744168120016") ? <p className="demo-warning">This is a demonstration page. If you have arrived here by accident, please scan the QR Code again or ask for assistance.</p> : null;
    return (
      <div className="VisitorForm">
        {successMsg}
        {demoWarning}
        <form onSubmit={this._formSubmit}>
          {checklist}
          <TextField
            type="text"
            variant="outlined"
            label="Name"
            placeholder="Name"
            margin="normal"
            className="input"
            style={{ display: form.display }}
            onChange={this._nameChange}
            value={form.name}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />
          <TextField
            type="text"
            variant="outlined"
            label="Phone Number"
            placeholder="Phone Number"
            margin="normal"
            className="input"
            style={{ display: form.display }}
            onChange={this._phoneChange}
            onFocus={this._phoneChange}
            value={form.phone}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />

          <div className="button-container">
            <Button type="submit" variant="contained" size="large" color="primary" disabled={submitDisabled}>
              {form.btnText}
            </Button>
          </div>
        </form>
        {followOnText}
        {followOnImg}
        {errorMsg}
        <p>
          This is an <a href="https://github.com/SimpleProgrammingAU">open-source project</a> to help Australian businesses
          during the COVID-19 recovery. For more details or if you would like to use CovidVault for your business, please visit
          the <a href="https://www.covidvault.com.au/">project homepage</a>.
        </p>
        <Funding display={coffee} />
      </div>
    );
  }
}

const mapStateToProps = (state: VisitorFormMapState) => {
  const { locationID, locationChecklist, selectAll } = state;
  return {
    locationID,
    locationChecklist,
    selectAll,
  };
};

export default connect(mapStateToProps, { toggleSelectAll })(VisitorForm);

interface VisitorFormProps {
  kiosk: boolean;
  locationID: string;
  locationChecklist: LocationCheckitem[];
  selectAll: boolean;
  toggleSelectAll: () => Action<undefined>;
}

interface VisitorFormState {
  coffee: boolean;
  form: {
    name: string;
    phone: string;
    display: string;
    btnText: string;
    btnDisabled: boolean;
  };
  message: {
    success: string;
    error: string;
  };
  followOn: {
    text: string;
    imgSrc: string;
    href: string;
  };
}

interface VisitorFormMapState {
  locationID: string;
  locationChecklist: LocationCheckitem[];
  selectAll: boolean;
}
