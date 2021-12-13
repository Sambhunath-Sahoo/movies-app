import Navbar from "../src/components/Navbar";
import Banner from "../src/components/Banner";
import Movies from "../src/components/Movies";
import Favourite from "../src/components/Favourite";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact render={(props) => (
          <>
            <Banner {...props} />
            <Movies {...props} />
          </>
        )}
        />
        <Route path="/favourites" component={Favourite} />
      </Switch>
    </Router>
  );
}

export default App;
