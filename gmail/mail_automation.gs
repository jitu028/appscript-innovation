/**
 * Generates a Google Document and emails a link to the document.
 */
function generateDocumentAndEmailLink() {
  try {
    var templateBody = HtmlService.createTemplateFromFile('bodyTemplate');
    var currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    var lastMonth = Utilities.formatDate(currentDate, Session.getScriptTimeZone(), "MMMM");
    var currentYear = Utilities.formatDate(currentDate, Session.getScriptTimeZone(), "yyyy");

    templateBody.month = lastMonth;
    templateBody.year = currentYear;

    // Setting up the email subject.
    const emailSubject = 'Monthly Review: Deployment Program Summary (' + lastMonth + ' ' + currentYear + ')';
    var emailContent = templateBody.evaluate().getContent();
    var emailAliases = GmailApp.getAliases();

    // Recipient and CC email addresses
    const recipientEmail = "jitu028@gmail.com";
    var ccEmail = 'jitu029@gmail.com';

    // Dispatching the email.
    GmailApp.sendEmail(recipientEmail, emailSubject, emailContent, {
      from: emailAliases[0], 
      htmlBody: emailContent, 
      cc: ccEmail
    });

  } catch (error) {
    console.error('Error encountered: %s', error.message);
  }
}
