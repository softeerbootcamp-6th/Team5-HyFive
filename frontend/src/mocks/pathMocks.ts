// polyline (센터에서 출발 → 사용자 픽업/하차 → 최종 목적지)
export const polylinePath = [
  {
    segmentId: 1,
    pointList: [
      // 사용자1 탑승
      { lat: 37.65350753605161, lng: 127.05272873217041 },
      // 사용자2 탑승
      { lat: 37.65325505753623, lng: 127.05318184012343 },
      // 사용자1 하차
      { lat: 37.65311067453145, lng: 127.05368035131548 },
    ],
  },
  {
    segmentId: 2,
    pointList: [
      // 사용자3 탑승
      { lat: 37.65311036317523, lng: 127.05436027948892 },
      // 사용자2 하차
      { lat: 37.65311019551619, lng: 127.0547229078438 },
      // 사용자4 탑승
      { lat: 37.653362089238804, lng: 127.05553900952052 },
    ],
  },
  {
    segmentId: 3,
    pointList: [
      // 사용자3 하차
      { lat: 37.653361917955415, lng: 127.0559016390923 },
      // 사용자4 하차
      { lat: 37.65343375919791, lng: 127.05640030926403 },
      // 사용자5 탑승
      { lat: 37.65343356344683, lng: 127.05680826791813 },
    ],
  },
  {
    segmentId: 4,
    pointList: [
      // 사용자6 탑승
      { lat: 37.65357728054196, lng: 127.05771495426367 },
      // 사용자5 하차
      { lat: 37.65418950135154, lng: 127.05862201241132 },
      // 사용자6 하차
      { lat: 37.654297027637085, lng: 127.05980065822715 },
    ],
  },
];

// marker (각 승객의 탑승/하차 이벤트 표시)
export const markerPath = [
  // 사용자1 박영희
  {
    nodeId: 1,
    bookId: 1,
    point: { lat: 37.65350753605161, lng: 127.05272873217041 },
    time: "10:00",
    type: "START", // 탑승
  },
  {
    nodeId: 2,
    bookId: 1,
    point: { lat: 37.65311067453145, lng: 127.05368035131548 },
    time: "10:15",
    type: "END", // 하차
  },

  // 사용자2 김철수
  {
    nodeId: 3,
    bookId: 2,
    point: { lat: 37.65325505753623, lng: 127.05318184012343 },
    time: "10:05",
    type: "START", // 탑승
  },
  {
    nodeId: 4,
    bookId: 2,
    point: { lat: 37.65311019551619, lng: 127.0547229078438 },
    time: "10:25",
    type: "END", // 하차
  },

  // 사용자3 이민호
  {
    nodeId: 5,
    bookId: 3,
    point: { lat: 37.65311036317523, lng: 127.05436027948892 },
    time: "10:20",
    type: "START", // 탑승
  },
  {
    nodeId: 6,
    bookId: 3,
    point: { lat: 37.653361917955415, lng: 127.0559016390923 },
    time: "10:35",
    type: "END", // 하차
  },

  // 사용자4 정다은
  {
    nodeId: 7,
    bookId: 4,
    point: { lat: 37.653362089238804, lng: 127.05553900952052 },
    time: "10:30",
    type: "START", // 탑승
  },
  {
    nodeId: 8,
    bookId: 4,
    point: { lat: 37.65343375919791, lng: 127.05640030926403 },
    time: "10:40",
    type: "END", // 하차
  },

  // 사용자5 최수진
  {
    nodeId: 9,
    bookId: 5,
    point: { lat: 37.65343356344683, lng: 127.05680826791813 },
    time: "10:45",
    type: "START", // 탑승
  },
  {
    nodeId: 10,
    bookId: 5,
    point: { lat: 37.65418950135154, lng: 127.05862201241132 },
    time: "10:55",
    type: "END", // 하차
  },

  // 사용자6 한지우
  {
    nodeId: 11,
    bookId: 6,
    point: { lat: 37.65357728054196, lng: 127.05771495426367 },
    time: "10:50",
    type: "START", // 탑승
  },
  {
    nodeId: 12,
    bookId: 6,
    point: { lat: 37.654297027637085, lng: 127.05980065822715 },
    time: "11:00",
    type: "END", // 하차
  },
];

export const highlightPath = [
  {
    bookId: 1,
    bookName: "박영희",
    startTime: "08:20",
    endTime: "09:00",
    startAddr: "공릉로 168-5",
    endAddr: "동일로 1349 노원의료원",
    startLoc: {
      lat: 37.65311036317523,
      lng: 127.05436027948892,
    },
    endLoc: {
      lat: 37.653361917955415,
      lng: 127.0559016390923,
    },
    hospitalTime: "12:00",
    segmentList: [5, 6, 7, 8, 9],
  },
  {
    bookId: 2,
    bookName: "김철수",
    startTime: "07:50",
    endTime: "08:30",
    startAddr: "노원로 26길 15",
    endAddr: "중계로 211",
    startLoc: {
      lat: 37.65350753605161,
      lng: 127.05272873217041,
    },
    endLoc: {
      lat: 37.65420012350112,
      lng: 127.05682139418213,
    },
    hospitalTime: "12:00",
    segmentList: [2, 3, 4],
  },
  {
    bookId: 3,
    bookName: "이민호",
    startTime: "09:10",
    endTime: "09:50",
    startAddr: "중계본동 123-4",
    endAddr: "하계동 45-7",
    startLoc: {
      lat: 37.65225505753623,
      lng: 127.05318184012343,
    },
    endLoc: {
      lat: 37.65391067453145,
      lng: 127.05743184019872,
    },
    hospitalTime: "12:00",
    segmentList: [10, 11, 12],
  },
  {
    bookId: 4,
    bookName: "정다은",
    startTime: "08:40",
    endTime: "09:20",
    startAddr: "노원구 월계동 321",
    endAddr: "노원구 하계동 88",
    startLoc: {
      lat: 37.65431098235315,
      lng: 127.05394291751234,
    },
    endLoc: {
      lat: 37.65542198231245,
      lng: 127.05856128342111,
    },
    hospitalTime: "12:00",
    segmentList: [13, 14, 15, 16],
  },
  {
    bookId: 5,
    bookName: "최수진",
    startTime: "07:30",
    endTime: "08:10",
    startAddr: "상계동 777-1",
    endAddr: "공릉동 42-10",
    startLoc: {
      lat: 37.65151012345112,
      lng: 127.05220123912231,
    },
    endLoc: {
      lat: 37.65291239124111,
      lng: 127.05567219381234,
    },
    hospitalTime: "12:00",
    segmentList: [1, 2, 3, 4],
  },
  {
    bookId: 6,
    bookName: "한지우",
    startTime: "10:00",
    endTime: "10:40",
    startAddr: "노원구 상계로 55",
    endAddr: "노원구 동일로 1230",
    startLoc: {
      lat: 37.65361239123844,
      lng: 127.05182391283321,
    },
    endLoc: {
      lat: 37.65472391238442,
      lng: 127.05782391284111,
    },
    hospitalTime: "12:00",
    segmentList: [20, 21, 22],
  },
];
