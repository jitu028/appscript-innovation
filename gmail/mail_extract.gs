function extractEmails() {
  var query = 'label:inbox'; // Define your search criteria
  var threads = GmailApp.search(query, 0, 10); // Fetches up to 10 email threads from the inbox
  var messages = GmailApp.getMessagesForThreads(threads);
  
  for (var i = 0; i < messages.length; i++) {
    for (var j = 0; j < messages[i].length; j++) {
      var message = messages[i][j];
      Logger.log('Subject: ' + message.getSubject());
      Logger.log('From: ' + message.getFrom());
      Logger.log('Date: ' + message.getDate());
      Logger.log('Body: ' + message.getPlainBody().substring(0, 200)); // Logs first 200 characters of the body
      Logger.log('--------------------------------------');
    }
  }
}
