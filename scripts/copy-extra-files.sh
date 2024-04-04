#!/bin/bash

# Use this, after generating the static HTML with "npm run build"
# dir="../dist2"

# rm -rf "$dir"
# mkdir -p "$dir" || exit 1
# cp ../dist/sponsoring.html "$dir"
# cp -r ../dist/assets "$dir"
# cp -r ../dist/css "$dir"

cp -r ../dist/sprints.html ../dist/sprints/index.html
cp -r ../README-dist.md ../dist/README.md
cp -r ../CNAME ../dist/CNAME

echo "Files copied to $dir"