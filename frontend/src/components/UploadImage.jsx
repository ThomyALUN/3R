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
  const [tipoBasura, setTipoBasura] = useState(null);
  // green, black (landfill), yellow (clean paper), blue (recycle)

  const actualizar = (data)=>{
    if(data==="blue"){
      setTipoBasura('Reciclaje');
    }
    else if(data==="green"){
      setTipoBasura('Residuos orgánicos');
    }
    else if(data==="black"){
      setTipoBasura('Vertedero');
    }
    else if(data==="yellow"){
      setTipoBasura('Papel');
    } else {
      setTipoBasura('No identificado');
    }
  }

  const handleFileSelect = (event) => {
    // console.log(event.target.files[0])

    setState({
      selectedImage: URL.createObjectURL(event.target.files[0]),
      imageAsFile: event.target.files[0],
    });
  };

  const handleUpload = (event) => {
    var sonido;
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
          console.log("res--data",res.data);
          console.log("res", res);
          
          //Llama a la función
          if(res.data==="blue"){
            sonido='Reciclaje';
          }
          else if(res.data==="green"){
            sonido='Residuos orgánicos';
          }
          else if(res.data==="black"){
            sonido='Vertedero';
          }
          else if(res.data==="yellow"){
            sonido='Papel';
          } else{
            sonido='No identificado';
          } 
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(sonido);
          synth.speak(utterance);
          
          actualizar(res.data);

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
        {
          tipoBasura
        }
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
