# node-js-gcp-trial
Try Google Cloud Platform APIs


## Setup
```
$ git clone git@github.com:tayutaedomo/node-js-gcp-trial.git
$ cd node-js-gcp-trial
$ npm install
```


## Local Server
```
$ cd node-js-gcp-trial
$ npm start
$ open 'http://0.0.0.0:8080/'
```
Basic Auth: username / password


## Docker
```
$ cd node-js-gcp-trial
$ docker build -t node-js-gcp-trial .
$ docker run --rm -it -e PORT=8080 -p 8080:8080 node-js-gcp-trial
$ open 'http://0.0.0.0:8080'
```


## Cloud Run
```
$ cd node-js-gcp-trial
$ gcloud builds submit --tag gcr.io/[PROJECT-ID]/node-js-gcp-trial
$ gcloud run deploy --image gcr.io/[PROJECT-ID]/node-js-gcp-trial --platform managed
```

