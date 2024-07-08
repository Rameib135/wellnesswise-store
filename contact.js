
 // send email for contact page //////////////////////////////////////////////////////////////////////////////////////////////////////////
function sendEmail() {
    const fullName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
  
    const bodyMessage = `Full Name: ${fullName}<br>
                         Email: ${email}<br>
                         subject: ${subject}<br>
                         Message: ${message}`;
  
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "rameibrahem123@gmail.com", // Replace with your actual username
        Password: "2BA978A2D0D03A9F2D2CDC6734AEBAC7CB11", // Replace with your actual password
        To: 'rameibrahem123@gmail.com', // Replace with the email where you want to receive messages
        From: "rameibrahem123@gmail.com", // Replace with your email
        Subject: subject,
        Body: bodyMessage,
    }).then(
        message => alert(message)
    );
  }

  const smtpTransport = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    auth: {
        user: 'rameibrahem123@gmail.com', // Replace with your actual username
        pass: '2BA978A2D0D03A9F2D2CDC6734AEBAC7CB11', // Replace with your actual password
    },
});

app.use(express.json());

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: 'your_email@example.com', // Replace with your email
        to: 'your_email@example.com', // Replace with the email where you want to receive messages
        subject,
        html: `Full Name: ${name}<br>
               Email: ${email}<br>
               Phone Number: ${subject}<br>
               Message: ${message}`,
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            res.status(500).json({ success: false, error: error.message });
        } else {
            res.json({ success: true, message: 'Email sent successfully.' });
        }
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

