import useInitializeMap from "@/features/map/useInitializeMap";
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}
const path = [
  { lat: 127.05272873217041, lng: 37.65350753605161 },
  { lat: 127.05318184012343, lng: 37.65325505753623 },
  { lat: 127.05368035131548, lng: 37.65311067453145 },
  { lat: 127.05436027948892, lng: 37.65311036317523 },
  { lat: 127.0547229078438, lng: 37.65311019551619 },
  { lat: 127.05553900952052, lng: 37.653362089238804 },
  { lat: 127.0559016390923, lng: 37.653361917955415 },
  { lat: 127.05640030926403, lng: 37.65343375919791 },
  { lat: 127.05680826791813, lng: 37.65343356344683 },
  { lat: 127.05771495426367, lng: 37.65357728054196 },
  { lat: 127.05862201241132, lng: 37.65418950135154 },
  { lat: 127.05980065822715, lng: 37.654297027637085 },
  { lat: 127.06002742058135, lng: 37.65444106964698 },
  { lat: 127.06048071406839, lng: 37.65444083811633 },
  { lat: 127.06097933689813, lng: 37.65444058142082 },
  { lat: 127.06143280852105, lng: 37.65465658190231 },
  { lat: 127.06197676226272, lng: 37.65465629737477 },
  { lat: 127.06274739371024, lng: 37.654691929277135 },
  { lat: 127.06360868492726, lng: 37.65472750729467 },
  { lat: 127.06460627783275, lng: 37.655123397361734 },
  { lat: 127.06551315799398, lng: 37.65544725080041 },
  { lat: 127.06601185131575, lng: 37.655519051366085 },
  { lat: 127.06641985340757, lng: 37.65555486163405 },
  { lat: 127.06669225257744, lng: 37.65602321865402 },
  { lat: 127.06669267163532, lng: 37.65649172908793 },
  { lat: 127.06671577226386, lng: 37.65697824629785 },
  { lat: 127.06646683791851, lng: 37.657410858143386 },
];

const MapContent = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const { map: initializedMap } = useInitializeMap({
    mapRef,
    centerLat: path[(path.length - 1) / 2].lng,
    centerLng: path[(path.length - 1) / 2].lat,
  });

  useEffect(() => {
    if (!initializedMap) return;

    const linePath = path.map(
      (point) => new window.kakao.maps.LatLng(point.lng, point.lat),
    );

    const polyline = new window.kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 16,
      strokeColor: "#F70",
      strokeOpacity: 1,
      strokeStyle: "solid",
    });

    polyline.setMap(initializedMap);

    const getMarkerType = (
      index: number,
      length: number,
    ): keyof typeof imageSrc => {
      if (index === 0) return "start";
      if (index === length - 1) return "end";
      return "middle";
    };

    const imageSrc = {
      start: "/src/assets/icons/marker-start.svg",
      middle: "/src/assets/icons/marker-default.svg",
      end: "/src/assets/icons/marker-end.svg",
    };

    for (let i = 0; i < path.length; i++) {
      const markerType = getMarkerType(i, path.length);
      const imageSize = new window.kakao.maps.Size(32, 32);
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc[markerType],
        imageSize,
      );

      new window.kakao.maps.Marker({
        map: initializedMap,
        position: new window.kakao.maps.LatLng(path[i].lng, path[i].lat),
        title: "User Marker",
        image: markerImage,
      });
    }
  }, [initializedMap]);
  return <div id="map" ref={mapRef} css={MapContentContainer} />;
};

export default MapContent;

const MapContentContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
`;
