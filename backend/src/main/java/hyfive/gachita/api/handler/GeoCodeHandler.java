package hyfive.gachita.api.handler;

import hyfive.gachita.api.dto.GeoCodeRequest;
import hyfive.gachita.api.dto.GeoCodeResult;
import hyfive.gachita.api.dto.VWorldApiResponse;

public interface GeoCodeHandler {
    String getRequestType(); // "getCoord" or "getAddress"
    VWorldApiResponse<GeoCodeResult> handle(GeoCodeRequest request);
}