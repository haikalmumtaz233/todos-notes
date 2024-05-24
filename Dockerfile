FROM nginx:alpine
COPY src /usr/share/nginx/html/src
COPY public /usr/share/nginx/html/
COPY css /usr/share/nginx/html/public
COPY index.html /usr/share/nginx/html/public
COPY notes.html /usr/share/nginx/html/public
COPY todos.html /usr/share/nginx/html/public
COPY notes.js /usr/share/nginx/html/public
COPY todos.js /usr/share/nginx/html/public