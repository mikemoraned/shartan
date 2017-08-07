#!/usr/bin/env bash
PORT=$1

google-chrome --headless --hide-scrollbars --remote-debugging-port=9222 --no-sandbox --disable-gpu &
cd server && node dist/index.js ${PORT}
