# Building a casino lobby

This assignment is intended to be the foundation for a discussion with a coworker.
Your job is to create the first iteration of a casino lobby, we provide you with the data, the rest is up to you.
You'll find the data you need in `lib`.

## Prerequisites
We encourage you to do your own interpretation, there is no right or wrong, make use of a framework or go vanilla, it's up to you.
The data for the lobby should not be available in the front end initially.

## Requirements
All requirements are listed in order of importance/priority to a thought Product Owner.
Determine which ones are feasible to complete in your sprint. Your sprint is 4 hours.

### Functional requirements
* it should show a list of games
	* it should be possible to filter games based on `gameProvider`
	* it should be possible to filter games based on `gameCollectionIds`
* it should be functional on both mobile and desktop (click & touch)
* it should be unit tested with ~80% coverage

### Design requirements
* each game should be represented by a game tile
* the game tile should include:
	* a background image
	* a link to start the game
	* perhaps some other data that could be relevant for a player to know about

### Non functional requirements
* it should load fast
* should be visually appealing
