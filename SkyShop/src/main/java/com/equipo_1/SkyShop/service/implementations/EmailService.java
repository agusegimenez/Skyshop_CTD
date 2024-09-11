package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.entity.EmailRequest;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class EmailService {
    @Autowired
    SendGrid sendGrid;
    public Response sendEmail(EmailRequest emailRequest){
        Mail mail = new Mail(new Email("dh.skyshop@gmail.com"), emailRequest.getSubject(), new Email(emailRequest.getTo()), new Content("text/plain", emailRequest.getBody()));
        mail.setReplyTo(new Email("abc@gmail.com"));
//        SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
        Request request = new Request();
        Response response = new Response();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            response = this.sendGrid.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
        return response;
    }
}
