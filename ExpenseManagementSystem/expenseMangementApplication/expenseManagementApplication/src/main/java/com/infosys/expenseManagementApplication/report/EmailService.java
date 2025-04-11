package com.infosys.expenseManagementApplication.report;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendExpenseReportEmail(String recipientEmail, byte[] pdfReport, String username) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(recipientEmail);
        helper.setSubject("Your Expense Report");
        String emailBody = String.format("Hi %s,\n\nPlease find your expense report attached.", username);
        helper.setText(emailBody);

        helper.addAttachment("ExpenseReport.pdf", () -> new java.io.ByteArrayInputStream(pdfReport));

        mailSender.send(message);
    }
}