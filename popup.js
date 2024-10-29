
// Retrieve the emails from the database when the popup is opened



// Add an event listener to the button
$(document).ready(function() {
  $('#clear-emails-btn').on('click', function() {
    chrome.storage.local.remove('flights', function() {
      $('#email-textarea').val(''); // clear the textarea
      alert('Flights cleared!');
    });
  });
});

$('#copy-emails-btn').on('click', function() {
  var emailText = $('#email-textarea').val();
  var textarea = document.getElementById('email-textarea');
  textarea.select();
  document.execCommand('copy');
  alert('Emails copied to clipboard!');
});


// Retrieve the combined emails from the database when the popup is opened
$(document).ready(function() {
  chrome.storage.local.get('emails', function(result) {
    var emails = result.emails;
    var emailText = '';
    emails.forEach(function(email) {
      emailText += email + '\n'; // add each email to the textarea, separated by a newline character
    });
    $('#email-textarea').val(emailText);
    $('#email-count-label').text(`${emails.length} Email`); 
  });
});

