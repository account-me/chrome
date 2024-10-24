
// Retrieve the emails from the database when the popup is opened



// Add an event listener to the button
$(document).ready(function() {
  $('#clear-emails-btn').on('click', function() {
    chrome.storage.local.remove('emails', function() {
      $('#email-textarea').val(''); // clear the textarea
      alert('Emails cleared!');
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


// $(document).ready(function() {
//   $('#clear-emails-btn').on('click', function() {
//     chrome.storage.local.remove('emails', function() {
//       $('#email-list').html(''); // clear the email list
//       alert('Emails cleared!');
//     });
//   });
// });


// $(document).ready(function() {
//   chrome.storage.local.get('emails', function(result) {
//     var emails = result.emails;
//     $('#email-list').html('');
//     emails.forEach(function(email) {
//       $('#email-list').append('<li>' + email + '</li>');
//     });
//   });
// });



// var emails = [];

// // Retrieve the emails from localStorage when the popup is opened
// $(document).ready(function() {
//   var storedEmails = localStorage.getItem('emails');
//   if (storedEmails) {
//     emails = JSON.parse(storedEmails);
//     $('#email-list').html('');
//     emails.forEach(function(email) {
//       $('#email-list').append('<li>' + email + '</li>');
//     });
//   }
// });

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === 'displayEmails') {
//     emails = emails.concat(request.emails);
//     console.log(emails);
//     // Store the emails in localStorage
//     localStorage.setItem('emails', JSON.stringify(emails));
//     // Display the emails in the popup
//     $('#email-list').html('');
//     emails.forEach(function(email) {
//       $('#email-list').append('<li>' + email + '</li>');
//     });
//   }
// });






// var emails = [];

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === 'displayEmails') {
//     emails = emails.concat(request.emails);
//     console.log(emails);
//     // عرض البريد الإلكتروني في النافذة المنبثقة
//     $('#email-list').html('');
//     emails.forEach(function(email) {
//       $('#email-list').append('<li>' + email + '</li>');
//     });
//   }
// });




