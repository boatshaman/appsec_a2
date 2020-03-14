###### Application Security - Assignment 2 
# Vulnerable Web App

A super simple web-app built for resizing images built with node and express running inside a docker container. Utilizes a [python script](https://github.com/boatshaman/appsec_a1) for image resizing.

### TO RUN

From a cloned repository run:

`docker build -t jh5363-vuln-app .`

`docker run -p 8088:8080 -d jh5363-vuln-app`

This creates the docker image and starts the container with port 8088 on the host machine forwarding to 8080 on the container. 

Navigate to your browser and enter: [0.0.0.0:8088](0.0.0.0:8088)   -  You should 


### VULNERABILITIES

**XSS :** Any text entered into the "FILENAME" input box will be echoed onto /upload-page, regardless of an image being sent to the server and its resizing status. Due to this being a reflected XSS that must be initiated with a POST request, I wouldn't say this is extremely severe but defenitely still classifies as a security vulnerability. 

**Arbitrary File Read :** After uploading an image, you will have the option to download the newly squared image from the main page. The link to do this looks like this: http://127.0.0.1:8088/download-image?dir=/tmp/tmp/resized/&file=cat1.jpg . Quickly inspecting it we can see what looks like a path and filename present in the GET query paramater. If you modify the url to something like: http://127.0.0.1:8088/download-image?dir=/etc/&file=passwd

**Remote Code Execution :** During the uploading of an image via POST to /upload-image the node server takes the 'filename' paramater as the name of the resized image and passes it direclty to the 'exec' function which calls the python script. This is vulnerable to RCE and an attacker could easily pass something like 'fakefile; find / -print > /allfiles.txt' and then use the arbitrary file read vulnerability from earlier to get a listing of all files and directories on the system.
