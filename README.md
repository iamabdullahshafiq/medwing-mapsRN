# medwing-mapsRN
Maps demo application for medwing job

# Design decisions
- Implemented the tabs view to show map with pointers on first page and listing on second so the user can access both views easily.
- Creating location via adding latitude and longitude is a hectic work so in order to create location provided the long press functionality so that user can create location easily.
- Used Modal with attractive coloring while Creating and Updating Location for better UI/UX purposes.
- Added Proper Loading states when user is waiting to get or send data to server.
- Added Validations with 'red' color along with disabling of Submit button.
- Adopted Simple desgin and Info texts for better understanding and experience of User.

# Reasons for not using Redux
- As with growing demand for state managment systems within react apps. peaople started using redux and now moving towards react hooks. So i avoided using any external packages like redux, redux-saga, redux-form. Implemented this demo purely using react-native concepts.
- Additionally for a small demo project redux adds more complexity but will include it in bigger applications, where it provided solution to many problems.
