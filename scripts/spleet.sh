#!/bin/bash

function download()
{
    youtube-dl -x --audio-format "mp3" -o "~/bullshit/data/%(title)s.%(ext)s" $1
    filename=`ls ~/bullshit/data | tr -d '\n'`
    echo $filename
    spleeter separate -i ~/bullshit/data/"$filename" -p spleeter:2stems -o ~/bullshit/spleeted
}

download $1