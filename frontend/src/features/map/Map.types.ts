export {};

declare global {
  interface Window {
    kakao: KaKao;
  }

  interface KaKao {
    maps: Maps;
  }

  interface Maps {
    LatLng: {
      new (lat: number, lng: number): LatLngInstance;
    };
    Map: {
      new (container: HTMLElement, options: MapOptions): MapInstance;
    };
    Marker: {
      new (options: MarkerOptions): MarkerInstance;
    };
    Polyline: {
      new (options: PolylineOptions): PolylineInstance;
    };
    Size: {
      new (width: number, height: number): SizeInstance;
    };
    MarkerImage: {
      new (url: string, size?: SizeInstance): MarkerImageInstance;
    };
  }

  interface LatLngInstance {
    getLat(): number;
    getLng(): number;
  }

  interface MapOptions {
    center: LatLngInstance;
    level?: number;
  }

  interface MapInstance {
    setLevel(level: number): void;
    getLevel(): number;
    setCenter(latlng: LatLngInstance): void;
  }

  interface MarkerOptions {
    map: MapInstance | null;
    position: LatLngInstance;
    title: string;
    image: MarkerImageInstance;
  }

  interface MarkerInstance {
    setMap(map: MapInstance | null): void;
    setPosition(latlng: LatLngInstance): void;
  }

  interface PolylineOptions {
    path: LatLngInstance[];
    strokeWeight?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeStyle?: "solid" | "shortdash" | "shortdot" | "longdash" | "dashdot";
  }

  interface PolylineInstance {
    setMap(map: MapInstance | null): void;
    getPath(): LatLngInstance[];
    setOptions(options: Partial<PolylineOptions>): void;
  }

  interface SizeInstance {
    width: number;
    height: number;
  }

  interface MarkerImageInstance {
    url: string;
    size: SizeInstance;
  }
}

export interface LatLng {
  lat: number;
  lng: number;
}
