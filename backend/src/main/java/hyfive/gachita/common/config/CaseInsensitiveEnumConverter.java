package hyfive.gachita.common.config;

import hyfive.gachita.common.response.BusinessException;
import hyfive.gachita.common.response.ErrorCode;
import org.springframework.core.convert.TypeDescriptor;
import org.springframework.core.convert.converter.GenericConverter;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class CaseInsensitiveEnumConverter implements GenericConverter {

    @Override
    public Set<ConvertiblePair> getConvertibleTypes() {
        Set<ConvertiblePair> pairs = new HashSet<>();
        pairs.add(new ConvertiblePair(String.class, Enum.class));
        return pairs;
    }

    @Override
    public Object convert(Object source, TypeDescriptor sourceType, TypeDescriptor targetType) {
        if (source instanceof String string && targetType.getType().isEnum()) {
            @SuppressWarnings("unchecked")
            Class<? extends Enum> enumType = (Class<? extends Enum>) targetType.getType();
            try {
                return Enum.valueOf(enumType, string.toUpperCase());
            } catch (IllegalArgumentException exception

            ) {
                String validValues = Arrays.stream(enumType.getEnumConstants())
                        .map(e -> e.name().toLowerCase())
                        .collect(Collectors.joining(", "));
                throw new BusinessException(
                        ErrorCode.INVALID_INPUT,
                        "유효하지 않은 값입니다: '" + string + "'. 허용 가능한 값: [" + validValues + "]"
                );
            }
        }
        throw new BusinessException(ErrorCode.INVALID_INPUT, "요청 값이 문자열이 아니거나 대상 타입이 Enum이 아닙니다.");
    }
}
