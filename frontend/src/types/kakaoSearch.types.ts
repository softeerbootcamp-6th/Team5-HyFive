// 카카오 장소 검색 API 응답 타입 정의
export interface KakaoMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export interface KakaoPlace {
  id: string;
  place_name: string;
  road_address_name: string;
  address_name: string;
  x: string; // 경도 lon
  y: string; // 위도 lat
  place_url: string;
  distance?: string;
}

export interface KakaoKeywordResponse {
  meta: KakaoMeta;
  documents: KakaoPlace[];
}

/** UI에서 쓰는 공통 항목 (Dropdown용) */
export interface AddressItem {
  id: string;
  name: string;
  addr: string;
  lat: number; // +y
  lon: number; // +x
  placeUrl?: string;
  distance?: number;
}
