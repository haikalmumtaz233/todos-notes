FROM nginx:latest
# Copy the content of the public directory to the Nginx html directory
COPY public /usr/share/nginx/html

# Copy the src directory inside the html directory (if needed)
COPY src /usr/share/nginx/html/src