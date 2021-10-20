import React from "react";
import Nav from "react-bootstrap/Nav";
import { useHistory, useLocation } from "react-router-dom";
function NavBar(props) {
    const history=useHistory();
    const newMovie=()=>{
        history.push('./movie')
    }
    return (
        <div>
            <Nav fill variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{newMovie()}}>New Moive</Nav.Link>
                </Nav.Item>

            </Nav>
        </div>
    );
}

export default NavBar;
