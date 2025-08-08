package hyfive.gachita.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VWorldApiResponse<T> {

    private ResponseBody<T> response;

    @Getter
    @Setter
    public static class ResponseBody<T> {
        private ServiceInfo service;
        private String status;
        private Result result;

        public boolean isSuccess() {
            return "OK".equalsIgnoreCase(status);
        }
    }

    @Getter
    @Setter
    public static class ServiceInfo {
        private String name;
        private String version;
        private String operation;
        private String time;
    }

    @Getter
    @Setter
    public static class Result {
        private String crs;
        private GeoCodeResult point;
    }
}