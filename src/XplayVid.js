import React from "react";
import ReactPlayer from "react-player";
import { Button } from "@material-ui/core";
import Head from "next/head";
import { AiFillFastForward } from "react-icons/ai";

class XplayVids extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputvalue: "",
      url: "",
    };
  }
  handleChange = (event) => {
    this.setState({ inputvalue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //  console.log("clicked");
    this.setState({ url: this.state.inputvalue });
  };

  render() {
    return (
      <>
        <br />
        <div id="reactPlayer" className="grid place-items-center reactPlayer">
          <header classame="grid place-items-center ReactP">
            <div className="grid place-items-center ">
              <form onSubmit={this.handleSubmit}>
                <input
                  onChange={this.handleChange}
                  required
                  style={{
                    width: "310px",
                    height: "50px",
                  }}
                  className="border rounded p-3"
                  type="text"
                  placeholder="Input video URL"
                />
                <Button
                  onClick={this.handleSubmit}
                  variant="outlined"
                  color="primary"
                  style={{
                    color: "#fff",
                    backgroundImage:
                      "linear-gradient(to right,#3f50b5,#cf2a7b)",

                    margin: "40px",
                  }}
                  className="rounded py-2 px-12"
                >
                  Play Video
                </Button>
              </form>
              <p
                style={{
                  overflow: "hidden",
                  // display: 'flex',
                  position: "relative",
                  left: "30px",
                }}
              >
                NOTE: The url of the video must be correct and surpported, if
                not it may cause the system to crash.
              </p>
              <p
                style={{
                  position: "relative",
                  left: "30px",
                }}
              >
                Supported URL includes YouTube, Facebook, Twitch, SoundCloud,
                Streamable, Vimeo, Wistia, Mixcloud, DailyMotion and Kaltura.{" "}
              </p>
            </div>
            {this.state.url ? (
              <ReactPlayer
                playing
                width="700px"
                height="400px"
                style={{
                  margin: "50px",
                  display: "flex",
                  left: "40px",
                }}
                controls
                url={this.state.url}
              />
            ) : null}
          </header>
        </div>
      </>
    );
  }
}

export default XplayVids;
