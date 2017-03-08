const listHelp = `Use the list card to stay focused on your priorities! \nAdd new items using the input field and pressing 'Enter' or by using the 'Add' button.`;


var defaultNotifications = {
  'List': {text: listHelp, dismiss: false, moduleType: 'List', timeout: 3000},
  'Default': {text: 'DEFAULT', dismiss: false, moduleType: 'Other', timeout: 3000}
}

export default defaultNotifications;