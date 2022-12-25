import React, { useEffect } from "react";
import axios from "axios";
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
import NoticeItem from "../utils/noticeItem";
import useForm from "../utils/useForm";
import * as actions from "../../../../redux/actions/notice/noticeItem/noticeItem";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { ContactlessOutlined } from "@material-ui/icons";
const initialFieldValues = new NoticeItem();

function NoticeItemCreate({ ...props }) {
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
    
        props.createNoticeItem(values, onSuccess);
      } else {
       
        props.updateNoticeItem(props.currentId, values, onSuccess);
      }
    }
  };
  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.noticeItemList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create Notice</CardTitle>
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
                value={values.noticeContents}
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
  noticeItemList: state.noticeItem.list,
});

const mapActionToProps = {
  createNoticeItem: actions.create,
  updateNoticeItem: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(NoticeItemCreate);
