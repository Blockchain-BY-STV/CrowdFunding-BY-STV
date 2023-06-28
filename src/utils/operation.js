
import { tezos } from "./tezos";


export const ContributeFundOperation = async (amount) => {
    try{
        // const contract=await tezos.wallet.at("KT1AhuP4fJKvys4JFSHh97K5oiK6uNmXcvzf");
        const contract=await tezos.wallet.at("KT1Sr4Te8j7uWzrHQAxCduqbDFCY8YLeqwJL");
        const op =await contract.methods.contribute().send({
            amount:amount,
            mutez:true,
        })
        await op.confirmation(1);
        // 1 represents that it waits for atleast 1 block after the operation is confirmed
    }
    catch(err)
    {
        throw err;
    }
};


export const endFund = async () => {
    try{
        // const contract=await tezos.wallet.at("KT1AhuP4fJKvys4JFSHh97K5oiK6uNmXcvzf");
        const contract=await tezos.wallet.at("KT1Sr4Te8j7uWzrHQAxCduqbDFCY8YLeqwJL");
        const op =await contract.methods.close().send();
        await op.confirmation(1);
        // 1 represents that it waits for atleast 1 block after the operation is confirmed
    }
    catch(err)
    {
        throw err;
    }

};
