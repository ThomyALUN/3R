import { useState, useEffect } from "react";
import axios from "axios";

document.body.style = "background: #88B2EE;";

export default function UploadImage() {
  const [state, setState] = useState({
    selectedImage: null,
    imageAsFile: null,
    imageResult: null,
  });
  const [tipoBasura, setTipoBasura] = useState(null);

  const actualizar = (data)=>{
    if(data==="blue"){
      setTipoBasura('Plástico');
    }
    else if(data==="green"){
      setTipoBasura('Vidrio');
    }
    else if(data==="yellow"){
      setTipoBasura('Papel y cartón');
    }
    else if(data==="gray"){
      setTipoBasura('Chatarra')
    } else {
      setTipoBasura('Otros');
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
          
          if(res.data==="blue"){
            sonido='Plástico';
          }
          else if(res.data==="green"){
            sonido='Vidrio';
          }
          else if(res.data==="yellow"){
            sonido='Papel y cartón';
          } 
          else if(res.data==="gray"){
            sonido='Chatarra';
          } else{
            sonido='Otros';
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
            Cargar foto
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
            Enviar foto
          </button>
        </form>
      </div>
    </div>
  );
}
