<?php
$recipient = 'mayfieldphonerepair@gmail.com';
$subject = 'Website Repair Request';

$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$phone || !$email) {
  header('Location: contact.html?error=missing');
  exit;
}

$cleanEmail = filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';
$body = "New repair request submitted:\n\n";
$body .= "Name: {$name}\n";
$body .= "Phone: {$phone}\n";
$body .= "Email: {$email}\n";
$body .= "Service: {$service}\n";
$body .= "Message: {$message}\n";

$headers = "From: {$cleanEmail}\r\n";
if ($cleanEmail) {
  $headers .= "Reply-To: {$cleanEmail}\r\n";
}

$sent = mail($recipient, $subject, $body, $headers);
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Booking Request Received | Mayfield Phone Repair</title>
    <meta name="description" content="Your phone repair request has been sent. We will contact you shortly to confirm your booking." />
    <link rel="icon" href="favicon.svg" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html">Mayfield Repairs</a>
        <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav class="site-nav" aria-label="Primary navigation">
          <a href="index.html">Home</a>
          <a href="services.html">Services</a>
          <a href="brands.html">Brands</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
          <a href="suburbs.html">Suburbs</a>
        </nav>
        <a class="phone-link" href="tel:0240491735">02 4049 1735</a>
      </div>
    </header>

    <main class="section page-hero">
      <div class="container">
        <h1>Booking request received</h1>
        <p>
          <?php if ($sent): ?>
            Thank you, <?= htmlspecialchars($name, ENT_QUOTES, 'UTF-8') ?>. We have received your repair request and will contact you shortly to confirm the booking.
          <?php else: ?>
            There was an issue sending your request. Please call <a href="tel:0240491735">02 4049 1735</a> or email <a href="mailto:mayfieldphonerepair@gmail.com">mayfieldphonerepair@gmail.com</a>.
          <?php endif; ?>
        </p>
        <div class="hero-actions">
          <a class="button button-primary" href="index.html">Return Home</a>
          <a class="button button-secondary" href="contact.html">Contact Us</a>
        </div>
      </div>
    </main>

    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a class="brand footer-brand" href="index.html">Mayfield Repairs</a>
          <p>Fast, affordable phone repair in Mayfield & Newcastle NSW.</p>
          <p>276 Maitland Rd, Mayfield NSW 2304</p>
          <p><a href="tel:0240491735">02 4049 1735</a> · <a href="mailto:mayfieldphonerepair@gmail.com">mayfieldphonerepair@gmail.com</a></p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Mayfield Cell Phone Repairs. Independent local repair service.</p>
      </div>
    </footer>

    <script defer type="text/javascript" src="https://birdeye.com/embed/v6/110315/1/1100782395/89b0ec9ad7b6e3429a216196386d88f1c2f4a2be91fe1a62"></script>
    <div id="bf-revz-widget-1100782395"></div>
    <script src="scripts.js" defer></script>
  </body>
</html>
