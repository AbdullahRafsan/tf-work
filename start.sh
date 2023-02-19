#! /bin/bash

start_dir=`pwd`

xampp start

cd "$start_dir/tf-work-backend"
npm test &

cd "$start_dir/tf-work-frontend"
npm start &

code "$start_dir/tf-work-backend"
code "$start_dir/tf-work-frontend"