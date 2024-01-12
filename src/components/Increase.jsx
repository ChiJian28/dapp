import React from 'react'
import { ethers } from 'ethers';
const Increase = ({ state }) => {

    const { contract } = state;

    const increment = async (e) => {
        try {
            const options = {
                value: ethers.parseEther("0.0001"),     //交易成本
                // 交易成本不会是0.0001，因为Value + Gas Fees = 总交易成本
                // Gas Fees是基于燃气价格计算的。查看以太坊网络上的当前燃气价格。如果燃气价格很高，它可能会显着影响交易成本。
                gasLimit: 50000,    //确保交易中指定的燃气限制足够。如果燃气限制太低，交易可能失败，并且你仍将支付使用的燃气费。
            }
            const tx = await contract?.increment();       
            await tx.wait();
            // const tx = {
            //     to: toAddress,
            //     value: ethers.utils.parseEther(value),
            //     gasLimit: 50000,
            //     nonce: nonce || undefined,
            //   };
            //   await signer.sendTransaction(tx);
            console.log("Transaction is successful");
        } catch (error) {
            console.error("Transaction failed:", error.message);
        }
    };
    const decrement = async (e) => {
        try {
            const options = {
                value: ethers.parseEther("0.0001"),
                gasLimit: 50000,
            }
            const tx = await contract?.decrement();
            await tx.wait();
            console.log("Transaction is successful");
        } catch (error) {
            console.error("Transaction failed:", error.message);
        }
    };

    return (
        <div>
            <button onClick={() => increment()}>
                Increase!
            </button>
            <button onClick={() => decrement()}>
                Decrease!
            </button>
        </div>
    )
}

export default Increase


// 你总共需要付的总交易成本 = 交易成本 + Gas Fees
// 如果你没有用到ethereum来进行一些业务逻辑，就不需要payable，but 你还是要pay for gas fees（0 + Gas Fees）