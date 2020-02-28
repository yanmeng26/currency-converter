#!/bin/bash
echo "Installing packages"
npm install &
echo "Starting server"
node server.js &
echo "Starting client"
npm start 
