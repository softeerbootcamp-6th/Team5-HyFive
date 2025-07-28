package hyfive.gachita.test;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestRepository testRepository;

    public Test createTest(Test test) {
        return testRepository.save(test);
    }

    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    public Test getTestById(Long id) {
        return testRepository.findById(id).orElse(null);
    }

    public Test updateTest(Long id, Test testDetails) {
        Test test = testRepository.findById(id).orElse(null);
        if (test != null) {
            test.setTitle(testDetails.getTitle());
            test.setContent(testDetails.getContent());
            return testRepository.save(test);
        }
        return null;
    }

    public void deleteTest(Long id) {
        testRepository.deleteById(id);
    }
}
