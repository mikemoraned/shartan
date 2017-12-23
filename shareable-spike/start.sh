#!/usr/bin/env bash
PORT=$1

cd server && node --experimental-modules index.mjs ${PORT}
