# [wbogusky.github.io](wbogusky.github.io, "QR HERE")

# Q R Here
QR code stickers and a web app to help BART passengers visualize incoming trains.

## Proposal
I'd like to take what we learned about API integration to create a tool for BART passengers, particularly those who are unfamiliar with the routes and stations to get a better grip on their location in the BART system. This project will use the BART API to animate incoming trains for a specified station, determined at app launch by a QR code sticker placed on the map at the station.

## Summary
I created a p5 sketch which successfully accesses BART's API and returns a visualization of the activity of one station, specified by the URL. I've printed stickers with URLs which each link to a visualization of their respective station upon scanning.

This project is intended to make information about BART stations and trains
more accessible by:
1. Creating a visual interface that is more spatially related to the user than a timetable
2. Providing access to this information without a downloadable app or the need to walk all the way into the station

## Component Parts
- QR code stickers - Station name abbreviations are pulled from the QR Code URL and used to access JSON
- Web app - Animates incoming trains to the station along with ETAs
- BART API - The information about the station and its incoming trains is collected from the API

## Timeline
What did you do in each of the past four weeks?

- Week -2: Work on rough version
- Week -1: Work on rough version
- Week 0: Write Proposal
- Week 1: Reassess goals, shift away from map
- Week 2: Working on layout issues
- Week 3: Tweaks to look and feel and tidying code
- Week 4: Present!

## Challenges
A brief discussion of what was hard, challenging, or unexpected about your project.
I initially wanted to create something that was pretty ambitious without realizing it. Trying to synthesize the data that BART provides into usable map data proved too challenging. While this was disheartening, after reassessing the goals of the project, I found that a simpler visualization could actually provide more relevant information to the user.

## Completed Work
[Rockridge](https://raw.githubusercontent.com/wbogusky/wbogusky.github.io/master/IMG_4485.PNG "rock")
[MacArthur](https://raw.githubusercontent.com/wbogusky/wbogusky.github.io/master/IMG_4486.PNG "mcar")
[19th St. Station](https://raw.githubusercontent.com/wbogusky/wbogusky.github.io/master/IMG_4488.PNG "19th")
[Glen Park](https://raw.githubusercontent.com/wbogusky/wbogusky.github.io/master/IMG_4489.PNG "glen")

## References and links
Tutorials, comments, videos, magazine articles - anything you found that helps you understand your project.
- I used a multitude of videos by Daniel Shiffman to understand how to work with APIs.
- I also was given access to a defunct project by another professor that used the BART API, although I didn't use it at all.
- I also used a snippet found via google on css-tricks.com to pull data from the URL
- https://css-tricks.com/snippets/javascript/get-url-variables/
