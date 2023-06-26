export type ClaimCodeT = {
  code: string;
  used: boolean;
};

export type ClaimCodeSetsT = {
  [key: number | string]: {
    claimCodes: ClaimCodeT[];
    groupID: number;
    generationTime?: number;
    name?: string;
  };
};
