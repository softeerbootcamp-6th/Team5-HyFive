package hyfive.gachita.client.geocode;

import hyfive.gachita.client.geocode.dto.CoordResult;
import hyfive.gachita.client.geocode.dto.GeoCodeReq;
import hyfive.gachita.client.geocode.dto.LatLng;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeoCodeService {
    private final GeoCodeApiClient geoCodeApiClient;
    public LatLng getPointByAddress(String address) {
        GeoCodeReq request = GeoCodeReq.forCoord(address);
        CoordResult result = geoCodeApiClient.callGeoCodeApi(request);

        double lat = Double.parseDouble(result.point().y());
        double lng = Double.parseDouble(result.point().x());
        return new LatLng(lat, lng);
    }
}
