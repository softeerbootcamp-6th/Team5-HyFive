package hyfive.gachita;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GachitaApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void alwaysFailTest() {
		fail("항상 실패하는 테스트!");
	}

}
