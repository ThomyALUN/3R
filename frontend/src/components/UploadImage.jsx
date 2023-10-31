import { useState, useEffect } from "react";
import axios from "axios";
import ConfettiExplosion from "react-confetti-explosion";
import { BsFillCameraFill } from "react-icons/bs";

document.body.style = "background: #8da98b;";

export default function UploadImage() {
  const [state, setState] = useState({
    selectedImage: null,
    imageAsFile: null,
    imageResult: null,
  });

  // green, black (landfill), yellow (clean paper), blue (recycle)

  const handleFileSelect = (event) => {
    // console.log(event.target.files[0])

    setState({
      selectedImage: URL.createObjectURL(event.target.files[0]),
      imageAsFile: event.target.files[0],
    });
  };

  const handleUpload = (event) => {
    event.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(state.imageAsFile);

    reader.onload = () => {
      const base64Image = reader.result;

      axios
        .post("http://127.0.0.1:5000/", JSON.stringify(base64Image), {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        })
        .then((res) => {
          console.log("res", res);
          setState((prev) => ({ ...prev, imageResult: res.data }));
          document.querySelector("input[type='file']").value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  return (
    <div className="image-upload-cont">
      {state.imageResult && (
        <ConfettiExplosion
          x={0}
          y={0}
          particleCount={500}
          blastOpacity={0.9}
          colors={[
            "#f44336",
            "#e91e63",
            "#9c27b0",
            "#673ab7",
            "#3f51b5",
            "#2196f3",
            "#03a9f4",
            "#00bcd4",
            "#009688",
            "#4caf50",
            "#8bc34a",
            "#cddc39",
            "#ffeb3b",
            "#ffc107",
            "#ff9800",
            "#ff5722",
          ]}
        />
      )}

      <div className={`upload-info ${state.imageResult}`}>
        {state.imageResult
          ? state.imageResult === "blue"
            ? "Recycling"
            : state.imageResult === "green"
            ? "Compost"
            : state.imageResult === "black"
            ? "Landfill"
            : state.imageResult === "yellow"
            ? "Paper"
            : null
          : "Welcome to BinIt!"}
      </div>

      <div className={`image-with-buttons ${state.imageResult}`}>
        <div className="image-cont">
          {state.selectedImage && (
            <img className="uploaded-image" src={state.selectedImage} />
          )}
        </div>

        <form className="edit-form-upload" onSubmit={handleUpload}>
          <label className="button upload-label" for="inputTag">
            Select Image
            <input
              id="inputTag"
              className="choose-image"
              type="file"
              name="image"
              onChange={handleFileSelect}
              accept="image/*"
            />
          </label>
          <button
            className="button upload-image"
            type="button"
            onClick={handleUpload}
          >
            Upload Image
          </button>
        </form>
      </div>
    </div>
  );
}
