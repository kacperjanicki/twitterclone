import React, { useContext, useRef, useState, useEffect } from "react";
import { auth } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Alert, Popover } from "react-bootstrap";
import "./loginpage.css";
import { ref, get, set } from "firebase/database";
import { database } from "../firebase.js";
import { UserProvider } from "../App";
import { Link, useNavigate } from "react-router-dom";

const popover = (
    <Popover>
        <Popover.Header>Popover</Popover.Header>
        <Popover.Body>Test</Popover.Body>
    </Popover>
);

const ActualLogin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, local, setlocal } = useContext(UserProvider);
    const { currentUser, setcurrentUser } = useContext(UserProvider);
    const [error, setError] = useState("");
    const [log, setLog] = useState("");
    const { loading, setLoading } = useContext(UserProvider);
    const history = useNavigate();

    if (currentUser) {
        history("/profile");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLog("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history("/home");
            await setLog("Logged in successfully");
        } catch (err) {
            setError("");
            setError(String(err));
        }
        setLoading(false);
    }
    useEffect(() => {
        if (localStorage.getItem("mode") == "dark") {
            if (document.querySelector(".profile")) {
                document.querySelector(".profile").classList.add("switch");
            }
        }
    }, []);

    return (
        <div
            className="cont home main profile"
            id="mainpage"
            style={{ display: "flex", flexDirection: "row", gap: "30px", width: "600px", color: "black" }}
        >
            <div className="login">
                <Card>
                    <Card.Body>
                        <h2>Login</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {log && <Alert variant="success">{log}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required></Form.Control>
                            </Form.Group>
                            <div className="w-100" style={{ position: "absolute", left: "37%" }}>
                                {/*   */}
                            </div>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required></Form.Control>
                            </Form.Group>
                            <Button className="w-100" type="submit" disabled={loading}>
                                Log In
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-3" style={{ color: local }}>
                    Forgot password?<span> </span>
                    <Link to="/forgot-password" style={{ color: local, fontWeight: 500 }}>
                        Click here
                    </Link>
                </div>
                <div className="w-100 text-center mt-2 text-decoration-none" style={{ color: local }}>
                    <Link to={"/signup"} style={{ color: local, fontWeight: 500 }}>
                        <span>Create an account</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ActualLogin;
