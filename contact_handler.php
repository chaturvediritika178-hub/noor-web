<?php
/**
 * Noorjahan Moving Images - Contact Form Handler
 * Upload this file to your Hostinger public_html folder.
 */

// Database Configuration - UPDATE THESE WITH YOUR HOSTINGER DETAILS
$db_host = 'localhost';
$db_user = 'u123456789_noorjahan'; // Replace with your DB user
$db_pass = 'YourDBPassword'; // Replace with your DB password
$db_name = 'u123456789_noorjahan_db'; // Replace with your DB name

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $name = filter_var($input['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
    $message = filter_var($input['message'], FILTER_SANITIZE_STRING);
    
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => 'Please fill all fields.']);
        exit;
    }

    // 1. Save to Database
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
    if ($conn->connect_error) {
        echo json_encode(['status' => 'error', 'message' => 'Database connection failed.']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);
    $stmt->execute();
    $stmt->close();
    $conn->close();

    // 2. Send Confirmation Email to Client
    $to = $email;
    $subject = "Transmission Received - Noorjahan Moving Images";
    
    // HTML Email Template
    $email_content = '
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: "Helvetica", Arial, sans-serif; background-color: #FDFCFB; color: #000; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 60px auto; padding: 40px; border: 1px solid #eee; }
            .logo { text-align: center; margin-bottom: 40px; }
            .logo h1 { font-family: "Georgia", serif; font-size: 24px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: normal; }
            .content { line-height: 1.8; font-size: 15px; font-weight: 300; }
            .footer { margin-top: 60px; font-size: 10px; opacity: 0.5; text-align: center; letter-spacing: 0.1em; text-transform: uppercase; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <h1>Noorjahan</h1>
            </div>
            <div class="content">
                <p>Greetings ' . $name . ',</p>
                <p>We have received your transmission. Our team is currently reviewing your message and will reach out to you shortly.</p>
                <p>Thank you for connecting with us.</p>
                <p>Sincerely,<br>Noorjahan Moving Images</p>
            </div>
            <div class="footer">
                &copy; ' . date("Y") . ' Noorjahan Moving Images. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    ';

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Noorjahan Moving Images <hello@yourdomain.com>" . "\r\n"; // Replace with your domain email

    mail($to, $subject, $email_content, $headers);

    // 3. Optional: Notify yourself
    $my_email = "hello@noorjahan.com"; // Replace with your notification email
    $my_subject = "New Inquiry: " . $name;
    $my_body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    mail($my_email, $my_subject, $my_body, "From: web-inquiry@yourdomain.com");

    echo json_encode(['status' => 'success', 'message' => 'Transmission received.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
