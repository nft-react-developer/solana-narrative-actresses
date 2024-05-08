import { useEffect, useState } from 'react'
import { formatNumber } from './utils';
import './TableCoins.scss';

export const TableCoins = (data: any) => {
  const pairs = data.data.pairs;
  const [sortedData, setSortedData] = useState(pairs);

  const sortData = () => {
    const sorted = [...sortedData].sort((a, b) => {
      return b.fdv - a.fdv;
    });
    setSortedData(sorted);
  };

  useEffect(() => {
    sortData();
  }, [data]);

  function timeAgo(date: any) {
    const seconds = Math.floor((new Date().valueOf() - new Date(date).valueOf()) / 1000);

    const interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    if (interval === 1) {
        return interval + " year ago";
    }

    const months = Math.floor(seconds / 2628000);
    if (months > 1) {
        return months + " months ago";
    }
    if (months === 1) {
        return months + " month ago";
    }

    const days = Math.floor(seconds / 86400);
    if (days > 1) {
        return days + " days ago";
    }
    if (days === 1) {
        return days + " day ago";
    }

    const hours = Math.floor(seconds / 3600);
    if (hours > 1) {
        return hours + " hours ago";
    }
    if (hours === 1) {
        return hours + " hour ago";
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes > 1) {
        return minutes + " minutes ago";
    }
    if (minutes === 1) {
        return minutes + " minute ago";
    }

    return "just now";
}

  return (
    <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table
          className="min-w-full text-left text-sm font-light text-surface dark:text-white">
          <thead
            className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th scope="col" className="px-3 py-4">Image</th>
              <th scope="col" className="px-3 py-4">Symbol</th>
              <th scope="col" className="px-3 py-4 hidden md:table-cell">Coin Name</th>
              <th scope="col" className="px-3 py-4">Market Cap</th>
              <th scope="col" className="px-3 py-4 hidden md:table-cell">Vol 24H</th>
              <th scope="col" className="px-3 py-4">Price Change 24H</th>
              <th scope="col" className="px-3 py-4 hidden md:table-cell">Created At</th>
            </tr>
          </thead>
          <tbody>
          {sortedData.map((item: any, index: number) => (
            <tr key={index} className="border-b border-neutral-200 dark:border-white/10">
              <td className="whitespace-nowrap px-3 py-4">
                {item.info?.imageUrl ? (<img style={{width: '50px'}} src={item.info?.imageUrl} alt="alt" />) : null}
              </td>
              <td className="whitespace-nowrap px-3 py-4 font-medium"><a href={item.url} target='_blank'>{item.baseToken.symbol}</a></td>
              <td className="whitespace-nowrap px-3 py-4 hidden md:table-cell">{item.baseToken.name}</td>
              <td className="whitespace-nowrap px-3 py-4 font-medium">$ {formatNumber(item.fdv)}</td>
              <td className="whitespace-nowrap px-3 py-4 font-medium hidden md:table-cell">$ {formatNumber(item.volume.h24)}</td>
              <td className={`text-lg ${item.priceChange.h24 >= 0 ? 'text-green-500' : 'text-red-500'} whitespace-nowrap px-3 py-4 font-medium`}>{item.priceChange.h24}%</td>
              <td className="whitespace-nowrap px-3 py-4 hidden md:table-cell">{timeAgo(item.pairCreatedAt)}</td>
              
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}
