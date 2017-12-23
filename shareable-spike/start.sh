#!/usr/bin/env bash
PORT=$1

cd server && node -r ./preload.js --experimental-modules index.mjs ${PORT}
