import getRouteSegment from "@/features/map/getRouteSegment.util";

const path = [
  { lat: 37.65350753605161, lng: 127.05272873217041 },
  { lat: 37.65325505753623, lng: 127.05318184012343 },
  { lat: 37.65311067453145, lng: 127.05368035131548 },
  { lat: 37.65311036317523, lng: 127.05436027948892 },
  { lat: 37.65311019551619, lng: 127.0547229078438 },
];

describe("전체 경로를 분할한다", () => {
  describe.each([
    {
      label: "주어진 시작-끝 인덱스 구간의 전체 경로를 반환한다.",
      start: 1,
      end: 3,
      expected: [
        { lat: 37.65325505753623, lng: 127.05318184012343 },
        { lat: 37.65311067453145, lng: 127.05368035131548 },
        { lat: 37.65311036317523, lng: 127.05436027948892 },
      ],
    },
    {
      label:
        "시작 인덱스와 끝 인덱스가 동일하다면 하나의 경로에 대한 배열을 반환한다.",
      start: 1,
      end: 1,
      expected: [{ lat: 37.65325505753623, lng: 127.05318184012343 }],
    },
    {
      label: "시작 인덱스와 끝 인덱스 초과라면 빈 배열을 반환한다.",
      start: 4,
      end: 3,
      expected: [],
    },
    {
      label:
        "끝 인덱스가 범위에 벗어난다면 전체 경로의 길이만큼 인덱스를 재설정하여 배열을 반환한다.",
      start: 3,
      end: 1000,
      expected: [
        { lat: 37.65311036317523, lng: 127.05436027948892 },
        { lat: 37.65311019551619, lng: 127.0547229078438 },
      ],
    },
  ])("$label", ({ start, end, expected }) => {
    it(`start=${start}, end=${end}`, () => {
      expect(getRouteSegment({ path, start, end })).toEqual(expected);
    });
  });
});
