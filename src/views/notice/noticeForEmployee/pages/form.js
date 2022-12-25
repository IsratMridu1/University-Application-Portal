import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import Select from "react-select";
import NoticeForEmployee from "../utils/noticeForEmployee";
import useForm from "../utils/useForm";
import * as actions from "../../../../redux/actions/notice/noticeForEmployee/noticeForEmployee";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { ContactlessOutlined } from "@material-ui/icons";
const initialFieldValues = new NoticeForEmployee();

function NoticeForEmployeeCreate({ ...props }) {
  const { addToast } = useToasts();
  const validate = () => {
    return true;
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      if (props.currentId == 0) {
       
        props.createNoticeForEmployee(values, onSuccess);
      } else {
        
        props.updateNoticeForEmployee(props.currentId, values, onSuccess);
      }
    }
  };
  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.noticeForEmployeeList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create Notice For Employee</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label for="basicInput">Enter Notice Title</Label>
              <Input
                id="basicInput"
                placeholder="Notice Title"
                type="text"
                name="name"
                value={values.noticeTitle}
                onChange={handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label for="basicInput">Enter Notice Content</Label>
              <Input
                type="textarea"
                id="basicInput"
                placeholder="Notice Content"
                name="address"
                value={values.noticeContent}
                onChange={handleInputChange}
                className="form-control"
              />
            </FormGroup>
          </CardBody>
        </Card>
        {/* <button
          style={{ marginTop: "3px" }}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button> */}
        <Button.Ripple type="submit" color="primary">
          Submit
        </Button.Ripple>
      </form>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  noticeForEmployeeList: state.noticeForEmployee.list,
});

const mapActionToProps = {
  createNoticeForEmployee: actions.create,
  updateNoticeForEmployee: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(NoticeForEmployeeCreate);
