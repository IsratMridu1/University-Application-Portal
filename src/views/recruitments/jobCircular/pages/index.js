import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/recruitments/jobCircular/jobCircular";
import {
  div,
  Paper,
  Checkbox,
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
import JobCircularCreate from "./form";
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

const JobCircularList = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    props.fetchAllJobCircular();
  }, []);

  const { addToast } = useToasts();

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteJobCircular(id, () =>
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
        <div item className="col-md-3">
          <JobCircularCreate {...{ currentId, setCurrentId }} />
        </div>
        <div item className="col-md-9">
          <div className="add-jobCircular">
            <Button
              className="btn-block my-3"
              variant="contained"
              color="primary"
              const
              onClick={() => {
                this.props.addJobCircular("open");
              }}
            >
              Add Task
            </Button>
          </div>
          <h1>JobCircular List</h1>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Short Description</TableCell>
                  <TableCell>Educational Requirements</TableCell>
                  <TableCell>Technical Requirements</TableCell>
                  <TableCell>Job Responsibilities</TableCell>
                  <TableCell>Experience Requirements</TableCell>
                  <TableCell>Vacancy</TableCell>
                  <TableCell>IsVacancy</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.jobCircularList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.title}</TableCell>
                      <TableCell>{record.shortDescription}</TableCell>
                      <TableCell>{record.educationalRequirements}</TableCell>
                      <TableCell>{record.technicalRequirements}</TableCell>
                      <TableCell>{record.jobResponsibilities}</TableCell>
                      <TableCell>{record.experienceRequirements}</TableCell>
                      <TableCell>{record.vacancy}</TableCell>
                      <TableCell>{record.isVacancyNotSpecified}</TableCell>
                      <TableCell>{record.salaryAndCompensation}</TableCell>
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
            count={props.jobCircularList.length}
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
  jobCircularList: state.jobCircular.list,
});

const mapActionToProps = {
  fetchAllJobCircular: actions.fetchAll,
  deleteJobCircular: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(JobCircularList));
