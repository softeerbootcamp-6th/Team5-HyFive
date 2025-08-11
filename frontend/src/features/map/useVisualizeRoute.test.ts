import { describe, it, beforeEach, beforeAll, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useVisualizeRoute from "@/features/map/useVisualizeRoute";
import animateRouteSegments from "@/features/map/animateRouteSegments.util";
import getRouteSegments from "@/features/map/getRouteSegments.util";

//kakaomap api 관련 map, path mock data
const mapMock = {};
const pathMock = [
  { lat: 1, lng: 1 },
  { lat: 2, lng: 2 },
  { lat: 3, lng: 3 },
];

//kakaomap api Polyline 로직 mocking
const MockPolyline = {
  setMap: vi.fn(),
  setPath: vi.fn(),
};

//kakaomap api 관련 테스트 런타임 전용 참조 생성
beforeAll(() => {
  Object.defineProperty(window, "kakao", {
    value: {
      maps: {
        Polyline: vi.fn(() => MockPolyline),
        LatLng: vi.fn((lat, lng) => ({ lat, lng })),
      },
    },
  });
});

//유틸 함수 mocking
vi.mock("@/features/map/getRouteSegments.util", () => ({
  default: vi.fn(({ path, size }) => {
    return path.map((p: any) => Array.from({ length: size }, () => [p]));
  }),
}));

vi.mock("@/features/map/animateRouteSegments.util", () => {
  return {
    default: vi.fn(({ segments, renderSegment }) => {
      segments.forEach((segment: LatLngInstance[]) => renderSegment(segment));
    }),
  };
});

//전역 mock 초기화(describe 간 초기화)
beforeEach(() => {
  vi.clearAllMocks();
});

describe("지도에 경로를 순차적으로 렌더링할 준비 및 완료 작업을 진행한다.", () => {
  beforeEach(() => {
    renderHook(() =>
      useVisualizeRoute({ map: mapMock as MapInstance, path: pathMock }),
    );
  });

  it("전달된 map prop으로 setMap이 호출된다.", () => {
    expect(MockPolyline.setMap).toHaveBeenCalledTimes(1);
    expect(MockPolyline.setMap).toHaveBeenCalledWith(mapMock);
  });

  it("전달된 path prop으로 경로 분할 함수가 호출된다.", () => {
    expect(getRouteSegments).toHaveBeenCalledTimes(1);
    expect(getRouteSegments).toHaveBeenCalledWith({ path: pathMock, size: 2 });
  });

  it("경로 하이라이트, 경로 초기화 함수를 반환한다.", () => {
    const { result } = renderHook(() =>
      useVisualizeRoute({ map: mapMock as MapInstance, path: pathMock }),
    );
    expect(typeof result.current.highlightRoute).toBe("function");
    expect(typeof result.current.resetRoute).toBe("function");
  });
});

describe("지도에 경로를 순차적으로 렌더링한다.", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("애니메이션 시작 함수가 호출된다.", () => {
    renderHook(() =>
      useVisualizeRoute({ map: mapMock as MapInstance, path: pathMock }),
    );
    expect(animateRouteSegments).toHaveBeenCalledTimes(1);
  });

  it("경로가 없을 때 렌더링하지 않는다.", () => {
    renderHook(() =>
      useVisualizeRoute({ map: mapMock as MapInstance, path: [] }),
    );
    expect(MockPolyline.setMap).not.toHaveBeenCalled();
    expect(animateRouteSegments).not.toHaveBeenCalled();
  });
});
