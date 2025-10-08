import { useEffect, useState } from "react";

export default function TransactionHistory(){
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentName, setCurrentName] = useState('');

    useEffect(()=>{
        let mounted = true;

        async function load() {
            try{
                // get current user name (used to infer direction)
                const v = await fetch(`${import.meta.env.VITE_API_URI}/auth/verify`,{
                    method: 'GET',
                    credentials: 'include'
                });
                if(v.ok){
                    const j = await v.json();
                    if(mounted) setCurrentName(j.name || '');
                }

                const res = await fetch(`${import.meta.env.VITE_API_URI}/transactions/history`,{
                    method: 'GET',
                    credentials: 'include'
                });
                if(!res.ok){
                    const text = await res.text();
                    throw new Error(text || 'Failed to fetch history');
                }
                const data = await res.json();
                if(mounted) setTransactions(data.transactions || []);
            }catch(err){
                console.error('TransactionHistory load error', err);
                if(mounted) setError(err.message || 'Failed to load');
            }finally{
                if(mounted) setLoading(false);
            }
        }

        load();
        return ()=>{ mounted = false };
    },[])

    if(loading) return <div className="m-6">Loading transaction history...</div>
    if(error) return <div className="m-6 text-red-600">Error: {error}</div>

    return (
        <div className="m-6">
            <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
            {transactions.length === 0 && (
                <div>No transactions found.</div>
            )}
            <ul className="flex flex-col gap-2">
                {transactions.map(tx => {
                    const date = tx.createdAt ? new Date(tx.createdAt).toLocaleString() : '';
                    const senderName = tx.sender?.name || tx.sender?.email || 'Unknown';
                    const senderEmail = tx.sender?.email || '';
                    const recName = tx.reciever?.name || tx.reciever?.email || 'Unknown';
                    const recEmail = tx.reciever?.email || '';
                    const direction = (currentName && senderName === currentName) ? 'Sent' : 'Received';
                    return (
                        <li key={tx._id} className="border p-3 rounded-md bg-white">
                            <div className="flex justify-between">
                                <div className="text-sm text-gray-600">{date}</div>
                                <div className="text-sm font-medium">{direction}</div>
                            </div>
                            <div className="mt-1">
                                <div><strong>From:</strong> {senderName} {senderEmail && <span className="text-xs text-gray-500">({senderEmail})</span>}</div>
                                <div><strong>To:</strong> {recName} {recEmail && <span className="text-xs text-gray-500">({recEmail})</span>}</div>
                                <div className="mt-2 text-green-700">Amount: {tx.amount}</div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}