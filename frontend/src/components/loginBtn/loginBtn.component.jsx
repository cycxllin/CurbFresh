import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import "./loginBtn.styles.css";

function loginBtn ({name}) {

    let link;

    if (name === "Customer"){
        link = "/customer";
    }
    else if (name === "Manager"){
        link = "/manager";
    }

    return (
        <>
            <Link className="Link" to={`${link}`}> <Button className="Login" id="loginn">{name} </Button> </Link>
        </>
    );
}

export default loginBtn;