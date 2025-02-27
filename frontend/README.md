
Este proyecto es un dashboard desarrollado en React con Vite, utilizando Material UI, Apache ECharts y una base de datos de prueba en db.json para simular la información de entrgas, clientes y repartidores.


 Creación del Proyecto con Vite

Para iniciar el proyecto con Vite y React, se ejecutó:
npm create vite@latest mi-dashboard --template react
cd frontend
npm install

Material UI (Interfaz de usuario)
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled

 JSON Server (Base de datos de prueba para simular una API)
 npm install -g json-server

  Apache ECharts for React (Gráficos interactivos)
  npm install echarts-for-react echarts


  Estructura del Proyecto
  frontend/
│── src/
│   ├── components/
│   │   ├── Table/ (Tabla de clientes)
│   │   ├── Echart/ (Gráficos con ECharts)
│   ├── pages/
|   |   ├──layouts(componente de material UI dasboard)
│   │   ├── Phome/ (Página principal)
│   ├── services/
│   │   ├── Get.js (Manejo de solicitudes POST)
│   ├── App.jsx
│   ├── main.jsx
│── public/
│── db.json (Base de datos de prueba)
│── package.json
│── README.md

Ejecución del Proyecto

json-server --watch db.json --port 5000

npm run dev