import React from "react";
import gif from "../assets/image/gif.gif";
import "../styles/loading.scss";

class Loading extends React.Component {
  render() {
    const { show } = this.props;
    return (
      <div className={"loading " + (show ? "show" : "")}>
        <img src={gif} alt="loading" />
        <span>Por favor, aguarde.</span>
      </div>
    );
  }
}

export default Loading;
