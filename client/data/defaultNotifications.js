const listHelp = `Use the list card to stay focused on your priorities!
\nAdd new items using the input field and pressing "Enter" or by using the "Add" button.
\nMark items completed by clicking the box to the right of each item. Hide completed items using the "Hide" button. Reveal the completed items by using the "Show" button.
\nDelete list items using the "Edit" button and clicking on the "X" icon.
`;

const stickyNoteHelp = `Use this sticky note to write down whatever information you so desire. Both the card title and body can be edited!
\n
`;

const newsHelp = `Use the newsfeed card to keep update to date with your favorite news sources!
\nSelect your perfered news source by clicking the down arrow next to the news source name.
\nToggle between the latest and the top news items by clicking the bottom buttons.
\nView more news items by clicking the 'More!' button in the top right!
`;

const weatherHelp = `Enter a city name or zip code into the input field in the top right!
\nIf you're interested in a 5-day forecast, try rescaling the card to a larger size.
`;

const focusHelp = `Use the Focus card to set your daily intentions!
\n
`;

const clockHelp = `Add additional timezones by using the dropdown menu!
\nFeel free to add / delete as many timezones as you prefer.
`;

const arcadeHelp = `Everybody needs a break now and again.
\nChoose a game from the dropdown menu and start enjoying yourself!
`;

const quoteHelp = `This module provides some inspiration for those especially tough Mondays (or any weekday, rather).
\nEnjoy!
`;

const backgroundHelp = `Enter a photo URL to customize / change your background image.
`;

const photoPromptHelp = `Challenge your inner photographer to upload a new photo every day.
\n You can use a pre-existing shot or take a new one with your device camera .
\n The card will keep track of your current daily streak.
`;

const defaultHelp = `Add cards using the top-right button to get started!
\n Cards can be resized by dragging the icon in the bottom-right corner to create a personalized dashboard. Enjoy!
`;

var defaultNotifications = {
  'List': {text: listHelp, dismiss: false, moduleType: 'List', timeout: 3000},
  'Sticky Note': {text: stickyNoteHelp, dismiss: false, moduleType: 'Sticky Note', timeout: 3000},
  'Hacker News': {text: newsHelp, dismiss: false, moduleType: 'Hacker News', timeout: 3000},
  'Weather': {text: weatherHelp, dismiss: false, moduleType: 'Weather', timeout: 3000},
  'Focus': {text: focusHelp, dismiss: false, moduleType: 'Focus', timeout: 3000},
  'Clock': {text: clockHelp, dismiss: false, moduleType: 'Clock', timeout: 3000},
  'Arcade': {text: arcadeHelp, dismiss: false, moduleType: 'Arcade', timeout: 3000},
  'Quote': {text: quoteHelp, dismiss: false, moduleType: 'Quote', timeout: 3000},
  'Background Customizer': {text: backgroundHelp, dismiss: false, moduleType: 'Background Customizer', timeout: 3000},
  'One Photo Per Day': {text: photoPromptHelp, dismiss: false, moduleType: 'One Photo Per Day', timeout: 3000},
  'Default': {text: defaultHelp, dismiss: false, moduleType: 'Default', timeout: 3000}
}

export default defaultNotifications;