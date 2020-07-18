import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

export class EditEmpModal extends Component {
  constructor(props) {
    super(props);
    this.state = { deps: [], desg: [], snackbaropen: false, snackbarmsg: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:49902/api/department")
      .then(response => response.json())
      .then(data => {
        this.setState({ deps: data });
      });
    fetch("http://localhost:49902/api/designation")
      .then(response => response.json())
      .then(data => {
        this.setState({ desg: data });
      });
  }

  snackbarClose = event => {
    this.setState({ snackbaropen: false });
  };

  handleSubmit(event) {
    console.log(event.target.DOJ.value);
    event.preventDefault();
    fetch("http://localhost:49902/api/employee", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        EmployeeName: event.target.EmployeeName.value,
        Department: event.target.Department.value,
        Designation: event.target.Designation.value,
        PANNumber: event.target.PANNumber.value,
        AdharNumber: event.target.AdharNumber.value,
        MailID: event.target.MailID.value,
        DOJ: event.target.DOJ.value,
        Address: event.target.Address.value,
        Salary: event.target.Salary.value,
        Gender: event.target.Gender.value,
        MobileNumber: event.target.MobileNumber.value,
        BankName: event.target.BankName.value,
        IFSCCode: event.target.IFSCCode.value,
        BranchName: event.target.BranchName.value,
        BranchAddress: event.target.BranchAddress.value,
        AccountNumber: event.target.AccountNumber.value,
        AccountType: event.target.AccountType.value,
        BaseSalary: event.target.BaseSalary.value,
        NetBankingID: event.target.NetBankingID.value
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
              Edit Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="EmployeeID">
                    <Form.Label>EmployeeID</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeeID"
                      disabled
                      defaultValue={this.props.empid}
                      placeholder="EmployeeID"
                    />
                  </Form.Group>

                  <Form.Group controlId="EmployeeName">
                    <Form.Label>EmployeeName</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeeName"
                      required
                      defaultValue={this.props.empname}
                      placeholder="EmployeeName"
                    />
                  </Form.Group>

                  <Form.Group controlId="Department">
                    <Form.Label>Department</Form.Label>

                    <Form.Control as="select" defaultValue={this.props.depmt}>
                      {this.state.deps.map(dep => (
                        <option key={dep.DepartmentID}>
                          {dep.DepartmentName}
                        </option>
                      ))}
                    </Form.Control>

                    <Form.Group controlId="Designation">
                      <Form.Label>Designation</Form.Label>

                      <Form.Control as="select">
                        {this.state.desg.map(des => (
                          <option key={des.DesignationID}>
                            {des.DesignationName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Form.Group>

                  <Form.Group controlId="PANNumber">
                    <Form.Label>PANNumber</Form.Label>
                    <Form.Control
                      type="text"
                      name="PANNumber"
                      required
                      placeholder="PANNumber"
                    />
                  </Form.Group>

                  <Form.Group controlId="AdharNumber">
                    <Form.Label>AdharNumber</Form.Label>
                    <Form.Control
                      type="text"
                      name="AdharNumber"
                      required
                      placeholder="AdharNumber"
                    />
                  </Form.Group>

                  <Form.Group controlId="MailID">
                    <Form.Label>MailID</Form.Label>
                    <Form.Control
                      type="text"
                      name="MailID"
                      required
                      defaultValue={this.props.mailid}
                      placeholder="MailID"
                    />
                  </Form.Group>

                  <Form.Group controlId="DOJ">
                    <Form.Label>DOJ</Form.Label>
                    <Form.Control
                      type="date"
                      name="DOJ"
                      required
                      defaultValue={this.props.doj}
                      placeholder="DOJ"
                    />
                  </Form.Group>

                  <Form.Group controlId="Address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="Address"
                      required
                      placeholder="Address"
                    />
                  </Form.Group>

                  <Form.Group controlId="Salary">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control
                      type="text"
                      name="Salary"
                      required
                      placeholder="Salary"
                    />
                  </Form.Group>

                  <Form.Group controlId="Gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      type="text"
                      name="Gender"
                      required
                      placeholder="Gender"
                    />
                  </Form.Group>

                  <Form.Group controlId="MobileNumber">
                    <Form.Label>MobileNumber</Form.Label>
                    <Form.Control
                      type="text"
                      name="MobileNumber"
                      required
                      placeholder="MobileNumber"
                    />
                  </Form.Group>

                  <Form.Group controlId="BankName">
                    <Form.Label>BankName</Form.Label>
                    <Form.Control
                      type="text"
                      name="BankName"
                      required
                      placeholder="BankName"
                    />
                  </Form.Group>

                  <Form.Group controlId="IFSCCode">
                    <Form.Label>IFSCCode</Form.Label>
                    <Form.Control
                      type="text"
                      name="IFSCCode"
                      required
                      placeholder="IFSCCode"
                    />
                  </Form.Group>

                  <Form.Group controlId="BranchName">
                    <Form.Label>BranchName</Form.Label>
                    <Form.Control
                      type="text"
                      name="BranchName"
                      required
                      placeholder="BranchName"
                    />
                  </Form.Group>

                  <Form.Group controlId="BranchAddress">
                    <Form.Label>BranchAddress</Form.Label>
                    <Form.Control
                      type="text"
                      name="BranchAddress"
                      required
                      placeholder="BranchAddress"
                    />
                  </Form.Group>

                  <Form.Group controlId="AccountNumber">
                    <Form.Label>AccountNumber</Form.Label>
                    <Form.Control
                      type="text"
                      name="AccountNumber"
                      required
                      placeholder="AccountNumber"
                    />
                  </Form.Group>

                  <Form.Group controlId="AccountType">
                    <Form.Label>AccountType</Form.Label>
                    <Form.Control
                      type="text"
                      name="AccountType"
                      required
                      placeholder="AccountType"
                    />
                  </Form.Group>

                  <Form.Group controlId="BaseSalary">
                    <Form.Label>BaseSalary</Form.Label>
                    <Form.Control
                      type="text"
                      name="BaseSalary"
                      required
                      placeholder="BaseSalary"
                    />
                  </Form.Group>

                  <Form.Group controlId="NetBankingID">
                    <Form.Label>NetBankingID</Form.Label>
                    <Form.Control
                      type="text"
                      name="NetBankingID"
                      required
                      placeholder="NetBankingID"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update Employee
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
