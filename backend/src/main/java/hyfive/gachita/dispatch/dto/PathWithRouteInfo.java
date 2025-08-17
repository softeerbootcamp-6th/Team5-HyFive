package hyfive.gachita.dispatch.dto;

import hyfive.gachita.client.kakao.RouteInfo;

public record PathWithRouteInfo(NewPathDto path, RouteInfo routeInfo) {}
