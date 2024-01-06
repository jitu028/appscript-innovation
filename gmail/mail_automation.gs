/**
 * Generates a health and wellness newsletter and emails it.
 */
function sendWellnessNewsletter() {
  try {
    var newsletterTemplate = HtmlService.createTemplateFromFile('wellnessNewsletterTemplate');
    var currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    var previousMonth = Utilities.formatDate(currentDate, Session.getScriptTimeZone(), "MMMM");
    var currentYear = Utilities.formatDate(currentDate, Session.getScriptTimeZone(), "yyyy");

    newsletterTemplate.month = previousMonth;
    newsletterTemplate.year = currentYear;

    // Setting up the email subject.
    const emailSubject = 'Health and Wellness Newsletter - ' + previousMonth + ' ' + currentYear;
    var emailBody = newsletterTemplate.evaluate().getContent();
    var emailAliases = GmailApp.getAliases();

    // Recipient and CC email addresses
    const recipientEmail = "jitu028@gmail.com";
    var ccEmail = 'jitu029@gmail.com';

    // Sending the newsletter email.
    GmailApp.sendEmail(recipientEmail, emailSubject, emailBody, {
      from: emailAliases[0], 
      htmlBody: emailBody, 
      cc: ccEmail
    });

  } catch (error) {
    console.error('Error encountered: %s', error.message);
  }
}
