import React, { Component } from "react";
import { movies } from "./getMovies";

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: "",
            parr: [1],
        };
    }

    render() {
        let movie = movies.results;

        return (
            <>
                {movie.length === 0 ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-center">
                            <strong>Trending</strong>
                        </h3>

                        <div className="movies-list">
                            {movie.map((movieObj, key) => (
                                <div
                                    className="card movies-card"
                                    onMouseEnter={() => this.setState({ hover: movieObj.id })}
                                    onMouseLeave={() => this.setState({ hover: "" })}
                                    key={key}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                        alt={movieObj.title}
                                        className="card-img-top movies-img"
                                    />

                                    <h5 className="card-title movies-title">
                                        {movieObj.original_title}
                                    </h5>

                                    <div
                                        className="button-wrapper"
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {this.state.hover === movieObj.id && (
                                            <a className="btn btn-primary movies-button">
                                                Go Somewhere
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            className="infinite-loader"
                            style={{ display: "flex", justifyContent: "center" }}
                        >
                            <h2>Load More Movies .........................</h2>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            {" "}
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link">Previous</a>
                                    </li>
                                    {this.state.parr.map((value, key) => (
                                        <li className="page-item" key={key}>
                                            <a className="page-link">{value}</a>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <a className="page-link">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
