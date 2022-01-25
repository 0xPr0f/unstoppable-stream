//import './styles/global.css'
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Stream from "./Stream";
import XplayVids from "./XplayVid";

function Navhan() {
  return (
    <>
      <BrowserRouter>
        <div
          className="App overflow-visible"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>{/*  <img width={200} height={200} src="/Meta.png" /> */}</div>

          <div>
            <Link
              style={{
                padding: "0rem 3rem",
                borderWidth: "7px",
                borderColor: "#cf2a7b",
              }}
              className="text-xl text-blue-500 mr-28"
              to="./XplayVid"
            >
              Play Vids
            </Link>
            <Link
              style={{
                padding: "0rem 3rem",
                borderWidth: "7px",
                borderColor: "#cf2a7b",
              }}
              className="text-xl text-blue-500 "
              to="./Stream"
            >
              Stream
            </Link>
          </div>
        </div>
        <div>
          <Switch>
            <Route path="/profile/" component={Stream} exact></Route>
            <Route path="/XplayVid" component={XplayVids}></Route>
            <Route path="/Stream" component={Stream}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}
export default Navhan;
