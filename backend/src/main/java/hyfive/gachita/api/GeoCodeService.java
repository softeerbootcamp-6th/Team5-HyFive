package hyfive.gachita.api;

import hyfive.gachita.api.dto.CoordResult;
import hyfive.gachita.api.dto.GeoCodeReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeoCodeService {
    private final GeoCodeApiClient geoCodeApiClient;
    public LatLng getPointByAddress(String address) {
        GeoCodeReq request = GeoCodeReq.forCoord(address);
        CoordResult result = geoCodeApiClient.callGeoCodeApi(request);

        double lat = Double.parseDouble(result.point().x());
        double lng = Double.parseDouble(result.point().y());
        return new LatLng(lat, lng);
    }
}
