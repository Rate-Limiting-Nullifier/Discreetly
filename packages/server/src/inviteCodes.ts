import ClaimCodeManager from '../../claimCodes/src/manager';

const initializeClaimCodeManager = (redisClient) => {
  let ccm: ClaimCodeManager;
  redisClient.get('ccm').then(cc => {
    if (!cc) {
      ccm = new ClaimCodeManager();
      ccm.generateClaimCodeSet(10, 999, 'TEST');
      const ccs = ccm.getClaimCodeSets();
      redisClient.set('ccm', JSON.stringify(ccs));
    } else {
      ccm = new ClaimCodeManager(JSON.parse(cc));
      if (ccm.getUsedCount(999).unusedCount < 5) {
        ccm.generateClaimCodeSet(10, 999, 'TEST');
        const ccs = ccm.getClaimCodeSets();
        redisClient.set('ccm', JSON.stringify(ccs));
      }
    }
  });
  return ccm;
};

export default initializeClaimCodeManager;
