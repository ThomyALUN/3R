# REabriendo sentidos

Este repositorio esta dedicado a la demo del aplicativo REviviendo sentidos es una aplicación web que utiliza inteligencia artificial (IA) para clasificar la basura basándose en imágenes. Los usuarios pueden hacer una foto de su basura con la cámara de su dispositivo y subirla a nuestra web. 

## Características

Actualmente, permite clasificar materiales reciclables como plásticos, vidrio y metales, así como residuos no reciclables como restos de comida o papel. La aplicación también incluye las siguientes características

- Interfaz fácil de usar para hacer y subir fotos
- Información en tiempo real sobre el tipo de basura y recomendaciones de contenedores
- API Flask backend para gestionar el reconocimiento de imágenes y las recomendaciones de papeleras
- Modelo de IA basado en TensorFlow y Keras para el reconocimiento preciso de imágenes
- Implementación de sonidos (voz) según cada categoría identificada

## Instalación

Para instalar y ejecutar la demo, son necesarios los siguientes pasos:

1. Clone el repositorio de GitHub en tu compútador utilizando el siguiente comando:
   `git clone https://github.com/ThomyALUN/3R.git`

2. Instale las dependencias del front-end ejecutando el siguiente comando en el directorio `frontend`:

```console
pip install node
npm install
```

3. Instale las dependencias del back-end ejecutando el siguiente comando en el directorio `backend`:

```console
pip install flask
pip install numpy
pip install pyttsx3
pip install pytorch
pip install flask_cors
pip install torchvision
pip install opencv-python
```

4. Inicie el servidor front-end ejecutando el siguiente comando en el directorio `frontend`:

```console
npm start
```

5. Inicie el servidor back-end ejecutando el siguiente comando en el directorio `backend`:

```console
python app.py
```

6. Abra su navegador web y navegue hasta `http://localhost:3000` para acceder al aplicativo.

## Uso

Para usarlo, realizar los siguientes pasos:

1. Abra la aplicación en su navegador web.
2. Haga clic en el botón "Cargar foto" y elija una imagen de su elección.
3. Al hacer clic, una vista previa de su imagen se mostrará en nuestra aplicación.
4. Al hacer clic en "Enviar foto", se reconocerá automáticamente el elemento y sugerirá el contenedor correcto para colocarlo.
5. Repita el proceso para otros artículos.

Basado en: https://github.com/jimmyzhng/BinIt
