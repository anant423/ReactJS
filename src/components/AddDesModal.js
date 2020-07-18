import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

export class AddDesModal extends Component {
  constructor(props) {
    super(props);

    this.state = { deps: [], snackbaropen: false, snackbarmsg: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:49902/api/department")
      .then(response => response.json())
      .then(data => {
        this.setState({ deps: data });
      });
  }

  snackbarClose = event => {
    this.setState({ snackbaropen: false });
  };

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:49902/api/designation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        DesignationID: null,
        DesignationName: event.target.DesignationName.value,
        DepartmentName: event.target.DepartmentName.value
      })
    })
      .then(res => res.json())
      .then(
        result => {
          //alert(result);
          this.setState({ snackbaropen: true, snackbarmsg: result });
        },
        error => {
          //alert('Failed')
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
  }

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
            </IconButton>
          ]}
        />

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Designation
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="DesignationtName">
                    <Form.Label>DesignationName</Form.Label>
                    <Form.Control
                      type="text"
                      name="DesignationName"
                      required
                      placeholder="DesignationName"
                    />
                  </Form.Group>

                  <Form.Group controlId="Department">
                    <Form.Label>Department</Form.Label>

                    <Form.Control as="select">
                      {this.state.deps.map(dep => (
                        <option key={dep.DepartmentID}>
                          {dep.DepartmentName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Add Designation
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
