import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
function NewActor(props) {
  const history = useHistory();
  const [name, setName] = useState();
  const [sex, setSex] = useState("male");
  const [dob, setDob] = useState();
  const [bio, setBio] = useState();
  const submit = () => {
    const actor = {
      name,
      sex,
      dob,
      bio,
    };
    axios
      .post(`http://localhost:3000/api/actors/`, actor)
      .then((res) => {
        console.log(ResizeObserverEntry);
        alert("created successfully");
         axios.get("http://localhost:3000/api/actors").then(({data})=>{
             console.log(data);
             props.updateActors(data);
             props.handleClose();
        });
        return;
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <Modal
        show={props.isShow}
        onHide={props.handleClose}
        animation={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add actor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column sm="3">
                Actor Name
              </Form.Label>
              <Col sm="5">
                <Form.Control
                  type="text"
                  required={true}
                  placeholder="Enter actor name"
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="sex">
              <Form.Label column sm="3">
                Sex
              </Form.Label>
              <Col sm="7">
                <div className="mb-3">
                  <Form.Check
                    inline
                    defaultChecked
                    label="Male"
                    name="group1"
                    type="radio"
                    value="male"
                    onChange={(e) => setSex(e.currentTarget.value)}
                  />
                  <Form.Check
                    inline
                    label="Female"
                    name="group1"
                    type="radio"
                    value="female"
                    onChange={(e) => setSex(e.currentTarget.value)}
                  />
                  <Form.Check
                    inline
                    name="group1"
                    label="others"
                    type="radio"
                    value="others"
                    onChange={(e) => setSex(e.currentTarget.value)}
                  />
                </div>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="dob">
              <Form.Label column sm="3">
                Date of Birth
              </Form.Label>
              <Col sm="5">
                <Form.Control
                  type="date"
                  onChange={(e) => setDob(e.currentTarget.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="bio">
              <Form.Label column sm="3">
                Bio
              </Form.Label>
              <Col sm="5">
                <Form.Control
                  as="textarea"
                  onChange={(e) => setBio(e.currentTarget.value)}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewActor;
