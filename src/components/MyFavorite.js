import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";

const url ="/favorite";
export const MyFavorite = () => {
  const [favBooks, setFavBooks] = useState([]);
  const history = useHistory();

  const redirect = () => {
    localStorage.clear();
    history.push("/login");
  };

  useEffect(() => {
    fetch(url)
      .then((res) => ( res.status === 401 ? redirect() : res.json()))
      .then((json) => (json ? setFavBooks([...json.books]): setFavBooks([])))
      .catch((err) => console.log("Error fetching books ", err.message));
  }, []);

  return (
    <div className="Content">
      <AppHeader tabValue={1} />
      <Grid container direction="column" alignItems="center">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom>
            Your Favorite Books!
            <span role="img" aria-label="books">
              👍
            </span>
          </Typography>
        </Grid>
        <Grid item>
          {books.map((book, key) => {
            return (
              <Paper key={key} elevation={2} className="Book">
                <Grid container direction="column">
                  <Grid item xs={12}>
                    <Typography variant="h6">{book.name}</Typography>
                  </Grid>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Grid>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};
