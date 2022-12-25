import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/recruitments/application/application";
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
import ApplicationCreate from "./form";
import { TablePagination } from "@material-ui/core";

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

const ApplicationList = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    props.fetchAllApplication();
  }, []);

  const { addToast } = useToasts();

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteApplication(id, () =>
        addToast("Deleted successfully", { appearance: "info" })
      );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div elevation={3}>
      <div className="row">
        <div item className="col-md-4">
          <ApplicationCreate {...{ currentId, setCurrentId }} />
        </div>
        <div item className="col-md-8">
          <h1>Application List</h1>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Candidate FullName</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Short Description</TableCell>
                  <TableCell>Photo</TableCell>
                  <TableCell>Resume</TableCell>
                  <TableCell>Circular</TableCell>
                  <TableCell>Application Status</TableCell>

                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.applicationList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.candidateFullName}</TableCell>
                      <TableCell>{record.email}</TableCell>
                      <TableCell>{record.shortDescription}</TableCell>
                      <TableCell>{record.photographId ?? "N?A"}</TableCell>
                      <TableCell>{record.resumeId ?? "N?A"}</TableCell>
                      <TableCell>{record.circularId ?? "N?A"}</TableCell>
                      <TableCell>{record.applicationStatus ?? "N?A"}</TableCell>
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.applicationList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  applicationList: state.application.list,
});

const mapActionToProps = {
  fetchAllApplication: actions.fetchAll,
  deleteApplication: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ApplicationList));
