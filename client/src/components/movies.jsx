import React, {
    useState,
    useEffect,
} from "react";
import {useHistory} from 'react-router-dom';
import Table from "react-bootstrap/Table";

import "bootstrap/dist/css/bootstrap.min.css";
import editIcon from "../public/icon/edit.svg"
import axios from "axios";

function Movies(props) {
    const [movies, setMovies] = useState([]);
    const history=useHistory();
    useEffect(() => {
        getMovies();
    }, []);
    //get all movies
    const getMovies = async () => {
        const data = await axios.get("http://localhost:3000/api/movies/");
        setMovies(data.data);
    };
    const goToEdit=(id)=>{
        history.push(`/movie?id=${id}`);
    } 
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Poster</th>
                        <th>Moive Name</th>
                        <th>Year of Release</th>
                        <th>Plot</th>
                        <th>Cast</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        movies.map((ele,index)=>{
                            return (
                                <tr key={ele.id}>
                                    <td><img src={`http://localhost:3000/imgs/poster-${ele.poster}`} alt="#"  width="100px" height="150px"/></td>
                                    <td>{ele.name}</td>
                                    <td>{ele.year_of_release}</td>
                                    <td>{ele.plot}</td>
                                    <td>{ele.actors.map(actor=>actor.name).join(", ")}</td>
                                    <td><img src={editIcon} alt="" width="25px" height="25px" onClick={()=>{goToEdit(ele.id)}}/></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Movies;
