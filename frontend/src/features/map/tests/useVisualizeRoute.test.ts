import { describe, it, beforeEach, beforeAll, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useVisualizeRoute from "@/features/map/hooks/useVisualizeRoute";
import animateRouteSegments from "@/features/map/utils/animateRouteSegments.util";

//kakaomap api 관련 map, path mock data
const mapMock = {};
const pathMock = [
  {
    segmentId: 1,
    pointList: [
      { lat: 37.65350753605161, lng: 127.05272873217041 }, // 사용자1 탑승
      { lat: 37.65325505753623, lng: 127.05318184012343 }, // 사용자2 탑승
      { lat: 37.65311067453145, lng: 127.05368035131548 }, // 사용자1 하차
    ],
  },
  {
    segmentId: 2,
    pointList: [
      { lat: 37.65311036317523, lng: 127.05436027948892 }, // 사용자3 탑승
      { lat: 37.65311019551619, lng: 127.0547229078438 }, // 사용자2 하차
      { lat: 37.653362089238804, lng: 127.05553900952052 }, // 사용자4 탑승
    ],
  },
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
vi.mock("@/features/map/utils/animateRouteSegments.util", () => {
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
      useVisualizeRoute({
        map: mapMock as MapInstance,
        polylinePath: pathMock,
      }),
    );
  });

  it("전달된 map prop으로 setMap이 호출된다.", () => {
    expect(MockPolyline.setMap).toHaveBeenCalled();
    expect(MockPolyline.setMap).toHaveBeenCalledWith(mapMock);
  });

  it("경로 하이라이트, 경로 초기화 함수를 반환한다.", () => {
    const { result } = renderHook(() =>
      useVisualizeRoute({
        map: mapMock as MapInstance,
        polylinePath: pathMock,
      }),
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
      useVisualizeRoute({
        map: mapMock as MapInstance,
        polylinePath: pathMock,
      }),
    );
    expect(animateRouteSegments).toHaveBeenCalledTimes(1);
  });

  it("경로가 없을 때 렌더링하지 않는다.", () => {
    renderHook(() =>
      useVisualizeRoute({ map: mapMock as MapInstance, polylinePath: [] }),
    );
    expect(MockPolyline.setMap).not.toHaveBeenCalled();
    expect(animateRouteSegments).not.toHaveBeenCalled();
  });
});
