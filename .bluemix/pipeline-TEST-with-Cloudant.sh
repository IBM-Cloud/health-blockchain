#!/bin/bash
if [ -z "$ENABLE_TESTS" ]; then
  echo "Define ENABLE_TESTS as environment variable to run these tests."
else
  npm config delete prefix
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
  . ~/.nvm/nvm.sh
  nvm install 6.9.1
  npm install
  export PATH=$PATH:./node_modules/.bin
  npm run e2e
fi
