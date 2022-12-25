import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/notice/noticeItem/noticeItem";
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
import NoticeItemCreate from "./form";
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

const NoticeItemList = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    props.fetchAllNoticeItem();
  }, []);

  const { addToast } = useToasts();

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteNoticeItem(id, () =>
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
        <NoticeItemCreate {...{ currentId, setCurrentId }} />
      </div>
      <div item className="col-md-9">
        <h1>Notice Item List</h1>

        <Button
          color="success"
          style={{ marginTop: "3px" }}
          type="submit"
          className="btn btn-primary"
          onClick={NoticeItemCreate}
        >
          Add
        </Button>
        <TableContainer>
          <Table>
            <TableHead className={classes.root}>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Details</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.noticeItemList.map((record, index) => {
                return (
                  <TableRow key={index} hover>
                    <TableCell>{record.noticeTitle}</TableCell>
                    <TableCell>{record.noticeContents ?? "N?A"}</TableCell>

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
          count={props.noticeItemList.length}
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
  noticeItemList: state.noticeItem.list,
});

const mapActionToProps = {
  fetchAllNoticeItem: actions.fetchAll,
  deleteNoticeItem: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(NoticeItemList));
