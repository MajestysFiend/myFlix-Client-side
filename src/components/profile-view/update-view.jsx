import { Button, Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export const UpdateView = (user,token) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const showPassword = () => {
        var passwordInput = document.getElementById("passwordInput1");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }
    const data = {
        username,
        password,
        email,
        birthday

    };
    const updateInfo = () => {
        fetch(`https://myflixapplication.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                    alert("Your information has been updated!");
                } else {
                    alert("Could not update info");
                }
            })
            .catch((e) => {
                console.log("Error: " + e);
            });
    }

    console.log(user);

    return (
        <div className="update-container" >
            <Row className="justify-content-center customHeight">
                <Col md={10} className="my-auto">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                minlength="4"
                                id="usernameInput2"
                                autocomplete="username"
                                placeholder={user.Username}
                                required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minlength="4"
                                id="passwordInput1"
                                placeholder={user.Password}
                                required />
                        </Form.Group>

                        <Form.Check
                            type="switch"
                            label="Show Password"
                            onClick={showPassword} />
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                minlength="6"
                                id="emailInput2"
                                placeholder={user.Email}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                id="birthdayInput2"
                                placeholder={user.Birthday}
                                required />
                        </Form.Group>
                        <Link to={"/profile"}>
                            <Button type="submit" onClick={updateInfo}>Save Changes</Button>
                        </Link>
                        <Link to={"/profile"}>
                            <Button>Cancel</Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}