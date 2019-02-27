import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label
} from "reactstrap";

// This component is the modal for creating and editing events
export function CustomModal(props) {
  const [values, setValues] = useState({
    id: props.activeItem.id ? props.activeItem.id : null,
    title: props.activeItem.title ? props.activeItem.title : "",
    date: props.activeDay ? props.activeDay : "2019-01-01",
    time: props.activeItem.time ? props.activeItem.time : "12:00:00"
  });
  const { activeItem, toggleModal } = props;

  const handleChange = event => {
    let { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = event => {
    if (event) event.preventDefault();
    props.handleSubmit(values);
  };
  const handleDeleteMiddle = (event, item) => {
    if (event) event.preventDefault();
    props.handleDelete(item);
  };
  return (
    <Modal isOpen={true} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}> Event Item </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Enter Event Title"
              required
            />
            <FormFeedback>You need to enter a title</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="date">Date</Label>
            <Input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleChange}
              placeholder="Enter Event Date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="time">Time</Label>
            <Input
              type="time"
              name="time"
              id="time"
              value={values.time}
              onChange={handleChange}
              placeholder="Enter Event Time"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {props.activeItem.id ? (
            <Button
              onClick={event => handleDeleteMiddle(event, activeItem)}
              color="danger"
              className="mr-auto"
            >
              Delete
            </Button>
          ) : null}
          <Button color="success">Save</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export default CustomModal;
