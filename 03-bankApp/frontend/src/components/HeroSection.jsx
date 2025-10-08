import { useState } from "react";

export default function HeroSection({user}){
    const [balance,setBalance] = useState(0);
    const [balFlag, setBalFlag] = useState(false);
    const [sendMoneyFlag, setSendMoneyFlag] = useState(false);
    const [recieverMailInput, setRecieverMailInput] = useState("");
    const [amount, setAmount] = useState(-1);

    const viewMoneyHandler = async () =>{
        const response = await fetch(`${import.meta.env.VITE_API_URI}/transactions/balance`,{
            method:"GET",
            credentials:"include"
        })
        const jsonResponse = await response.json();
        setBalance(jsonResponse.balance);
        setBalFlag(!balFlag);
    }

    const sendMoneyHandler = async() =>{
      const payload={ recieverMail: recieverMailInput, amount }
      const response = await fetch(`${import.meta.env.VITE_API_URI}/transactions/sendMoney`,{
        method:"POST",
        credentials:"include",
        headers:{ "content-Type":"application/json"},
        body:JSON.stringify(payload)
      })
      if(response.ok){
        alert("transaction successful");
      }
      else{
        alert("transaction unsuccessful");
      }
    }
    return (
      <main className="mx-3">
        <p>Welcome: {user}</p>
        <div className="flex flex-col gap-2 justify-center items-center mt-4">
          <button
            className="border-2 w-[150px] border-gray-400 px-4 py-2 bg-gray-200 rounded-lg"
            onClick={viewMoneyHandler}
          >
            {balFlag && <>{balance}</>}
            {!balFlag && <>View Balance</>}
          </button>
          <button
            className="border-2 w-[150px] border-gray-400 px-4 py-2 bg-gray-200 rounded-lg"
            onClick={() => {
              setSendMoneyFlag(!sendMoneyFlag);
            }}
          >
            Send Money
          </button>
          {sendMoneyFlag && (
            <>
              <input
                type="email"
                name="recieverMail"
                placeholder="email id"
                value={recieverMailInput}
                onChange={(e) => {
                  setRecieverMailInput(e.target.value);
                }}
                className="border-2 border-black px-4 py-2"
              />
              <input
                type="number"
                name="recieverMail"
                placeholder="amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                className="border-2 border-black px-4 py-2"
              />
              <button
                className="border-2 w-[150px] border-gray-400 px-4 py-2 bg-gray-200 rounded-lg"
                onClick={sendMoneyHandler}
              >
                Send
              </button>
            </>
          )}
        </div>
      </main>
    );
}