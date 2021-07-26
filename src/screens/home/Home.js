import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  Checkbox,
  Select,
  TextField,
  MenuItem,
  GridList,
  GridListTile,
  GridListTileBar,
  Card,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

import { styles } from "@material-ui/pickers/views/Calendar/Calendar";

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [getGenres, setGenres] = useState([]);
  const [getArtists, setArtists] = useState([]);

  const [findByMovieName, setFindByMovieName] = useState("");
  const [findByMovieStartDate, setFindByMovieStartDate] = useState("");
  const [findByMovieEndDate, setFindByMovieEndDate] = useState("");
  const [findByMovieGenre, setFindByMovieGenre] = useState([]);
  const [findByMovieArtist, setFindByMovieArtist] = useState([]);

  const handleChangeName = (event) => {
    setFindByMovieName(event.target.value);
  };

  const handleChangeGenre = (event) => {
    setFindByMovieGenre(event.target.value);
  };

  const handleChangeArtist = (event) => {
    setFindByMovieArtist(event.target.value);
  };

  const handleChangeStartDate = (event) => {
    setFindByMovieStartDate(event.target.value);
  };

  const handleChangeEndDate = (event) => {
    setFindByMovieEndDate(event.target.value);
  };

  let releasedMoviesListArray = [];
  {
    releasedMovies.map((movie) => {
      releasedMoviesListArray.push(movie);
    });
  }

  let releasedMoviesListArray1 = [];
  {
    releasedMovies.map((movie) => {
      releasedMoviesListArray1.push(movie);
    });
  }

  const applyHandler = () => {
    if (findByMovieName.length > 0) {
      releasedMoviesListArray = releasedMoviesListArray.filter(
        (movie) => movie.title === findByMovieName
      );
    }
    if (findByMovieGenre.length > 0) {
      releasedMoviesListArray = releasedMoviesListArray.filter((movie) =>
        movie.genres.some((x) => findByMovieGenre.includes(x))
      );
    }
    if (findByMovieArtist.length > 0) {
      releasedMoviesListArray = releasedMoviesListArray.filter((movie) =>
        movie.artists.some((x) => findByMovieArtist.includes(x.id))
      );
    }

    if (findByMovieStartDate.length > 0) {
      releasedMoviesListArray = releasedMoviesListArray.filter(
        (movie) => movie.release_date > findByMovieStartDate
      );
    }

    if (findByMovieEndDate.length > 0) {
      releasedMoviesListArray = releasedMoviesListArray.filter(
        (movie) => movie.release_date < findByMovieEndDate
      );
    }
    setReleasedMovies(releasedMoviesListArray);

    if (
      findByMovieName.length == 0 &&
      findByMovieGenre.length == 0 &&
      findByMovieArtist.length == 0 &&
      findByMovieStartDate.length == 0 &&
      findByMovieEndDate.length == 0
    ) {
      setReleasedMovies(releasedMoviesListArray1);
    }
  };
  const getUpcomingMovies = () => {
    return async () => {
      try {
        const rawResponse = await fetch(
          "http://localhost:8085/api/v1/movies?page=1&limit=10&status=published",
          {
            method: "GET",
          }
        );

        const result = await rawResponse.json();

        const upcomingMoviesList = result.movies;

        setUpcomingMovies(upcomingMoviesList);

        if (rawResponse.ok) {
          console.log("Success");
        } else {
          const error = new Error();
          error.message = result.message || "Something went wrong.";
          throw error;
        }
      } catch (e) {
        alert(`Error: ${e.message}`);
      }
    };
  };
  useEffect(getUpcomingMovies(), []);

  const getReleasedMovies = () => {
    return async () => {
      try {
        const rawResponse = await fetch(
          "http://localhost:8085/api/v1/movies?page=1&limit=10&status=released",
          {
            method: "GET",
          }
        );

        const result = await rawResponse.json();
        console.log(result);

        const releasedMoviesList = result.movies;

        setReleasedMovies(releasedMoviesList);

        if (rawResponse.ok) {
          console.log("Success");
        } else {
          const error = new Error();
          error.message = result.message || "Something went wrong.";
          throw error;
        }
      } catch (e) {
        alert(`Error: ${e.message}`);
      }
    };
  };
  useEffect(getReleasedMovies(), []);
  const getMovieGenres = () => {
    return async () => {
      try {
        const rawResponse = await fetch("http://localhost:8085/api/v1/genres", {
          method: "GET",
        });

        const result = await rawResponse.json();

        const movieGenres = result.genres;

        setGenres(movieGenres);

        if (rawResponse.ok) {
          console.log("Success");
        } else {
          const error = new Error();
          error.message = result.message || "Something went wrong.";
          throw error;
        }
      } catch (e) {
        alert(`Error: ${e.message}`);
      }
    };
  };
  useEffect(getMovieGenres(), []);
  const getMovieArtists = () => {
    return async () => {
      try {
        const rawResponse = await fetch(
          "http://localhost:8085/api/v1/artists",
          {
            method: "GET",
          }
        );

        const result = await rawResponse.json();

        const movieArtists = result.artists;

        setArtists(movieArtists);

        if (rawResponse.ok) {
          console.log("Success");
        } else {
          const error = new Error();
          error.message = result.message || "Something went wrong.";
          throw error;
        }
      } catch (e) {
        alert(`Error: ${e.message}`);
      }
    };
  };
  useEffect(getMovieArtists(), []);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      paddingBottom: "20px",
    },
    gridList: {
      flexWrap: "nowrap",
      transform: "translateZ(0)",
    },
    title: {
      color: theme.palette.primary.light,
    },
    cardComponents: {
      margin: theme.spacing(5),
      minWidth: 240,
      maxWidth: 240,
      paddingLeft: "50px",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div className="upcomingMovies">Upcoming Movies</div>
      {/* Movies Grid */}
      <div className={classes.root}>
        <GridList
          cols={6}
          spacing={7}
          cellHeight={250}
          className={classes.gridList}
        >
          {upcomingMovies.map((movie) => (
            <GridListTile style={{ height: "250px" }}>
              <img src={movie.poster_url} alt={movie.title} />
              <GridListTileBar title={movie.title}></GridListTileBar>
            </GridListTile>
          ))}
        </GridList>
      </div>
      {/* Filter Card */}
      <div className="container">
        <div className="releasedMovies">
          <GridList cols={4} space={18}>
            {releasedMovies.map((movie) => (
              <GridListTile
                style={{ cursor: "pointer", height: "350px" }}
                key={movie.poster_url}
              >
                <Link to={"/movie/" + movie.id}>
                  <img
                    srcSet={movie.poster_url}
                    height="350px"
                    width="250px"
                    alt={movie.title}
                  />
                </Link>
                <GridListTileBar
                  title={movie.title}
                  subtitle={<span>Release Date : {movie.release_date}</span>}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className={styles.cardComponents}>
          <Card>
            <div>
              <div className="div_register_input">
                <h3 className={classes.title}>Find Movies By</h3>

                <FormControl className="formControl" margin="dense">
                  <InputLabel htmlFor="my-input">Movie Name</InputLabel>
                  <Input
                    id="movieName"
                    name="movieName"
                    style={{ padding: 10 }}
                    onChange={handleChangeName}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel>Genres</InputLabel>
                  <Select
                    multiple
                    value={findByMovieGenre}
                    onChange={handleChangeGenre}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {getGenres.map((genre) => (
                      <MenuItem key={genre.genre} value={genre.genre}>
                        <Checkbox
                          checked={findByMovieGenre.indexOf(genre.genre) > -1}
                        ></Checkbox>
                        <span>{genre.genre}</span>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className="formControl">
                  <InputLabel>Artists</InputLabel>
                  <Select
                    style={{ padding: 10 }}
                    multiple
                    value={findByMovieArtist}
                    onChange={handleChangeArtist}
                    input={<Input />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {getArtists.map((name) => (
                      <MenuItem
                        key={name.first_name + " " + name.last_name}
                        value={name.first_name + " " + name.last_name}
                      >
                        <Checkbox
                          checked={
                            findByMovieArtist.indexOf(
                              name.first_name + " " + name.last_name
                            ) > -1
                          }
                        ></Checkbox>
                        {name.first_name + " " + name.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className="formControl">
                  <TextField
                    type="date"
                    label=" Release Date Start"
                    style={{ paddingTop: 40 }}
                    onChange={handleChangeStartDate}
                  ></TextField>
                </FormControl>

                <FormControl className="formControl">
                  <TextField
                    type="date"
                    label=" Release Date End"
                    style={{ paddingTop: 40 }}
                    onChange={handleChangeEndDate}
                  ></TextField>
                </FormControl>
              </div>

              <div className="div_button">
                <Button
                  color="primary"
                  variant="contained"
                  className="button"
                  onClick={applyHandler}
                >
                  APPLY
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
