import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
//import * as actions from "../../../../redux/core/country/actions/country";
import {
  div,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const siteSetting = ({ classes, ...props }) => {
  const [checkedPortFolio, setCheckedPortFolio] = React.useState(false);
  const [checkedRecruitment, setCheckedRecruitment] = React.useState(false);
  const [checkedRealTimeChat, setCheckedRealTimeChat] = React.useState(false);
  const [checkedTaskManagement, setCheckedTaskManagement] =
    React.useState(false);
  const [checkedAttendanceByLogin, setCheckedAttendanceByLogin] =
    React.useState(false);

  const handleChangePortFolio = () => {
    setCheckedPortFolio(!checkedPortFolio);
  };

  const handleChangeRecruitment = () => {
    setCheckedRecruitment(!checkedRecruitment);
  };

  const handleChangeRealTimeChat = () => {
    setCheckedRealTimeChat(!checkedRealTimeChat);
  };

  const handleChangeTaskManagement = () => {
    setCheckedTaskManagement(!checkedTaskManagement);
  };

  const handleChangeAttendanceByLogin = () => {
    setCheckedAttendanceByLogin(!checkedAttendanceByLogin);
  };

  return (
    <div>
      <Checkbox
        label="PortFolio"
        value={checkedPortFolio}
        onChange={handleChangePortFolio}
      />
      <Checkbox
        label="Recruitment"
        value={checkedRecruitment}
        onChange={handleChangeRecruitment}
      />
      <Checkbox
        label="Real Time Chat"
        value={checkedRealTimeChat}
        onChange={handleChangeRealTimeChat}
      />
      <Checkbox
        label="Task Management"
        value={checkedTaskManagement}
        onChange={handleChangeTaskManagement}
      />
      <Checkbox
        label="Take Attendance By Login"
        value={checkedTaskManagement}
        onChange={handleChangeAttendanceByLogin}
      />
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   countryList: state.country.list,
// });

// const mapActionToProps = {
//   fetchAllCountry: actions.fetchAll,
//   deleteCountry: actions.Delete,
// };

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(siteSetting));
