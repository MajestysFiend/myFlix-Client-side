import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss"
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m._id === movieId);

    return (
        <div className="movieview-container">
            <Row>
                <Col>
                    <img src={movie.ImagePath} alt={movie.Title + " Cover Image"} style={{ width: "100%" }} />
                    <div className="text-center"><small className="picture-reference">Cover art provided by <a href={movie.ImagePath} className="picture-link">Wikipedia</a></small></div>
                </Col>
                <Col>
                    <div>
                        <span className="moviecard-title">{movie.Title}</span>
                    </div>
                    <div>
                        <p className="label">Director</p>
                        <span className="moviecard-director">{movie.Director.Name}</span>
                    </div>
                    <div>
                        <p className="label">Genre</p>
                        <span className="moviecard-genre">{movie.Genre.Name}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <div className="text-center description">
                    <span className="movie-description align-items-center">{movie.Description}</span><br />
                </div>
                <div className="text-center">
                    <Link to={`/`}>
                        <Button className="back-button">Back</Button>
                    </Link>
                </div>
            </Row>
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Director: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};