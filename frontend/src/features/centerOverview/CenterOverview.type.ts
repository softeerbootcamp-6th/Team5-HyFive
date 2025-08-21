export type CenterOverviewType = {
  centerName: string;
  centerTel: string;
  centerAddr: string;
  registeredCars: number;
  estimatedRevenue: number;
};

export type CenterOverviewProps = {
  centerName?: string;
  centerTel?: string;
  centerAddr?: string;
  registeredCars?: number;
  estimatedRevenue?: number;
  isLoading?: boolean;
  error?: string | Error | null;
};

export type BackendCenterInfoType = {
  centerId: number;
  centerName: string;
  centerTel: string;
  centerAddr: string;
  carCount: number;
  payAmount: number;
};

export type CenterInfoCardType = {
  icon: React.ReactNode;
  label: string;
  content: string;
};

export const mapBackendCenterInfoToCenterOverview = (
  centerInfoData: BackendCenterInfoType,
): CenterOverviewType => {
  return {
    centerName: centerInfoData.centerName,
    centerTel: centerInfoData.centerTel,
    centerAddr: centerInfoData.centerAddr,
    registeredCars: centerInfoData.carCount,
    estimatedRevenue: centerInfoData.payAmount,
  };
};
