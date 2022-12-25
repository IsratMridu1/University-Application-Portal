import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../redux/core/department/actions/department";
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
import DepartmentCreate from "./form";

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

const DepartmentList = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);
  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    setDepartmentList(props.fetchAllDepartment());
  }, [departmentList]);

  const { addToast } = useToasts();

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteDepartment(id, () =>
        addToast("Deleted successfully", { appearance: "info" })
      );
  };
  return (
    <div elevation={3}>
      <div className="row">
        <div item className="col-md-4">
          <DepartmentCreate {...{ currentId, setCurrentId }} />
        </div>
        <div item className="col-md-8">
          <h1>Department List</h1>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Designations</TableCell>
                  <TableCell>Employees</TableCell>
                  <TableCell>EmployeementTerms</TableCell>

                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.departmentList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>
                        <Link to="/stateList">
                          {record.designationCount ?? "N/A"}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to="/employeeList">
                          {record.employeesCount ?? "N/A"}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to="/clientList">
                          {record.employeementTermsCount ?? "N/A"}
                        </Link>
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
  departmentList: state.department.list,
});

const mapActionToProps = {
  fetchAllDepartment: actions.fetchAll,
  deleteDepartment: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DepartmentList));
