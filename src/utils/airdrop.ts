import { Connection, PublicKey, LAMPORTS_PER_SOL, TransactionSignature, RpcResponseAndContext, SignatureResult } from '@solana/web3.js';

export const airdrop = async (publicKey: string | undefined, amount: number): Promise<boolean> => {
    if (!publicKey || !amount) {
        console.error("Invalid publicKey or amount");
        return false;
    }
    
    try {
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");

        const recipientPublicKey = new PublicKey(publicKey);

        const airdropSignature: TransactionSignature = await connection.requestAirdrop(
            recipientPublicKey,
            amount * LAMPORTS_PER_SOL
        );

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

        const confirmationStrategy = {
            signature: airdropSignature,
            blockhash,
            lastValidBlockHeight,
        };

        const confirmationResult: RpcResponseAndContext<SignatureResult> = await connection.confirmTransaction(confirmationStrategy);

        if (confirmationResult.value.err) {
            console.error("Transaction confirmation failed:", confirmationResult.value.err);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Airdrop failed:", error);
        return false;
    }
};
