import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const MainView = () => {

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://myflixapplication.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);
            });
    }, [token]);

    if (!user) {
        return (
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user)
                            setToken(token)
                        }} />
                    <SignupView />
                </Col>
            </Row>

        );
    }

    if (selectedMovie) {
        return (
            <Row className="justify-content-md-center">
                <Col md={8} style={{ border: "1px solid black" }}>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => {
                            setSelectedMovie(null);
                        }}
                    />
                </Col>
            </Row>
        );
    }
    if (movies.length === 0) {
        return <div>The movie list is empty</div>;
    }

    return (
        <Row className="justify-content-md-center">
            <div>
                {movies.map((movie) => {
                    return (

                        <Col key={movie._id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>

                    );
                })}
                <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
            </div>
        </Row>
    );
}