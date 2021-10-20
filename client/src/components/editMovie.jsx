import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "query-string";
//import "bootstrap/dist/css/bootstrap.min.css";
import NewActor from './newActor'
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";

function EditForm(props) {
  const location = useLocation();
  const history = useHistory();
  const [movie, setMovie] = useState({});
  const [name, setName] = useState("");
  const [year_of_release, setYear_of_release] = useState("");
  const [plot, setPlot] = useState("");
  const [poster, setPoster] = useState("");
  const [selected, setSelected] = useState([]);
  const [actors, setActors] = useState([]);
  const [file, setFile] = useState();
  const [show,setShow] = useState(false);
  const { id } = qs.parse(location.search);
  const getItem = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/movies/${id}`);
    setMovie(data);
    setName(data.name);
    setYear_of_release(data.year_of_release);
    setPlot(data.plot);
    setPoster(data.poster);
    setSelected(
      data.actors.map(({ id, name }) => {
        return {
          label: name,
          value: id,
        };
      })
    );
  };
  const getActors = async () => {
    const { data } = await axios.get("http://localhost:3000/api/actors");
    setActors(data);
  };
  useEffect(() => {
    if (id) {
      getItem();
    }
    getActors();
  }, []);
  const reset = () => {
    history.goBack();
  };
  const submit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("year_of_release", year_of_release);
    formData.append("plot", plot);
    formData.append("poster", file);
    formData.append("cast", selected.map(ele=>ele.value));
    console.log(formData);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    if (id) {
      axios
        .post(`http://localhost:3000/api/movies/${id}`, formData, config)
        .then((data) => {
          console.log(data);
          alert("updated successfully");
          history.goBack();
          return;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      axios
        .post(`http://localhost:3000/api/movies/`, formData, config)
        .then((data) => {
          console.log(data);
          alert("created successfully");
          history.goBack();
          return;
        }).catch((err) => {
          alert(err.response.data.message);
        });;
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="name">
          <Form.Label column sm="2">
            Movie Name
          </Form.Label>
          <Col sm="5">
            <Form.Control
              type="text"
              required={true}
              placeholder="Enter movie name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="year_of_release">
          <Form.Label column sm="2">
            Year Of Release
          </Form.Label>
          <Col sm="5">
            <Form.Control
              type="text"
              value={year_of_release}
              onChange={(e) => setYear_of_release(e.currentTarget.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="plot">
          <Form.Label column sm="2">
            Plot
          </Form.Label>
          <Col sm="5">
            <Form.Control
              as="textarea"
              value={plot}
              onChange={(e) => setPlot(e.currentTarget.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="poster">
          <Form.Label column sm="2">
            Poster
          </Form.Label>

          <Col sm="5">
            {file || poster ? (
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : `http://localhost:3000/imgs/poster-${poster}`
                }
                width="100px"
                height="150px"
              />
            ) : (
              ""
            )}
            <div>
              <label
                htmlFor="file"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                select image
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                style={{ visibility: "hidden" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="actors">
          <Form.Label column sm="2">
            Cast
          </Form.Label>
          <Col sm="5">
            <MultiSelect
              options={actors.map(({ id, name }) => {
                return {
                  label: name,
                  value: id,
                };
              })}
              labelledBy="Select"
              value={selected}
              onChange={setSelected}
              hasSelectAll={false}
            />
          </Col>
          <Col>
            <Button variant="success" onClick={handleShow}>new actor</Button>
            <NewActor isShow={show} handleClose={handleClose} updateActors={(e)=>{setActors(e)}}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm="2"></Col>
          <Col sm="1">
          <Button type="button" onClick={submit}>
              Submit
            </Button>

          </Col>
          <Col>
          <Button type="reset" onClick={reset} variant="light">
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default EditForm;
