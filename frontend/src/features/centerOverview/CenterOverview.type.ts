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

export type CenterInfoCardType = {
  icon: React.ReactNode;
  label: string;
  content: string;
};
