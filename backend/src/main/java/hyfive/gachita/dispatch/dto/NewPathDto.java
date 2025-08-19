package hyfive.gachita.dispatch.dto;

import hyfive.gachita.client.kakao.RouteInfo;

import java.util.List;

public record NewPathDto(
        CarScheduleDto path,
        RouteInfo routeInfo,
        List<NewPathNodeDto> nodeList
) {}
