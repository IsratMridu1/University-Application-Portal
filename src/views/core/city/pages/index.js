import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/core/city/city";
import {
  div,
 
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

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import CityCreate from "./form";

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

const CityList = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {

    props.fetchAllCity();
  }, [props]);

  const { addToast } = useToasts();

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteCity(id, () =>
        addToast("Deleted successfully", { appearance: "info" })
      );
  };
  return (
    <div elevation={3}>
      <div className="row">
        <div item className="col-md-4">
          <CityCreate {...{ currentId, setCurrentId }} />
        </div>
        <div item className="col-md-8">
          <h1>City List</h1>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>States</TableCell>
                  <TableCell>Employees</TableCell>
                  <TableCell>Clients</TableCell>
                  <TableCell>CompanyBranches</TableCell>
                  <TableCell>CompanyContactInformations</TableCell>
                  <TableCell>ContactInformations</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.cityList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.stateId}</TableCell>
                      <TableCell>
                        N/A
                        {/* <Link to="/stateList">
                          {record.statesCount}
                          </Link */}
                      </TableCell>
                      <TableCell>
                        N/A
                        {/* <Link to="/employeeList">
                      {record.employeesCount}
                        </Link>
                         */}
                      </TableCell>
                      <TableCell>
                        N/A
                        {/* <Link to="/clientList">
                      {record.clientsCount}
                        </Link> */}
                      </TableCell>
                      <TableCell>
                        {/* <Link to="/companyBranchedList">
                      {record.companyBrancheCounts}
                        </Link> */}
                        N/A
                      </TableCell>

                      <TableCell>
                        {/* <Link to="/companyContactInformationsList">
                      {record.companyContctInformationsCount}
                        </Link> */}
                        N/A
                      </TableCell>
                      <TableCell>
                        {/* <Link to="/contactInformationList">
                      {record.contactInformationsCount ?? "N?A"  }
                        </Link> */}
                        N/A
                      </TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <EditIcon
                              color="primary"
                              onClick={() => {
                                setCurrentId(record.id);
                              }}
                            />
                          </Button>
                          <Button>
                            <DeleteIcon
                              color="secondary"
                              onClick={() => onDelete(record.id)}
                            />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cityList: state.city.list,
});

const mapActionToProps = {
  fetchAllCity: actions.fetchAll,
  deleteCity: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(CityList));
