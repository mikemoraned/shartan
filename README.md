# Shartan

## Disclaimer

_None_ of these rendered images constitute an official
Tartan, hence the Shartan name: Sham Tartan.

## What is this?

This is a small project to play around
with a couple of things:

- Using React to make something that looks passably like Tartan
  by executing some definitions (turns out, pretty easy)
- Making a mostly front-end site be shareable
  over Facebook, Twitter and Slack (turns out, surprisingly
  annoying)

## Shareable Front-end

My [blog post](http://blog.houseofmoran.com/post/163952918683/when-backend-is-frontend-and-back-again)
gives an overview: "The core of the idea is to run an instance of Chrome alongside your backend. When a request comes in
for a preview image you ask it to take a screenshot of the page you want to use as a preview which you then proxy back
to the browser."

I remixed the details of how to talk to Chrome over the
debugger protocol with setup instructions for installing Chrome on Linux (see
[medium](https://medium.com/@dschnr/using-headless-chrome-as-an-automated-screenshot-tool-4b07dffba79a) and [github](https://github.com/schnerd/chrome-headless-screenshots))
to get a Docker setup for this alongside my main app, which I then deployed on Heroku (http://shartan.houseofmoran.com/).

Note that the only bit I added was to make the Chrome instance run alongside the
backend of the main app, the front-end of which it was screenshotting.

# Build/run

## Docker / Heroku

    docker build -t shartan-app .
    docker run -e PORT=3002 -p 3002:3002 -it --rm --name running-shartan-app shartan-app

## Kubernetes

These are instructions to run this from "houseofmoran" docker hub repository.

### Build and push to docker hub

    export DOCKER_ID_USER="houseofmoran"
    docker login
    docker build -t houseofmoran/shartan:2.4.0 .
    docker push houseofmoran/shartan:2.4.0

### Push to k8s cluster

    # assume kubectl using the content for your cluster
    kubectl apply -f k8s/namespace.yaml # optional if namespace already created
    export NAMESPACE=shartan
    kubectl apply --namespace=${NAMESPACE} -f k8s/deployment.yaml
    kubectl apply --namespace=${NAMESPACE} -f k8s/service.yaml
    kubectl apply --namespace=${NAMESPACE} -f k8s/ingress.yaml

## Locally

I recommend, unless you really need to test the preview functionality, you just use a standard
create-react-app command i.e. `npm run start`. If you need run with Chrome for previews
then you'll need:

    # once:
    alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
    chrome --headless --hide-scrollbars --remote-debugging-port=9222 --no-sandbox --disable-gpu &

    # then, for each change you want to see:
    npm run build
    cd server
    npm run start 3002
