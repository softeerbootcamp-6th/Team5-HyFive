package hyfive.gachita.api.handler;

import hyfive.gachita.api.VWorldApiClient;
import hyfive.gachita.api.dto.GeoCodeRequest;
import hyfive.gachita.api.dto.GeoCodeResult;
import hyfive.gachita.api.dto.VWorldApiResponse;
import org.springframework.stereotype.Component;

@Component
public class GetAddressHandler implements GeoCodeHandler {

    private final VWorldApiClient apiClient;

    public GetAddressHandler(VWorldApiClient apiClient) {
        this.apiClient = apiClient;
    }

    @Override
    public String getRequestType() {
        return "getAddress";
    }

    @Override
    public VWorldApiResponse<GeoCodeResult> handle(GeoCodeRequest request) {
        if (request.getPoint() == null || request.getPoint().isBlank()) {
            throw new IllegalArgumentException("point must not be null for getAddress request");
        }
        return apiClient.callGeoCodeApi(request);
    }
}
