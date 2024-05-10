import { useEffect, useState } from 'react'
import './App.scss'
import jsonData from './mock.json';
import { TableCoins } from './TableCoins';
import { formatNumber } from './utils';

function App() {
  const pairsContracts = [
          'DhRH4efUkSFdEnkGPMwjVYz9qNFHWAKxKdaXhSRZTfiW', // MILK
          'D7z8Ah1WK2XbWpCNS1MZxBa7PnsebuQwAqMbkbhDpYZj', // MARGOT
          'HmwjCPkkuKW9gcHaRqSifEmZ3tqFPuwZSSqqPCGGj1eE', // FOX
          'FeJZi4yM4njtW3cnrT3GMJ4XEwm9rTfHSLTan28Tf9jb', // BEYON
          'CAnGQGGd3uu2GBuZmS1jRq8ez23t5tEYMgXVhyxRu4vZ', // ANA DE ARMAS
          'BtjVw6zd6QQrLWvh49cQYY62msZJ8vcZLC6iNPZFZnX8', // USED MIA KHALIFA
          '8QLXTUutLKPwQWp2Bn5rB5wbYjjDQ3NM2E9AeJvJUN78', // LISA MANOBAL
          '6RPaWSdxRGuRHbcMDkYmSMvTd8Fvy8nzZo99Ge19sHDr', // ZENDAYA
          '6oY8itLkvkcQhD4ZVbVx5W7zCYHwkH529wy8UmheBFPt', // bella hadid
          '7MLFhEgcrJGBhNde8SLEMBgnMKHBbYrheQoYXUj6kyj8', // dua lipa
          '4P3BoaqZdHfcu66nPaheyj4Nd9KH1hWyVjj16nS8aMV3', // Sydney Sweeney
          'Vwf5LXkWmuY6MkDfopGS1KDaTUiszjsdEK8WeGt3Wfn', // PUPU
          'C22MasSYVHj5zZQBWKk99borF2e4Bg21vhux1GTwLhx7', // Taylor Swift
          'F29JCoMvzgKnkX3ypUF4rQ4jqngx6YsLySSci9NTnpwW', // Jennie
          '6Lj6MM8NZvYkoyQNixS9CQwQd2WiNU8SgYQYHiX9pARJ', // MADISON
          'Cwf2wcxj9oJmhbgfnRkFhN76BWfZzd5evXzA3LbMhKTw', // Daddario
          'DPuJTCRt9emvCAQN2vyLzFNyeYCRXxUWLDFpQ9yq9ZuA', // ariana grande

        ];
  
  const url = `https://api.dexscreener.com/latest/dex/pairs/solana/${pairsContracts.join(',')}`;


  const [data, setData] = useState<any>(null);
  const [dataReady, setDataReady] = useState(false);
  const [dataSummary, setDataSummary] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        try {
          const dataResponse = await fetch(url);
          const dataResponseJson = await dataResponse.json();
          // const dataResponseJson = jsonData;
          setData(dataResponseJson);
          setDataReady(true);

          let summary = {
            mkcap: 0,
            totalVol: 0,
            volDisplay: '',
            mkcapDisplay: ''
          };
          jsonData?.pairs.forEach((e: any) => {
            summary = {
              mkcap: summary.mkcap +e.fdv,
              totalVol: summary.totalVol + e.volume.h24,
              mkcapDisplay: '',
              volDisplay: ''
            }
          })
          
          summary = {
            ...summary,
            mkcapDisplay: formatNumber(summary.mkcap),
            volDisplay: formatNumber(summary.totalVol)
          }
      
          console.log(summary)
          setDataSummary(summary);


        } catch (error) {
          console.error('Error:', error);
          setDataReady(true);
        }
      }, 3000);
    };

    fetchData();
  }, []);
  
  return (
    <>
    <div className='container'>
      <div className='container-header'>
        <h1 className="text-3xl font-bold underline">
          Solana Actresses Narrative
        </h1>
      </div>
      <div className="container-summary">
        {
          dataReady && dataSummary ? (<h2>Total Market Cap: {dataSummary.mkcapDisplay}</h2>) : null
        }
                {
          dataReady && dataSummary ? (<h2>Total Volume (24h): {dataSummary.volDisplay}</h2>) : null
        }
      </div>
      <div className="container-table">
        {!dataReady 
          ? ( <div className='container-table__loader'>
                <span className="loader"></span>
            </div>) 
          : (
            <TableCoins data={data}></TableCoins>
          )
        }
      </div>
    </div>
      

    </>
  )
}

export default App
