Hey everyone,

I created an Open Source REST API for telemetry from webcasts of rocket launches, called **[Launch Dashboard API](https://api.launchdashboard.space)**.

GitHub Repository: https://github.com/shahar603/Launch-Dashboard-API/

Documentation: https://github.com/shahar603/Launch-Dashboard-API/wiki

This is quite a long post, so I divided it into sections:

* The goals of Launch Dashboard API
* General information
* Future Work (Launch Dashboard Client)
* What can you do?
* Patreon

---------

## The goals of Launch Dashboard API

1) Centralize all public rocket telemetry in one easy-to-use place
 
2) Broadcast telemetry in real time

---

## General information

Information about the API and the data it contains

##### The telemetry in the API

The API contains 3 types of telemetry:

* Webcast telemetry - In the API is under the name *raw telemetry*, it is a frame by frame capture of the data displayed in the webcast. For example: SpaceX's webcasts contain time, velocity and altitude and stream at 30 FPS. Thus the raw SpaceX telemetry contains 30 data points per second. Each data point has time, velocity and altitude.

* Analysed telemetry - Webcast telemetry analysed by a [script I wrote](https://github.com/shahar603/SpaceXtract/blob/master/src/Analysis/analyse_raw_telemetry.py). Analysed telemetry contains more fields like: acceleration, downrange distance, velocity components and more. 

* Events - A list of events and the time they occurred at the launch.

For more information see the [documentation](https://github.com/shahar603/Launch-Dashboard-API/wiki)

##### What's the current state of the API?

* The API contains telemetry from every SpaceX launch since Orbcomm 2 (December 2015), the 3 latest RocketLab launches and 2 Arianespace launches (1 Vega and 1 Ariane 5).

* Raw and Analysed telemetry are being streamed every SpaceX and RocketLab launch in real time using websockets. For more information see the ["/live" section in the docs](https://github.com/shahar603/Launch-Dashboard-API/wiki/Live-(Websockets))

##### Have people used the API?

Yes! [FlightClub.io](https://www2.flightclub.io/) overlays webcast telemetry over the simulated launches. The webcast telemetry has helped to build trajectories in FlightClub. For example [this trajectory](https://www2.flightclub.io/result/2d?code=DEM1) of the DM-1 launch. As this [comparison photo](https://imgur.com/a/pbt4YWM) shows, the analyzed telemetry used to create it is very accurate. (Original photo by [@Mimikry_](https://twitter.com/Mimikry_))

In addition, I've used the telemetry in posts like: [Iridium 8 Telemetry & Comparison between Block 4 and Block 5 ASDS Landing](https://www.reddit.com/r/spacex/comments/af7bco/iridium_8_telemetry_comparison_between_block_4/) and [Bangabandhu-1 Telemetry & Comparison between Block 5 and previous blocks](https://www.reddit.com/r/spacex/comments/8iwrml/bangabandhu1_telemetry_comparison_between_block_5/)

##### How is the telemetry captured?

I capture SpaceX and RocketLab telemetry using a Python module I wrote called: [SpaceXtract](https://github.com/shahar603/SpaceXtract). You can use it to capture telemetry locally or use it to extract data from non rocket related sources. Analysed telmetry is produced from raw telemetry using [this](https://github.com/shahar603/SpaceXtract/blob/master/src/Analysis/analyse_raw_telemetry.py) script.

u/Hitura-Nobad has used [VideoTelemetryParser](https://github.com/Togusa09/VideoTelemetryParser) to capture Arianespace telemetry.

If you want to contribute and supply telemetry to the API, it is more than welcome. See the [How To Contribute] section in this post for more info on how to do that.

------

## Future Work
### Launch Dashboard Client

You may be wondering why is the API called "Launch Dashboard API" and not something like "Rocket Launch Telemetry API". It's because it's just the first part of a much bigger (and more awesome) project called **Launch Dashboard**.

Launch Dashboard will be like a mission control. Telemetry from multiple sources combined and visualized in various ways. Fully customizable with the ability to get telemetry from everyone who produces it. While version 1 of Launch Dashboard API streams only telemetry from the webcast, future versions will allow anyone to connect and stream their own telemetry through it, whatever it is (for example updates from the r/SpaceX launch thread).

A client with dozens of dials, graphs, notifications, simulations, triggers, visualizations, views and more will allow everyone to have an enhanced experience of the launch. I actually made a *very* basic version of this on [my second post](https://www.reddit.com/r/spacex/comments/62lg8c/enhanced_telemetry_for_spacex_webcasts_and/) on r/SpaceX back on March 2017.

Users will be able to create visualizations of data (ex: a speedometer in m/s) and then share it with other users. Or you can trigger confetti and an [Elon musk maracas gif](https://imgur.com/4UUrUW4) when S2 reaches orbit by calculating perigee using telemetry or hooking to a good orbit confirmation event from the r/SpaceX launch thread. Users will even be able to share complete launch presets to create a launch theme. You could have a KSP theme using KSP like controls and music, or a meme theme with different memes at different stages of the flight. I have quite a lot of ideas and you might have some too.


But there are two problem. 

* Launch Dashboard Client is a HUGE project. And I don't have the resources or the time to do it on my own.

* I don't have the knowledge to pull it off. I know a bit about Front End development and nothing about UI/UX or graphic design.

So...I need your help.

If you want to help develop Launch Dashboard Client, join the [Launch Dashboard Development Slack Channel](https://join.slack.com/t/launchdashboard/shared_invite/enQtNzk1MDY1NjM3MDA5LTczNmQ4N2U4ZTYxMTEyZTRlOTVmMTdmNzU2ODk2OGEwYmE2YWFkMmQ2ZDNlYmZiYWNmNGE3ODQ2MjVjYWM5MmI).


----


## What can you do?

##### Have a suggestion?

Have a feature request? A launch provider/webcast you want to be seen on the API?

Great! I want to hear it. Please put it on the [Features, Data and Telemetry Suggestions 🚀](https://github.com/shahar603/Launch-Dashboard-API/issues/17) issue on GitHub. Or contact me on Reddit using a comment or a PM.

##### Do you have data you want the API to host?

Awesome! That's the reason Launch Dashboard API exists. Please put it on the [Features, Data and Telemetry Suggestions 🚀](https://github.com/shahar603/Launch-Dashboard-API/issues/17) issue on GitHub. Or contact me on Reddit. You'll be credited on the README page for your contribution. The telemetry isn't required to be from webcasts or be extracted using OCR.  
###### Important: The data has to be public (or yours). When you send telemetry you *must* include the source.

##### Want to help code Launch Dashboard API?

Thank you so much! See the [CONTRIBUTING](https://github.com/shahar603/Launch-Dashboard-API/blob/master/CONTRIBUTING.md) page for instructions.

##### Use Launch Dashbaord API

If you use Launch Dashboard API in a project, I want to hear about it! You'll be credited on the [README](https://github.com/shahar603/Launch-Dashboard-API/blob/master/README.md) page.


## Patreon

All the data on Launch Dashboard API will be free forever. To help cover the server and development costs please consider supporting [Launch Dashboard API on Patreon](https://www.patreon.com/launchdashboard)

-------

Thanks you for reading and I hope Launch Dashboard API will be used to create awesome things!



P.S: Special thanks to u/TheVehicleDestroyer for integrating Launch Dashboard API into FlightClub and helping me with a ton of things during development, and u/CakeOfDestiny who helped me find a domain.
