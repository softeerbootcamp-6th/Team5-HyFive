import getRouteMidPoint from "@/features/map/utils/getRouteMidPoint.util";

const TEST_PATH = [
  { lat: 37.65350753605161, lng: 127.05272873217041 },
  { lat: 37.65325505753623, lng: 127.05318184012343 },
  { lat: 37.65311067453145, lng: 127.05368035131548 },
  { lat: 37.65311036317523, lng: 127.05436027948892 },
  { lat: 37.65311019551619, lng: 127.0547229078438 },
];

describe("지도의 중점을 올바르게 반환한다.", () => {
  it("전체 경로의 길이가 홀수인 경우 중앙값에 해당하는 위치를 반환한다.", () => {
    //when
    const centerLatLng = getRouteMidPoint(TEST_PATH);

    //then
    expect(centerLatLng).toEqual({
      lat: 37.65311067453145,
      lng: 127.05368035131548,
    });
  });

  it("전체 경로의 길이가 짝수인 경우 중앙 기준 좌측에 해당하는 위치를 반환한다.", () => {
    //when
    const centerLatLng = getRouteMidPoint(
      TEST_PATH.slice(0, TEST_PATH.length - 1),
    );

    //then
    expect(centerLatLng).toEqual({
      lat: 37.65325505753623,
      lng: 127.05318184012343,
    });
  });

  it("전체 경로의 길이가 1인 경우 해당 요소의 위치를 반환한다.", () => {
    //when
    const centerLatLng = getRouteMidPoint(TEST_PATH.slice(0, 1));

    //then
    expect(centerLatLng).toEqual({
      lat: 37.65350753605161,
      lng: 127.05272873217041,
    });
  });

  it("전체 경로의 길이가 음수거나 0인 경우 기본 위치를 반환한다.", () => {
    //when
    const centerLatLng = getRouteMidPoint(TEST_PATH.slice(0, 0));

    //then
    expect(centerLatLng).toEqual({ lat: 37.674088, lng: 127.070157 });
  });
});
