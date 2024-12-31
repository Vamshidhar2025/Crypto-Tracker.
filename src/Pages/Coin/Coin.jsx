import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom' //From this useParams we get the id form the url
import { CoinContext } from '../../Context/CoinContext';


const Coin = () => {

  const {coinId} =useParams();
  const [coinData,setCoinData]=useState();
  const {currency}=useContext(CoinContext);
  const fetchCoinData=async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-pro-api-key': 'CG-QPRiKogxMDeqxYWS8LcVEVvA'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchCoinData();
  },[currency])
  if(coinData){
  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
    </div>
  )
}
else{
  return (
    <div className='spinner'>
      <div className="spin"></div>

    </div>
  )
}
}

export default Coin