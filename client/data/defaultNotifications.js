const listHelp = `Use the list card to stay focused on your priorities!
\nAdd new items using the input field and pressing "Enter" or by using the "Add" button.
\nMark items completed by clicking the box to the right of each item. Hide completed items using the "Hide" button. Reveal the completed items by using the "Show" button.
\nDelete list items using the "Edit" button and clicking on the "X" icon.
`;


var defaultNotifications = {
  'List': {text: listHelp, dismiss: false, moduleType: 'List', timeout: 3000},
  'Default': {text: 'DEFAULT', dismiss: false, moduleType: 'Other', timeout: 3000}
}

export default defaultNotifications;