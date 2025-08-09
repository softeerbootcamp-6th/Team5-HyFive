package hyfive.gachita.api;

import hyfive.gachita.api.dto.GeoCodeRequest;
import hyfive.gachita.api.dto.GeoCodeResult;
import hyfive.gachita.api.dto.VWorldApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeoCodeService {
    private final VWorldApiClient apiClient;

    public VWorldApiResponse<GeoCodeResult> callGeoCodeApi(GeoCodeRequest request) {
        return apiClient.callGeoCodeApi(request);
    }
}

