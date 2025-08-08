package hyfive.gachita.api.handler;

import hyfive.gachita.api.VWorldApiClient;
import hyfive.gachita.api.dto.GeoCodeRequest;
import hyfive.gachita.api.dto.GeoCodeResult;
import hyfive.gachita.api.dto.VWorldApiResponse;
import org.springframework.stereotype.Component;

@Component
public class GetCoordHandler implements GeoCodeHandler {

    private final VWorldApiClient apiClient;

    public GetCoordHandler(VWorldApiClient apiClient) {
        this.apiClient = apiClient;
    }

    @Override
    public String getRequestType() {
        return "getCoord";
    }

    @Override
    public VWorldApiResponse<GeoCodeResult> handle(GeoCodeRequest request) {
        if (request.getAddress() == null || request.getAddress().isBlank()) {
            throw new IllegalArgumentException("address must not be null for getCoord request");
        }
        return apiClient.callGeoCodeApi(request);
    }
}
