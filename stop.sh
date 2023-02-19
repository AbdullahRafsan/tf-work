#! /bin/bash

password="Rafsan@mac"

xampp stop

for pid in `pgrep 'node'`
do
    echo $password | sudo -S kill -s KILL $pid
done

for pid in `pgrep Electron`
do
    echo $password | sudo -S kill -s KILL $pid
done

