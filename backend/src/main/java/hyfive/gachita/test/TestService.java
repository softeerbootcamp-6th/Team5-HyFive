package hyfive.gachita.test;

import hyfive.gachita.common.response.BusinessException;
import hyfive.gachita.common.response.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestRepository testRepository;

    public Test createTest(Test test) {
        if (test.getTitle() == null || test.getTitle().isEmpty()) {
            throw new BusinessException(ErrorCode.INVALID_INPUT, "제목을 입력해주세요!");
        }
        return testRepository.save(test);
    }

    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    public Test getTestById(Long id) {
        return testRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE));
    }

    public Test updateTest(Long id, Test testDetails) {
        Test test = testRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE));

        if (testDetails.getTitle() == null || testDetails.getTitle().isEmpty()) {
            throw new BusinessException(ErrorCode.INVALID_INPUT, "제목을 입력해주세요.");
        }

        test.setTitle(testDetails.getTitle());
        test.setContent(testDetails.getContent());
        return testRepository.save(test);
    }

    public void deleteTest(Long id) {
        if (!testRepository.existsById(id)) {
            throw new BusinessException(ErrorCode.NO_EXIST_VALUE);
        }
        testRepository.deleteById(id);
    }
}
