import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
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
  render() {
    const { toggleModal, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}> Event Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Event Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={this.state.activeItem.date}
                onChange={this.handleChange}
                placeholder="Enter Event Date"
              />
            </FormGroup>
            <FormGroup>
              <Label for="time">Time</Label>
              <Input
                type="time"
                name="time"
                id="time"
                value={this.state.activeItem.time}
                onChange={this.handleChange}
                placeholder="Enter Event Time"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CustomModal;
