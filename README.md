# Front-end Assignment
A React-Redux focused take-home assignment for Front-end Developers.

## Instructions
+ You are to keep this document and assignment details private and work on it independently.
+ If you require any clarifications, please email philip_tran@tech.gov.sg with your questions.
+ Upon completion of the assignment (can be any time before the deadline), please inform HR/ main contact person. We will then send you a meeting link to share with us your work and design thoughts.
+ Complete this exercise and submit either a zip of the solution or a link to a private repo
+ Please use React, Redux frameworks in your solution. All other choices of libraries, frameworks, etc. are up to you.

## Requirements
+ Solution should be responsive
+ Use the included `weather.json` file as your datasource (sample data from [Open Weather API](https://openweathermap.org/data/2.5/forecast/daily?id=1880251&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02))
+ Show the "daily" weather forecast for Singapore:
  + Location (ie. Singapore)
  + Current weather description (ie. sunny)
  + Current temperature
  + Today's high temperature
  + Today's low temperature
+ Allow the user to toggle more data in the current conditions area:
    + Humidity
    + Pressure
    + Sunrise/Sunset Time
+ Show the 7 Day forecast as a multi-line chart (use any charting library you would like but it should be incorporated as a React re-usable component)
  + Y axis should show the High and Low temperature as separate lines
  + X axis should show 7 days (starting with the "current" day)
  + The chart should have a tool tip that when activated shows:
    + Day of the week
    + High temperature
    + Low temperature
    + Weather description (ie. Breezy)
+ __Bonus:__ Was this too easy? Want to make it a real app? Use the [Open Weather API](https://openweathermap.org/api) with the default location set to Singapore and allow the user to select daily or hourly forecast.
