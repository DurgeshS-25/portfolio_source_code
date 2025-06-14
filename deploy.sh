#!/bin/bash

# Build the project
npm run build

# Go to the build directory
cd build

# Create a .nojekyll file to bypass Jekyll processing
touch .nojekyll

# Initialize a new git repo
git init

# Add all files
git add .

# Commit
git commit -m "Deploy to GitHub Pages"

# Force push to the gh-pages branch
git push -f git@github.com:DurgeshS-25/portfolio-01.git main:gh-pages

# Go back to the project root
cd ..

echo "Deployed successfully!"
