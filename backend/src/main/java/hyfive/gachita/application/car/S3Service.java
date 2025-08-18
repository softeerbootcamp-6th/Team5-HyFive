package hyfive.gachita.application.car;

import hyfive.gachita.global.BusinessException;
import hyfive.gachita.global.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Service {

    @Value("${spring.cloud.aws.s3.bucket:defaultBucket}")
    private String bucketName;
    private final S3Client s3Client;

    private final String BASE_PATH = "images/";
    private final long MAX_FILE_SIZE = 20 * 1024 * 1024;

    public String uploadImage(MultipartFile file) {
        try {
            validateFile(file);

            String key = getKey(file.getOriginalFilename());

            // 객체 업로드
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(
                    putObjectRequest,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize())
            );

            // url 반환
            GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();
            return s3Client.utilities().getUrl(getUrlRequest).toString();

        }  catch (IOException e) {
            log.error("S3 업로드 중 IOException 발생", e);
            throw new BusinessException(ErrorCode.S3_UPLOAD_FAILED);
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            log.error("S3 업로드 중 알 수 없는 예외 발생", e);
            throw new BusinessException(ErrorCode.S3_UPLOAD_FAILED);
        }
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty() || file.getSize() <= 0) {
            log.error("파일이 비어있거나 크기가 0 이하입니다.");
            throw new BusinessException(ErrorCode.EMPTY_FILE);
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            log.error("파일 크기 초과: {} bytes", file.getSize());
            throw new BusinessException(ErrorCode.MAX_UPLOAD_SIZE_EXCEEDED);
        }

        String extension = getExtension(file.getOriginalFilename());
        if (!isAllowedExtension(extension)) {
            log.error("허용되지 않은 확장자: {}", extension);
            throw new BusinessException(ErrorCode.FILE_TYPE_NOT_ALLOWED);
        }
    }

    private boolean isAllowedExtension(String extension) {
        String[] allowed = {"jpg", "jpeg", "png", "gif", "webp"};
        for (String allow : allowed) {
            if (allow.equalsIgnoreCase(extension)) {
                return true;
            }
        }
        return false;
    }

    private String getKey(String fileName) {
        String key = UUID.randomUUID().toString();
        String extension = getExtension(fileName);
        if (extension.isEmpty()) {
            extension = "bin";  // 기본 확장자 지정
        }
        return BASE_PATH + key + "." +  extension;
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) return "";
        return filename.substring(filename.lastIndexOf(".") + 1);
    }
}

