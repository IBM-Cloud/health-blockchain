#!/bin/bash

npm config delete prefix
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 6.9.1
npm install npm@latest -g

# build the React app
cd ui-react
npm install
npm run build

# discard the node_modules directory
rm -rf node_modules
