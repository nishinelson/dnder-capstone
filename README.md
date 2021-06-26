# dnder-capstone

Dnder is a tinder inspired app that allows users to make Player and/or Dungeon Master cards for their profile and swipe through other users in order to match and create a dungeons & dragons party/group in their area or remotely.

- Deployed on Heroku: [dnder](https://dnder.herokuapp.com/)

## Technology Used:
- React
- Redux
- Flask
- Flask-SQLAlchemy
- PostgreSQL
- react-tinder-card
- react-alice-carousel

## Features
- Dashboard/User Profile is where the user has full CRUD operations over their Player or DM cards. They will also be able to see their matches when they get them.
![Dashboard](dnder-capstone-app/images/dashboard.PNG)
- The swipe/search page allows a user to dynamically search through other users' PC or DM cards depending on the current user's PC id, DM id, and PC or DM location setting. Any card that gets swipe to the right is saved as someone the user wants to match with and does not show up in the stack of cards again unless the current user deletes their card and creates a new one.
![swipe/search](dnder-capstone-app/images/swipeSearch.PNG)
