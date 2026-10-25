FROM nginx:alpine

COPY index.html style.css script.js clima.js /usr/share/nginx/html/

EXPOSE 80