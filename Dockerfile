FROM nikolaik/python-nodejs:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN pip install -r requirements.txt
RUN mkdir /tmp/tmp
RUN mkdir /tmp/tmp/resized

EXPOSE 8080


CMD [ "node", "src/app.js" ]
