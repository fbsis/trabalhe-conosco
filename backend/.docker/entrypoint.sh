#!/bin/bash

cd /home/node/app

rm -rf dist
rm -rf node_modules

npm ci
npm run dev
