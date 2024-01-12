import { useEffect, useState } from "react"
import { BrowserProvider, ethers, JsonRpcProvider } from "ethers";
import { checkContractDeployment } from './utils/checkContractDeployment'
import { API_URL, PRIVATE_KEY, contractAddress, contractAbi } from "./config/config";
import Increase from "./components/Increase";

const App = () => {
  const [nums, setNums] = useState(0);
  const [name, setName] = useState('');
  const [newName, setNewName] = useState("");
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    connectMetamask();
  }, []);
  
  const connectMetamask = async () => {
    try {
      // const INFURA_ID = import.meta.env.VITE_INFURA_ID;
      // const provider = new JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);
      const provider = new BrowserProvider(window.ethereum);    //get the provider from your metamask setting
      const signer = await provider.getSigner();
      const contractCounter = new ethers.Contract(contractAddress, contractAbi, signer)
      const number = await contractCounter.get();
      const name = await contractCounter.name()
      setNums(Number(number));
      setName(name)
      setState({
        provider,
        signer,
        contract: contractCounter,
      })
      // checkContractDeployment(contractAddress, provider)
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateName = async () => {
    try {
      if (!newName) {
        alert("New name cannot be empty");
        return;
      }
      const { contract } = state

      // 调用智能合约的更新名字函数
      const tx = await contract.updateName(newName);
      await tx.wait();
      setNewName(""); // 清空输入框
      console.log("Updated Successfully");
    } catch (error) {
      console.error("Error updating name:", error.message);
    }
  };

  return (
    <div>
      <h1>Welcome to Dapp</h1>
      <p>Name: {name}</p>
      <p>Number: {nums}</p>
      <Increase state={state} />

      <input
        type="text"
        placeholder="Enter new name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={() => handleUpdateName()}>Update Name</button>
    </div>
  )
}

export default App





