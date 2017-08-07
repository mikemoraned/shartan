#!/usr/bin/env bash
google-chrome --headless --hide-scrollbars --remote-debugging-port=9222 --no-sandbox --disable-gpu &
npm run server