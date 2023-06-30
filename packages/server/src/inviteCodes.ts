import ClaimCodeManager from '../../claimCodes/src/manager';

const initializeClaimCodeManager = async (redisClient) => {
  let claimCodeSets = await redisClient.get('ccm');
  let ccm: ClaimCodeManager;
  if (!claimCodeSets) {
    ccm = new ClaimCodeManager();
    ccm.generateClaimCodeSet(10, 999, 'TEST');
    const ccs = ccm.getClaimCodeSets();
    await redisClient.set('ccm', JSON.stringify(ccs));
  } else {
    ccm = new ClaimCodeManager(JSON.parse(claimCodeSets));
    if (ccm.getUsedCount(999).unusedCount < 5) {
      ccm.generateClaimCodeSet(10, 999, 'TEST');
      const ccs = ccm.getClaimCodeSets();
      await redisClient.set('ccm', JSON.stringify(ccs));
    }
  }
  return ccm;
};

export default initializeClaimCodeManager;
