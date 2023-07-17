#!/bin/bash

rm -rf ./dist

mkdir ./dist
mkdir ./dist/subapp

# 子应用 CapabilityModule
cp -r ./applications/CapabilityModule/dist/ ./dist/subapp/CapabilityModule/

# 子应用 OperationalModule
cp -r ./applications/OperationalModule/dist/ ./dist/subapp/OperationalModule/

# 子应用 UserManagementModule
cp -r ./applications/UserManagementModule/dist/ ./dist/subapp/UserManagementModule/

# main基座
cp -r ./applications/AppModule/dist/ ./dist/

# cd ./dist
# zip -r mp$(date +%Y%m%d%H%M%S).zip *
# cd ..
echo 'bundle.sh execute success.'
