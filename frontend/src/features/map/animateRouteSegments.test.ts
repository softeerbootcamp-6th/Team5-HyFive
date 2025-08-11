import animateRouteSegments from "@/features/map/animateRouteSegments.util";
import getRouteSegments from "@/features/map/getRouteSegments.util";
import type { LatLng } from "@/features/map/Map.types";

const TEST_PATH = [
  { lat: 37.65350753605161, lng: 127.05272873217041 },
  { lat: 37.65325505753623, lng: 127.05318184012343 },
  { lat: 37.65311067453145, lng: 127.05368035131548 },
  { lat: 37.65311036317523, lng: 127.05436027948892 },
  { lat: 37.65311019551619, lng: 127.0547229078438 },
];

describe("ruquestAnimationFrame로 지도 위에 분할한 경로들을 순차 렌더링한다.", () => {
  let requestAnimationFrameCallback: FrameRequestCallback; //실행 타이밍 수동 제어
  const renderSegment = vi.fn(); //비즈니스 로직에 포함된 콜백 함수 모킹

  //각 테스트 직전 준비 로직
  beforeEach(() => {
    vi.clearAllMocks(); //이전 테스트 호출 기록 삭제
    //window.requestAnimationFrame이 발생하면 > 가로채서 콜백으로 테스트 코드에서 제공하는 구현 사용
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      requestAnimationFrameCallback = callback;
      return 0;
    });
  });

  //각 테스트 종료 후 원상복구 로직
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("분할된 경로 순서대로 requestAnimationFrame을 호출한다.", () => {
    //given
    const segments = getRouteSegments({ path: TEST_PATH, size: 2 });

    //when
    animateRouteSegments({ segments, renderSegment });

    //then
    //테스트 단계: rAF 처음 예약 > 콜백 실행으로 다음 예약 반복 > 예약 멈춤

    //animateRouteSegments의 최초 requestAnimationFrame 호출(예약) 확인
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
    //수동으로 실행할 콜백 정의 확인
    expect(requestAnimationFrameCallback).toBeDefined();

    //첫 세그먼트 의도적 렌더링 및 rAF 호출 확인
    requestAnimationFrameCallback(0);
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2);

    //나머지 세그먼트 렌더링 rAF 호출 확인
    const expectedCalls = segments.length + 1; //콜백 실행(n)+초기 실행(1)
    for (let i = 1; i < expectedCalls; i++) {
      requestAnimationFrameCallback(0);
    }
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(expectedCalls);
  });

  it("빈 세그먼트일 경우 requestAnimationFrame을 호출하지 않는다.", () => {
    //given
    const segments: LatLng[][] = [];

    //when
    animateRouteSegments({ segments, renderSegment });

    //then
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
    expect(renderSegment).not.toHaveBeenCalled();
  });
});
