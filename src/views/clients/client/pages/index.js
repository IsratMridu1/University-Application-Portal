import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/clients/client/client";
import {
 
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
import ClientCreate from "./form";
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

const ClientList = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    props.fetchAllClient();
  }, [props]);

  const { addToast } = useToasts();

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteClient(id, () =>
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
          <ClientCreate {...{ currentId, setCurrentId }} />
        </div>
        <div item className="col-md-9">
          <div className="add-jobCircular">
            <Button
              className="btn-block my-3"
              variant="contained"
              color="primary"
              const
              onClick={() => {
                this.props.addClient("open");
              }}
            >
              Add Client
            </Button>
          </div>
          <h1>Client List</h1>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>FullName</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Client Logo</TableCell>
                  <TableCell>PhoneNumber</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>AddressLine</TableCell>
                  <TableCell>ClientType</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.clientList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.fullName}</TableCell>
                      <TableCell>{record.email}</TableCell>
                      <TableCell>{record.clientLogo}</TableCell>
                      <TableCell>{record.phoneNumber}</TableCell>
                      <TableCell>{record.country}</TableCell>
                      <TableCell>{record.state}</TableCell>
                      <TableCell>{record.city}</TableCell>
                      <TableCell>{record.addressLine}</TableCell>
                      <TableCell>{record.clientType}</TableCell>
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
            count={props.clientList.length}
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
  clientList: state.client.list,
});

const mapActionToProps = {
  fetchAllClient: actions.fetchAll,
  deleteClient: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ClientList));
