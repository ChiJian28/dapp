export const checkContractDeployment = async (contractAddress, provider) => {
    try {
        const code = await provider.getCode(contractAddress);

        // 如果合约地址的代码长度大于 2，表示已经部署
        if (code.length > 2) {
            console.log('Contract is deployed!');
        } else {
            console.log('Contract is not deployed.');
        }
    } catch (error) {
        console.error('Error checking contract deployment:', error);
    }
};