#!/bin/bash

# This script is used to set up a GitHub repository for the project.
printf "Enter your branch name\n"
read branch_name
git checkout -b "$branch_name"
git add .
printf "Enter your commit message\n"
read commit_message
git commit -m "$commit_message"
git push origin "$branch_name"
printf "Branch %s created and pushed to origin.\n" "$branch_name"
printf "Please create a pull request on GitHub to merge the branch into main.\n"