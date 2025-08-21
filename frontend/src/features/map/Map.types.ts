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
    MarkerImage: {
      new (url: string, size?: SizeInstance): MarkerImageInstance;
    };
    Polyline: {
      new (options: PolylineOptions): PolylineInstance;
    };
    Size: {
      new (width: number, height: number): SizeInstance;
    };
    CustomOverlay: {
      new (options: CustomOverlayOptions): CustomOverlayInstance;
    };
    InfoWindow: {
      new (options: InfoWindowOptions): InfoWindowInstance;
    };
    event: {
      addListener<T extends object>(
        target: T,
        type: string,
        handler: (map: MapInstance, mode: string, fn: () => void) => void,
      ): void;
      removeListener<T extends object>(
        target: T,
        type: string,
        handler: (map: MapInstance, mode: string, fn: () => void) => void,
      ): void;
      trigger(target: object, type: string): void;
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
    setMaxLevel(level: number): void;
    getLevel(): number;
    setCenter(latlng: LatLngInstance): void;
  }

  interface MarkerOptions {
    map: MapInstance | null;
    position: LatLngInstance;
    title?: string;
    image?: MarkerImageInstance;
  }

  interface MarkerInstance {
    setMap(map: MapInstance | null): void;
    setPosition(latlng: LatLngInstance): void;
  }

  interface MarkerImageInstance {
    url: string;
    size: SizeInstance;
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
    setPath(path: LatLngInstance[]): void;
    getPath(): LatLngInstance[];
    setOptions(options: Partial<PolylineOptions>): void;
  }

  interface CustomOverlayOptions {
    position: LatLngInstance;
    content: string | HTMLElement;
    xAnchor?: number;
    yAnchor?: number;
    zIndex?: number;
    clickable?: boolean;
  }

  interface CustomOverlayInstance {
    setMap(map: MapInstance | null): void;
    setPosition(position: LatLngInstance): void;
    setContent(content: string | HTMLElement): void;
    setZIndex(zIndex: number): void;
    getMap(): MapInstance | null;
  }

  interface InfoWindowOptions {
    position: LatLngInstance;
    content: string | HTMLElement;
    removable?: boolean;
    zIndex?: number;
    disableAutoPan?: boolean;
  }

  interface InfoWindowInstance {
    open(map: MapInstance | null, marker?: MarkerInstance): void;
    close(): void;
    setContent(content: string | HTMLElement): void;
    setPosition(position: LatLngInstance): void;
  }

  interface SizeInstance {
    width: number;
    height: number;
  }
}

// 커스텀 타입
export interface LatLng {
  lat: number;
  lng: number;
}

export interface PolylinePath {
  segmentId: number;
  pointList: LatLng[];
}

export interface MarkerPath {
  nodeId: number;
  bookId: number | null;
  point: LatLng;
  type: string;
}

export interface HighlightType {
  bookId: number;
  bookName: string;
  startTime: string;
  endTime: string;
  startAddr: string;
  endAddr: string;
  startLoc: LatLng;
  endLoc: LatLng;
  hospitalTime: string;
  segmentList: number[];
}
