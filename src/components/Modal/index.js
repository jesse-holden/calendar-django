import React, { Component } from "react";
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
export class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  handleSubmit = event => {
    if (event) event.preventDefault();
    this.props.handleSubmit(this.state.activeItem);
  };
  render() {
    const { activeItem } = this.state;
    const { toggleModal } = this.props;
    const { handleChange, handleSubmit } = this;
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
                value={activeItem.title}
                onChange={handleChange}
                placeholder="Enter Event Title"
                required
              />
              <FormFeedback>This title is invalid!</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={activeItem.date}
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
                value={activeItem.time}
                onChange={handleChange}
                placeholder="Enter Event Time"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="Submit">
              Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default CustomModal;
