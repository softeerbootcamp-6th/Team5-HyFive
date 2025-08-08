package hyfive.gachita.api;

import hyfive.gachita.api.handler.GeoCodeHandler;
import hyfive.gachita.api.dto.GeoCodeRequest;
import hyfive.gachita.api.dto.GeoCodeResult;
import hyfive.gachita.api.dto.VWorldApiResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GeoCodeService {

    private final Map<String, GeoCodeHandler> handlerMap;

    public GeoCodeService(List<GeoCodeHandler> handlers) {
        this.handlerMap = handlers.stream()
                .collect(Collectors.toMap(GeoCodeHandler::getRequestType, h -> h));
    }

    public VWorldApiResponse<GeoCodeResult> callGeoCodeApi(GeoCodeRequest request) {
        GeoCodeHandler handler = handlerMap.get(request.getRequest());
        if (handler == null) {
            throw new IllegalArgumentException("Unsupported request type: " + request.getRequest());
        }
        return handler.handle(request);
    }
}

