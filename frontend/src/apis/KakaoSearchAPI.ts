import type { KakaoKeywordResponse } from "@/types/kakaoSearch.types";

type KakaoSearchParams = {
  query: string;
  page?: number; // 1~45
  size?: number; // 1~15
  x?: number; // 경도
  y?: number; // 위도
  radius?: number; // m (최대 20000)
  sort?: "accuracy" | "distance";
  signal?: AbortSignal;
};

export const fetchKakaoSearch = async ({
  query,
  page = 1,
  size = 10,
  x,
  y,
  radius,
  sort,
  signal,
}: KakaoSearchParams): Promise<KakaoKeywordResponse> => {
  const url = new URL("https://dapi.kakao.com/v2/local/search/keyword.json");

  const KAKAO_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  if (!KAKAO_KEY) {
    throw new Error("Kakao REST API key를 찾지 못했어요");
  }

  const safeRadius = radius ? Math.min(radius, 20000) : undefined;

  url.searchParams.set("query", query);
  url.searchParams.set("page", String(page));
  url.searchParams.set("size", String(size));
  if (x && y) {
    url.searchParams.set("x", String(x));
    url.searchParams.set("y", String(y));
    if (safeRadius) url.searchParams.set("radius", String(safeRadius));
    if (sort) url.searchParams.set("sort", sort);
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `KakaoAK ${KAKAO_KEY}`,
    },
    signal,
  });

  if (!response.ok) {
    const msg = () => {
      switch (response.status) {
        case 401:
          return "Kakao 인증에 문제가 있어요(401)";
        case 403:
          return "Kakao API 접근이 거부되었어요(403)";
        case 429:
          return "요청이 너무 많아요(429)";
        default:
          return `Kakao API 에러(${response.status})`;
      }
    };
    throw new Error(msg());
  }

  return (await response.json()) as KakaoKeywordResponse;
};
