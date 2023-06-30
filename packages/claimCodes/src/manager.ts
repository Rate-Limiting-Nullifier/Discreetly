import bip39ish, { bip39 } from './bip39ish';
import { ClaimCodeT, ClaimCodeSetT, ClaimCodeSetsT } from './types';

export enum ClaimCodeStatusEnum {
  CLAIMED = 'CLAIMED',
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_USED = 'ALREADY_USED'
}

export interface ClaimCodeStatus {
  status: ClaimCodeStatusEnum;
  message: string;
  claimCodes: ClaimCodeT[];
  groupID?: number;
}

const emptyClaimCodeSet: ClaimCodeSetsT = {
  '0': {
    claimCodes: [],
    groupID: 0,
    generationTime: Date.now(),
    name: 'UNASSIGNED'
  }
};

export default class ClaimCodeManager {
  claimCodeSets: ClaimCodeSetsT;

  constructor(claimCodeSetInput: ClaimCodeSetsT = emptyClaimCodeSet) {
    this.claimCodeSets = claimCodeSetInput;
  }

  private static generateRandomClaimCode(length: number = 2) {
    if (length < 1) throw new Error('length must be greater than 0');
    if (length > 24) throw new Error('length must be less than 24');

    let code: string[] = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * bip39ish.length);

      code.push(bip39ish[randomIndex]);
    }
    return code.join('-');
  }

  private static generateClaimCodes(count: number, claimCodes: ClaimCodeT[] = []): ClaimCodeT[] {
    let codes: string[] = [];
    for (let i = 0; i < count; i++) {
      let pass = false;
      while (pass == false) {
        let code: string = this.generateRandomClaimCode();
        if (codes.includes(code)) {
          continue;
        }
        pass = true;
      }
      claimCodes.push({
        code: this.generateRandomClaimCode(),
        used: false
      });
    }
    return claimCodes;
  }

  private static markClaimCodeAsUsed(code: string, claimCodes: ClaimCodeT[]): ClaimCodeStatus {
    let message = 'Successfully claimed code';
    let status = ClaimCodeStatusEnum.NOT_FOUND;
    for (let claimCode of claimCodes) {
      if (claimCode.code === code) {
        if (claimCode.used) {
          message = `Claim code ${code} has already been used`;
          status = ClaimCodeStatusEnum.ALREADY_USED;
          return { status, message, claimCodes };
        }
        claimCode.used = true;
        status = ClaimCodeStatusEnum.CLAIMED;
        return { status, message, claimCodes };
      }
    }
    message = `Claim code ${code} does not exist`;
    status = ClaimCodeStatusEnum.NOT_FOUND;
    return { status, message, claimCodes };
  }

  public generateClaimCodeSet(count: number, groupID: number | string = 0, name: string = '') {
    groupID = groupID.toString();
    if (this.claimCodeSets[groupID]) {
      this.claimCodeSets[groupID].claimCodes = ClaimCodeManager.generateClaimCodes(
        count,
        this.claimCodeSets[groupID].claimCodes
      );
    } else {
      this.claimCodeSets[groupID] = {
        claimCodes: ClaimCodeManager.generateClaimCodes(count),
        groupID: Number(groupID),
        generationTime: Date.now(),
        name: name
      };
    }
    this.claimCodeSets[groupID].groupID = Number(groupID);
    this.claimCodeSets[groupID].generationTime = Date.now();
    if (name) {
      this.claimCodeSets[groupID].name = name;
    }
    return this.claimCodeSets[groupID];
  }

  public claimCode(code: string): ClaimCodeStatus {
    for (let claimCodeSet in this.claimCodeSets) {
      let result = ClaimCodeManager.markClaimCodeAsUsed(
        code,
        this.claimCodeSets[claimCodeSet].claimCodes
      );
      if (result.status === ClaimCodeStatusEnum.CLAIMED) {
        result.groupID = Number(claimCodeSet);
        return result;
      } else if (result.status === ClaimCodeStatusEnum.ALREADY_USED) {
        result.groupID = Number(claimCodeSet);
        return result;
      } else {
        continue;
      }
    }
    return {
      status: ClaimCodeStatusEnum.NOT_FOUND,
      message: `Claim code ${code} does not exist`,
      claimCodes: []
    };
  }

  public getClaimCodeSets(): ClaimCodeSetsT {
    return this.claimCodeSets;
  }

  public getClaimCodeSet(groupID: number | string): ClaimCodeSetsT {
    groupID = groupID.toString();
    const o = { groupID: this.claimCodeSets[groupID] };
    return o;
  }

  public getUsedCount(groupID: number | string): {
    usedCount: number;
    unusedCount: number;
    totalCount: number;
  } {
    groupID = groupID.toString();
    let usedCount = 0;
    const totalCount = this.claimCodeSets[groupID].claimCodes.length;
    for (let claimCode of this.claimCodeSets[groupID].claimCodes) {
      if (claimCode.used) {
        usedCount++;
      }
    }
    const unusedCount = totalCount - usedCount;
    return { usedCount, unusedCount, totalCount };
  }

  public getGroupIdFromName(name: string): number {
    for (const claimCodeSet of Object.values(this.claimCodeSets)) {
      if (claimCodeSet.name === name) {
        return claimCodeSet.groupID;
      }
    }
    return -1;
  }
}
