import { useEffect, useState } from "react";
import { fetchKakaoSearch } from "@/apis/KakaoSearchAPI";
import type { AddressItem } from "./AddressDropdown";

interface UseAddressSearchProps {
  query: string;
  enabled: boolean;
}

interface UseAddressSearchReturn {
  results: AddressItem[];
  isLoading: boolean;
  error: string | null;
}

// 노원구 상계동 기준 위치
const DEFAULT_LOCATION = {
  x: 127.06694995614, // 경도
  y: 37.655038011447, // 위도
};
// 기준 위치에서 검색 허용 반경
const DEFAULT_DISTANCE = 20 * 1000; // 20km

export const useAddressSearch = ({
  query,
  enabled,
}: UseAddressSearchProps): UseAddressSearchReturn => {
  const [results, setResults] = useState<AddressItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !query.trim()) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const searchAddress = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetchKakaoSearch({
          query: query.trim(),
          size: 10,
          x: DEFAULT_LOCATION.x,
          y: DEFAULT_LOCATION.y,
          radius: DEFAULT_DISTANCE,
          signal: controller.signal,
          sort: "accuracy",
        });

        const transformedResults: AddressItem[] = response.documents.map(
          (doc) => ({
            id: doc.id,
            name: doc.place_name,
            addr: doc.road_address_name || doc.address_name,
          }),
        );

        setResults(transformedResults);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError("주소 검색 중 오류가 발생했어요");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    void searchAddress();

    return () => {
      controller.abort();
    };
  }, [query, enabled]);

  return { results, isLoading, error };
};
