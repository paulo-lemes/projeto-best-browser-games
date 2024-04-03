import React from "react";
import "./style.css";

const Loading = () => {
  return (
    <div className="divLoading">
      {/* <h2 className="loading">Loading...</h2> */}
      <div className="loader">
        <div className="loader__balls">
          <div className="loader__balls__group">
            <div className="ball item1"></div>
            <div className="ball item1"></div>
            <div className="ball item1"></div>
          </div>
          <div className="loader__balls__group">
            <div className="ball item2"></div>
            <div className="ball item2"></div>
            <div className="ball item2"></div>
          </div>
          <div className="loader__balls__group">
            <div className="ball item3"></div>
            <div className="ball item3"></div>
            <div className="ball item3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
