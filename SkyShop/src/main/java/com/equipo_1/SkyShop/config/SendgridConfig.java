package com.equipo_1.SkyShop.config;

import com.sendgrid.SendGrid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SendgridConfig {
    @Value("${sendgrid.key}")
    private String key;

    @Bean
    public SendGrid getSendgrid(){
        System.out.println("SendGrid API Key: " + key);
        return new SendGrid(key);
    }
}
