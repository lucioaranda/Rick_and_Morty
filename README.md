

# Proyecto Rick y Morty

https://github.com/lucioaranda/Rick_and_Morty

## La aplicación muestra personajes de Rick y Morty usando la [API oficial](https://rickandmortyapi.com/), con búsqueda y filtros por especie.

## Los objetivos del trabajo son los siguientes:
- Manejo de control de versiones de Git.
- Contenerización de una aplicación web simple usando Docker.
- Despliegue de la aplicación dentro de un contenedor NGINX.
- Documentación clara del proceso técnico y los comandos utilizados.

## Estructura del proyecto: 
```
Proyecto/
│
├── index.html
├── Dockerfile
├── estilos/
│ └── styles.css
├── scripts/
│ └── main.js
└── img/
  └── Rick_Morty_Logo_1.png
  └── Rick_Morty_Logo.png 
```
Dockerización:

Dockerfile usado:

## Imagen base de NGINX
```
FROM nginx:latest
```

## Elimina archivos por defecto
```
RUN rm -rf /usr/share/nginx/html/*
```

## Copia los archivos del proyecto al contenedor
```
COPY . /usr/share/nginx/html
```

## Expone el puerto 80
```
EXPOSE 80
```

# Correr el proyecto

## Desde la carpeta del Proyecto 
```
  cd Proyecto
```

## Construcción de la imagen en docker
```
  docker build -t rickmorty-app .
```
## Ejecución del contenedor: 
```
  docker run -d -p 8080:80 rickmorty-app
```
## Visualizar contenedores en ejecución.
```
  docker ps 
```
## Abrir en el navegador:

 http://localhost:8080

