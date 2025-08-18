package hyfive.gachita;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class GachitaApplication {

	public static void main(String[] args) {
		SpringApplication.run(GachitaApplication.class, args);
	}

}
