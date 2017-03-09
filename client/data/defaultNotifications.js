const listHelp = `Use the list card to stay focused on your priorities!
\nAdd new items using the input field and pressing "Enter" or by using the "Add" button.
\nMark items completed by clicking the box to the right of each item. Hide completed items using the "Hide" button. Reveal the completed items by using the "Show" button.
\nDelete list items using the "Edit" button and clicking on the "X" icon.
`;

const stickyNoteHelp = `Sticky Note Card
\n
`;

const newsHelp = `Use the newsfeed card to keep update to date with your favorite news sources!
\nSelect your perfered news source by clicking the down arrow next to the news source name.
\nToggle between the latest and the top news items by clicking the bottom buttons.
\nView more news items by clicking the 'More!' button in the top right!
`;

const weatherHelp = `Weather Card
\n
`;

const focusHelp = `Use the Focus card to set your daily intentions!
\n
`;

const defaultHelp = `Add cards using the button above to get started!
`;

var defaultNotifications = {
  'List': {text: listHelp, dismiss: false, moduleType: 'List', timeout: 3000},
  'Sticky Note': {text: stickyNoteHelp, dismiss: false, moduleType: 'Sticky Note', timeout: 3000},
  'Hacker News': {text: newsHelp, dismiss: false, moduleType: 'Hacker News', timeout: 3000},
  'Weather': {text: weatherHelp, dismiss: false, moduleType: 'Weather', timeout: 3000},
  'Focus': {text: focusHelp, dismiss: false, moduleType: 'Focus', timeout: 3000},
  'Default': {text: defaultHelp, dismiss: false, moduleType: 'Other', timeout: 3000}
}

export default defaultNotifications;