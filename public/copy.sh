#!/bin/sh
# Copy project files
# Run with: Please run: ./copy.sh filter new" 
# "filter" means: The names of the file to copy
# "new" means: The new name of the copied files

DIR=`dirname "$0"`/*

# Define copy function
copy() {
  for f in $1
    do
    filename=$(basename -- "$f")
    if [ "${filename%.*}" = $2 ]; then
           if test -f "$3.${filename##*.}"; then
              echo "$3.${filename##*.} exists."
           else
              cp $f $3.${filename##*.}   
           fi
    fi
    done
}

if [ -n "$1" ] && [ -n "$2" ]; then
    # Run copy function
    copy "$DIR" $1 $2
else
   echo "Required parameters not supplied. Please run: ./copy.sh filter new"    
fi