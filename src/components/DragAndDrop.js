import React, { Component } from "react";
import { ArrowDownCircle, Circle } from "react-feather";

class DragAndDrop extends Component {
  state = {
    drag: false,
  };

  dropRef = React.createRef();
  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  };

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
  };

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
    } else if (
      e.dataTransfer.items[0] &&
      e.dataTransfer.items[0].kind === "string"
    ) {
      e.dataTransfer.items[0].getAsString((string) => {
        if (string.startsWith("http://") || string.startsWith("https://")) {
          string = `<html><meta http-equiv="refresh" content="0;URL='${string}'"/>Redirecting to ${string}...</html>`;
        }
        this.props.handleDrop([
          {
            name: "r.html",
            type: "text/html",
            body: string,
          },
        ]);
        e.dataTransfer.clearData();
      });
    }
  };

  componentDidMount() {
    let div = this.dropRef.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
  }

  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
  }

  render() {
    const defaultContent = (
      <>
        <Circle size={32} />
        <span>Drop your stuff</span>
      </>
    );

    const hoverContent = (
      <>
        <ArrowDownCircle size={32} />
        <span>Drop it like it's hot</span>
      </>
    );

    return (
      <div
        className={`${this.props.className || ""} ${
          this.state.drag ? "active" : ""
        }`}
        ref={this.dropRef}
      >
        {this.state.drag ? hoverContent : this.props.children || defaultContent}
      </div>
    );
  }
}

export default DragAndDrop;
