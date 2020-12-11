package net.ddns.tccapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/api/aula/**",
                        "/api/avaliacao/**",
                        "/api/aluno/**",
                        "/api/bloco/**",
                        "/api/professor/**",
                        "/api/publicacao/**",
                        "/api/turma/**",
                        "/api/resposta/**",
                        "/api/usuario/**"
                ).fullyAuthenticated()
                .antMatchers("/api/cadastro/**",
                        "/api/public/**",
                        "/socket/**",
                        "/h2-console/**",
                        "/favicon.ico"
                ).permitAll()
                .anyRequest().denyAll();

        http.headers()
                .frameOptions()
                .disable();
    }
}
