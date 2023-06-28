// TODO 2.a - Setup a Beacon Wallet instance
//beacon wallet aggregates all the different wallets that are available on tezos and gives us a popup to select a wallet 
import { Buffer } from 'buffer';
import { BeaconWallet } from "@taquito/beacon-wallet";
global.Buffer = Buffer;

export const wallet=new BeaconWallet({
    name:"Tezoz Lottery Dapp",
    preferredNetwork:   
    // "jakartanet"
    "ghostnet"
})
// TODO 2.b - Complete connectWallet function (for ghostnet)
export const connectWallet = async () => {
    // await wallet.requestPermissions({ network:{type:"jakartanet"}});
    await wallet.requestPermissions({ network:{type:"ghostnet"}});
};


// TODO 2.c - Complete getAccount function
// to connect to a particular account in wallet this function is made
export const getAccount = async () => {
    const connectWallet=await wallet.client.getActiveAccount();
    if(connectWallet){
        return connectWallet.address;
    }
    else{
        return "";
    }
};
