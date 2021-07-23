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

## Fly.io

## Create

Create app (if not created already during `flyctl init`):

    flyctl apps create shartan-houseofmoran --builder dockerfile --no-config

## Deploy

Deploy app (this will use the settings in `fly.toml`):

    flyctl deploy

Open app:

    flyctl open

### Staging Deploy

Create the staging app, if needed:

    flyctl apps create shartan-staging-houseofmoran --builder dockerfile --no-config

Deploy to staging:

    flyctl deploy --config ./fly.staging.toml

Open app:

    flyctl open --config ./fly.staging.toml


## Domains / SSL

Get IPs:

    flyctl ips list

Add the `v4` IP as an `A` record and the `v6` IP as the `AAAA` record

Once that has propagated, create the cert for the domain:

    flyctl certs create shartan.houseofmoran.com

Show status:

    flyctl certs show shartan.houseofmoran.com

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
