const contractAddress = "0x7815c51016807555d5dd1364b618c4b42da81fA9";
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "enter",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
	;
 
let contract;
let web3;
let accounts;
 
window.addEventListener('load', async () => {
    if(window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            initApp();
        } catch (error) {
            console.error("Access to your Ethereum account rejected.");
        }
    } else {
        console.error("Please install MetaMask!");
		alert("Please Install metamask");
    }
});
 
function initApp() {
    contract = new web3.eth.Contract(abi, contractAddress);
 
    document.getElementById('connectWallet').addEventListener('click', async () => {
        accounts = await web3.eth.getAccounts();
        console.log("Connected account:", accounts[0]);
		alert("Wallet Connected");
    });
 
    document.getElementById('enterLottery').addEventListener('click', () => {
        contract.methods.enter().send({ from: accounts[0], value: web3.utils.toWei("0.01", "ether") })
        .then(() => console.log("Entered the lottery!"))
        .catch(console.error);
		alert("Lottery Entered, quickly click CONFIRM when Metamask popup");
    });
 
    document.getElementById('pickWinner').addEventListener('click', () => {
        contract.methods.pickWinner().send({ from: accounts[0] })
        .then(() => console.log("Winner picked!"))
        .catch(console.error);
		alert("Winner Clicked");
    });
 
    // Fetch and display participants
    contract.methods.players().call()
    .then(displayParticipants)
    .catch(console.error);
}
 
function displayParticipants(participants) {
    const participantsList = document.getElementById('participantsList');
    participantsList.innerHTML = participants.map(address => `<li>${address}</li>`).join('');}
