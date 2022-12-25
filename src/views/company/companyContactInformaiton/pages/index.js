import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/company/companyContactInformation/companyContactInformation";
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
import CompanyContactInformationCreate from "./form";
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

const CompanyContactInformationList = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    props.fetchAllCompanyContactInformation();
  }, []);

  const { addToast } = useToasts();

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteCompanyContactInformation(id, () =>
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
    <div className="row">
      <div item className="col-md-3">
        <CompanyContactInformationCreate {...{ currentId, setCurrentId }} />
      </div>
      <div item className="col-md-9">
        <h1>Company Branch List</h1>

        <Button
          color="success"
          style={{ marginTop: "3px" }}
          type="submit"
          className="btn btn-primary"
          onClick={CompanyContactInformationCreate}
        >
          Add
        </Button>
        <TableContainer>
          <Table>
            <TableHead className={classes.root}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Telephone Number</TableCell>
                <TableCell>Post Code</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.companyContactInformationList.map((record, index) => {
                return (
                  <TableRow key={index} hover>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.address ?? "N?A"}</TableCell>
                    <TableCell>{record.cityId ?? "N?A"}</TableCell>
                    <TableCell>{record.stateId ?? "N?A"}</TableCell>
                    <TableCell>{record.countryId ?? "N?A"}</TableCell>
                    <TableCell>{record.phoneNumber ?? "N?A"}</TableCell>
                    <TableCell>{record.telephoneNumber ?? "N?A"}</TableCell>
                    <TableCell>{record.postalCode ?? "N?A"}</TableCell>

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
          count={props.companyContactInformationList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  companyContactInformationList: state.companyContactInformation.list,
});

const mapActionToProps = {
  fetchAllCompanyContactInformation: actions.fetchAll,
  deleteCompanyContactInformation: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(CompanyContactInformationList));
