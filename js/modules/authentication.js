$(document).ready(function() {
  $('#loginForm').submit(async function(e) {
      e.preventDefault();

      const username = $('#username').val();
      const password = $('#password').val();

      try {
          const response = await fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password })
          });

          if (response.status !== 200) {
              alert('Invalid username or password');
              return;
          }

          const token = await response.text();
          localStorage.setItem('authToken', token); // Store the token for future requests
          window.location.href = '/'; // Redirect to the main dashboard or another page
      } catch (error) {
          console.error('Error during login:', error);
      }
  });
});
