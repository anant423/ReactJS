import React, { Component } from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddDesModal } from "./AddDesModal";
import { EditDesModal } from "./EditDesModal";

export class Designation extends Component {
  constructor(props) {
    super(props);
    this.state = { desg: [], addModalShow: false, editModalShow: false };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch("http://localhost:49902/api/designation")
      .then(response => response.json())
      .then(data => {
        this.setState({ desg: data });
      });
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteDes(desid) {
    if (window.confirm("Are you sure?")) {
      fetch("http://localhost:49902/api/designation/" + desid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    }
  }

  render() {
    const { desg, desid, desname } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>DesignationID</th>
              <th>DesignationName</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {desg.map(des => (
              <tr key={des.DesignationID}>
                <td>{des.DesignationID}</td>
                <td>{des.DesignationName}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          desid: des.DesignationID,
                          desname: des.DesignationName
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      onClick={() => this.deleteDes(des.DesignationID)}
                      variant="danger"
                    >
                      Delete
                    </Button>

                    <EditDesModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      desid={desid}
                      desname={desname}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Designation
          </Button>

          <AddDesModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
}
