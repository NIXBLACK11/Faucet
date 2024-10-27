import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useRef, useState } from "react"
import { GiDroplets } from "react-icons/gi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"
import { airdrop } from "../utils/airdrop";
import { useRecoilState } from "recoil";
import { errorState, successState } from "../atom";
import { FadeLoader } from "react-spinners";

export const Home = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [_error, setError] = useRecoilState(errorState);
    const [_success, setSuccess] = useRecoilState(successState);
    const [dropDown, setDropDown] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(0);
    const [walletAddress, setWalletAddress] = useState<string>("");
    const clickRef = useRef(new Audio("click.mp3"));
    const { publicKey } = useWallet();

    useEffect(()=>{
        if(publicKey) {
            setWalletAddress(publicKey.toBase58());
        } else {
            setWalletAddress("");
        }
    }, [publicKey]);

    return <div className="flex flex-col items-center w-full h-full bg-background">
        <div className="h-1/5 flex items-end justify-center w-full">
            <h1 className="font-custom lg:text-9xl md:text-7xl text-5xl text-text">NIX-FAUCET</h1>
        </div>
        <div className="flex flex-col w-full justify-center items-center lg:flex-row h-2/5">
            <div className="lg:w-3/5 w-4/5 rounded-lg border-border text-4xl border-2 flex flex-row">
                <input
                    className="bg-transparent text-text font-custom w-4/5 border-border border-2"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                />
                <div className="w-1/5 flex justify-center items-center">
                    <div 
                        className=" flex justify-center items-center w-full"
                        onClick={()=>{
                            setDropDown(!dropDown);
                        }}
                    >
                        <p className="text-text font-custom text-2xl">{(amount==0) ? "Amount" : amount}</p>
                        {dropDown ? <RiArrowDropDownLine className="text-text text-2xl"/> : <RiArrowDropUpLine className="text-text text-2xl"/>}
                    </div>
                    {dropDown && (
                        <div className="bg-transparent border-border absolute mt-52 text-2xl text-text font-custom">
                            <div className="grid grid-cols-2 w-full">
                                <div className="px-8 py-2 border border-border rounded-tl-lg text-center hover:bg-gray-700 transform transition duration-200 active:scale-90 cursor-pointer" onClick={()=>{setAmount(0.1);clickRef.current.play();}}>0.1</div>
                                <div className="px-8 py-2 border border-border rounded-tr-lg text-center hover:bg-gray-700 transform transition duration-200 active:scale-90 cursor-pointer" onClick={()=>{setAmount(1);clickRef.current.play();}}>1</div>
                                <div className="px-8 py-2 border border-border rounded-bl-lg text-center hover:bg-gray-700 transform transition duration-200 active:scale-90 cursor-pointer" onClick={()=>{setAmount(2.5);clickRef.current.play();}}>2.5</div>
                                <div className="px-8 py-2 border border-border rounded-br-lg text-center hover:bg-gray-700 transform transition duration-200 active:scale-90 cursor-pointer" onClick={()=>{setAmount(5);clickRef.current.play();}}>5</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-row justify-end space-x-4 m-4">
                <WalletMultiButton />
                <WalletDisconnectButton />
            </div>
        </div>
        <div className="h-1/5 w-full flex justify-center items-start">
            <div 
                className="flex justify-center items-center m-8 border-4 border-border rounded-lg px-4 hover:bg-gray-700 transform transition duration-200 active:scale-90 cursor-pointer"
                onClick={async ()=>{
                    clickRef.current.play();
                    setLoading(true);
                    if (publicKey && amount) {
                        const success = await airdrop(walletAddress, amount);
                        // const success = true;
                        if (success) {
                            console.log("Airdrop successful!");
                            setSuccess({ show: true, message: 'Airdrop successful!' })
                        } else {
                            console.log("Airdrop failed.");
                            setError({ show: true, message: `You've either reached your airdrop limit today or the airdrop faucet has run dry` });
                        }
                    } else {
                        console.log("Invalid publicKey or amount.");
                        setError({ show: true, message: 'Invalid publicKey or amount' });
                    }
                    setLoading(false);
                }}
            >
                <div className="flex flex-row m-0 p-0 justify-center items-center">
                    {(loading==false) ? <>
                        <GiDroplets className="text-text text-2xl m-2"/>
                        <p className="text-text font-custom text-2xl m-2">Confirm Airdrop</p>
                    </> : <FadeLoader className="ml-4" color="#512DA8"/>}
                </div>
            </div>
        </div>
    </div>
}