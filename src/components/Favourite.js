import React, { Component } from "react";

export default class Favourite extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currgen: "All Genres",
            movies: [],
            currText: "",
            limit: 5,
            currPage: 1,
        };
    }

    //
    componentDidMount() {
        let genreids = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-Fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
        };
        let data = JSON.parse(localStorage.getItem("movies-app") || "[]");
        let temp = [];
        data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        });
        temp.unshift("All Genres");
        this.setState({
            genres: [...temp],
            movies: [...data],
        });
    }

    // setting the current-genre when user click genre filter
    handleGenreChange = (genre) => {
        this.setState({
            currgen: genre,
        });
    };

    // sorting movies in popularity descending order
    sortPopularityDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objB.popularity - objA.popularity;
        });
        this.setState({
            movies: [...temp],
        });
    };

    // sorting movies in popularity ascending order
    sortPopularityAsc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objA.popularity - objB.popularity;
        });
        this.setState({
            movies: [...temp],
        });
    };

    // sorting movies in rating descending order
    sortRatingDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objB.vote_average - objA.vote_average;
        });
        this.setState({
            movies: [...temp],
        });
    };

    // sorting movies in rating ascending order
    sortRatingAsc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objA.vote_average - objB.vote_average;
        });
        this.setState({
            movies: [...temp],
        });
    };

    // setting current page for pagination(to apply formula later)
    handlePageChange = (page) => {
        this.setState({
            currPage: page,
        });
    };

    // deleting movie from favourite list
    handleDelete = (id) => {
        let newarr = [];
        newarr = this.state.movies.filter((movieObj) => movieObj.id != id);
        this.setState({
            movies: [...newarr],
        });
        localStorage.setItem("movies-app", JSON.stringify(newarr));
    };

    render() {
        let genreids = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-Fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
        };

        // array which are going to filter and print
        let filterarr = [];

        // filtering the array depending on search
        if (this.state.currText === "") {
            filterarr = this.state.movies;
        } else {
            filterarr = this.state.movies.filter((movieObj) => {
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase());
            });
        }

        // filtering based on current genere
        if (this.state.currgen != "All Genres") {
            filterarr = this.state.movies.filter(
                (movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currgen
            );
        }

        // pagination logic
        let pages = Math.ceil(filterarr.length / this.state.limit);
        let pagesarr = [];
        for (let i = 1; i <= pages; i++) {
            pagesarr.push(i);
        }
        let si = (this.state.currPage - 1) * this.state.limit;
        let ei = si + this.state.limit;
        filterarr = filterarr.slice(si, ei);

        return (
            <div>
                <>
                    <div className="main">
                        <div className="row">
                            <div className="col-lg-3 col-sm-12">
                                <ul className="list-group favourites-genres">
                                    {this.state.genres.map((genre, index) =>
                                        this.state.currgen == genre ? (
                                            <li
                                                className="list-group-item"
                                                style={{
                                                    background: "#3f51b5",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                }}
                                                key={index}
                                            >
                                                {genre}
                                            </li>
                                        ) : (
                                            <li
                                                className="list-group-item"
                                                style={{ background: "white", color: "#3f51b5" }}
                                                onClick={() => this.handleGenreChange(genre)}
                                                key={index}
                                            >
                                                {genre}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="col-lg-9 favourites-table col-sm-12">
                                <div className="row">
                                    <input
                                        type="text"
                                        className="input-group-text col"
                                        placeholder="Search"
                                        value={this.state.currText}
                                        onChange={(e) =>
                                            this.setState({ currText: e.target.value })
                                        }
                                    />
                                    <input
                                        type="number"
                                        className="input-group-text col"
                                        placeholder="Rows Count"
                                        value={this.state.limit}
                                        onChange={(e) => this.setState({ limit: e.target.value })}
                                    />
                                </div>
                                <div className="row">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col">
                                                    <i
                                                        className="fas fa-sort-up"
                                                        onClick={this.sortPopularityDesc}
                                                    />
                                                    Popularity
                                                    <i
                                                        className="fas fa-sort-down"
                                                        onClick={this.sortPopularityAsc}
                                                    ></i>
                                                </th>
                                                <th scope="col">
                                                    <i
                                                        className="fas fa-sort-up"
                                                        onClick={this.sortRatingDesc}
                                                    ></i>
                                                    Rating
                                                    <i
                                                        className="fas fa-sort-down"
                                                        onClick={this.sortRatingAsc}
                                                    ></i>
                                                </th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filterarr.map((movieObj, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                                            alt={movieObj.title}
                                                            style={{ width: "5rem" }}
                                                        />{" "}
                                                        {movieObj.original_title}
                                                    </td>
                                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            onClick={() => this.handleDelete(movieObj.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        {pagesarr.map((page, index) => (
                                            <li key={index} className="page-item">
                                                <a
                                                    className="page-link"
                                                    onClick={() => this.handlePageChange(page)}
                                                >
                                                    {page}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        );
    }
}
