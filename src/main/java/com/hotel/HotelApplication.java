package com.hotel;

import com.hotel.model.NotificationType;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

@SpringBootApplication
public class HotelApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(HotelApplication.class, args);
	}

	@Override
	public void run(String... arg0) throws Exception {
		boolean isWindows = System.getProperty("os.name")
				.toLowerCase().startsWith("windows");

		if (isWindows) {
			//Rejestruje admina w bazie danych login admin hasło: 12345678
			String cmdString = "cmd /c curl -X POST -H \"Content-Type: application/json\" -d @src/main/resources/data.json http://localhost:8080/api/auth/register";
			System.out.println(cmdString);
			Runtime.getRuntime().exec(cmdString);
			cmdString = "cmd /c curl -X POST -H \"Content-Type: application/json\" -d @src/main/resources/regularUser.json http://localhost:8080/api/auth/register";
			System.out.println(cmdString);
			Runtime.getRuntime().exec(cmdString);
		} else {
			//TODO
			/*Kto pracuje na linuxie niech sprobuje zrobić to samo polecenie
			abu automatycznie rejestrowalo admina
			Runtime.getRuntime()
					.exec(String.format("sh -c ls %s", homeDirectory));*/
			String shString = "curl -X POST -H \"Content-Type: application/json\" -d @src/main/resources/data.json http://localhost:8080/api/auth/register";
			System.out.println(shString);
			Runtime.getRuntime().exec(shString);

		}

	}


}
