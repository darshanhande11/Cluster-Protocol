import { Card, Button } from 'antd'
import { FaEthereum } from 'react-icons/fa';
import React, { useState, useEffect } from 'react'
import './MarketPlace.css'
import addresses from '../../../config'
import GetAccount from '../../../hooks/GetAccount';
import GetContract from '../../../hooks/GetContract';
import FakeItTokenContractArtifact from '../../../Ethereum/FakeIt.json'
import MarketPlaceContractArtifact from '../../../Ethereum/MarketPlace.json'
import Axios from 'axios'
import { ethers } from 'ethers';
import Loader from '../../../shared/Loader/Loader';

const MarketPlace = () => {
  const [loadStatus, setLoadStatus] = useState(false);
  let userAddress = GetAccount();
  let fakeItTokenContract = GetContract(addresses.fakeItToken, FakeItTokenContractArtifact.abi);
  let MarketPlaceContract = GetContract(addresses.marketPlaceAddress, MarketPlaceContractArtifact.abi);
  const [tokens, setTokens] = useState([]);

  const ActionButton = ({ text, itemId }) => (
    <Button type='primary' onClick={() => buyNFT(itemId)} style={{ width: '95%' }} >
      {text}
    </Button>
  )

  const getUrl = () => {
    let type = ["ferb", "phineas"];
    let typeIndex = Math.floor(Math.random() * 2);
    let idIndex = Math.floor(Math.random() * 5);
    return type[typeIndex] + "/" + idIndex;
  }

  const mintNFT = async () => {
    try {
        setLoadStatus(true);
        const url = getUrl();
        const imageData = await Axios({
            method: "GET",
            url: "https://metadata-api-phineas-ferb.herokuapp.com/" + url,
        });
        console.log(" this is image data ", imageData);
        const res = await Axios({
            method: "post",
            url: process.env.REACT_APP_PINATA_API_URL,
            data: JSON.stringify({
                name: imageData.data.name,
                title: imageData.data.title,
                uri: imageData.data.uri,
            }),
            headers: {
                'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
                'pinata_secret_api_key': process.env.REACT_APP_PINATA_API_SECRET,
                "Content-Type": "Application/json"
            },
        });
        console.log(res.data.IpfsHash);
        await (await fakeItTokenContract.safeMint(userAddress, res.data.IpfsHash, { value: ethers.utils.parseEther("0.01"), gasLimit: 9000000  })).wait()
        const nftId = await fakeItTokenContract.getTokenCount();
        // await nftId.wait();
        console.log(" this is nft id ", nftId);
        let approvalTxn = await fakeItTokenContract.setApprovalForAll(addresses.marketPlaceAddress, true,  { gasLimit: 9000000 });
        await approvalTxn.wait();
        const listingPrice = 0.01;
        let makeItemTxn = await MarketPlaceContract.makeItem(addresses.fakeItToken, nftId, ethers.utils.parseEther(listingPrice.toString()), { gasLimit: 9000000 });
        await makeItemTxn.wait();
        setLoadStatus(false);
    } catch (err) {
        console.log(err.message);
    }
  }

  const getAllNFTs = async () => {
    try {
        setLoadStatus(true);
        let allTokens = [];
        let totalNFTCount = await fakeItTokenContract.getTokenCount();
        console.log(" this is total Count ", parseInt(totalNFTCount._hex))
        if(parseInt(totalNFTCount._hex) !== 10 ** 18) {
            console.log(" callied this ");
            for(let i=0; i <= parseInt(totalNFTCount._hex); i++) {
                let tokenUri = await fakeItTokenContract.tokenURI(i);
                let rawTokenData = await Axios.get(tokenUri);
                console.log(" this is raw token data ", rawTokenData);
                // items
                let tokenMarketData = await MarketPlaceContract.items(i + 1);
                console.log(" this is tokenUri ", tokenUri);
                console.log(" this is token market data ", tokenMarketData);
                allTokens.push({
                    name: rawTokenData.data.name,
                    tagline: rawTokenData.data.title,
                    uri: rawTokenData.data.uri,
                    price: parseInt(tokenMarketData.price._hex) / 10 ** 18,
                    seller: tokenMarketData.seller,
                    sold: tokenMarketData.sold,
                    tokenId: parseInt(tokenMarketData.tokenId._hex)
                });
            }
            console.log(" this is all tokens data ", allTokens);
            setTokens(allTokens);
        }
        setLoadStatus(false);
    } catch (err) {
        console.log(err.message);
    }
  }

  useEffect(() => {
    console.log("getting all nfts uris ");
    getAllNFTs();
  }, [])

  const buyNFT = async (itemId) => {
    console.log(" this is item id ", itemId);
    await (await MarketPlaceContract.purchaseItem(itemId + 1, { 
        value: ethers.utils.parseEther("0.02"), 
        gasLimit: 9000000 
    })).wait()
  }

// <<<<<<< HEAD
//   const data = [
//     {
//         uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFBvYLzJXg6OKR7zgOdXQB4S5tLLxAZevCeg&usqp=CAU",
//         tagline: "NFT Title",
//         tokenId: "0x3827277dicnw882283",
//         price: 5,
//         seller: "0x042d434242015acd48e3889C2510DFe221D5fABb"
//     },
//     {
//         uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFBvYLzJXg6OKR7zgOdXQB4S5tLLxAZevCeg&usqp=CAU",
//         tagline: "NFT Title",
//         tokenId: "0x3827277dicnw882283",
//         price: 5,
//         seller: "0x042d434242015acd48e3889C2510DFe221D5fABb"
//     },
//     {
//         uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFBvYLzJXg6OKR7zgOdXQB4S5tLLxAZevCeg&usqp=CAU",
//         tagline: "NFT Title",
//         tokenId: "0x3827277dicnw882283",
//         price: 5,
//         seller: "0x042d434242015acd48e3889C2510DFe221D5fABb"
//     },
//     {
//         uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFBvYLzJXg6OKR7zgOdXQB4S5tLLxAZevCeg&usqp=CAU",
//         tagline: "NFT Title",
//         tokenId: "0x3827277dicnw882283",
//         price: 5,
//         seller: "0x042d434242015acd48e3889C2510DFe221D5fABb"
//     },
//     {
//         uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFBvYLzJXg6OKR7zgOdXQB4S5tLLxAZevCeg&usqp=CAU",
//         tagline: "NFT Title",
//         tokenId: "0x3827277dicnw882283",
//         price: 5,
//         seller: "0x042d434242015acd48e3889C2510DFe221D5fABb"
//     },
//   ];
// =======
//   const data = [
//     {
//         uri: "https://res.cloudinary.com/musicalide/image/upload/v1658234370/NFT-images/Ferb_Fletcher4_hcyctl.webp",
//         tagline: "NFT Title",
//         tokenId: "0x3827277dicnw882283",
//         price: 5,
//         seller: "0x042d434242015acd48e3889C2510DFe221D5fABb"
//     },
//     {
//         uri: "https://res.cloudinary.com/musicalide/image/upload/v1658234370/NFT-images/Ferb_Fletcher4_hcyctl.webp",
//         tagline: "NFT Title",
//         tokenId: "0x3827277dicnw882283",
//         price: 5,
//         seller: "0x042d434242015acd48e3889C2510DFe221D5fABb"
//     },
//     {
//         uri: "https://res.cloudinary.com/musicalide/image/upload/v1658234370/NFT-images/Ferb_Fletcher4_hcyctl.webp",
//         tagline: "NFT Title",
//         tokenId: "0x3827277dicnw882283",
//         price: 5,
//         seller: "0x042d434242015acd48e3889C2510DFe221D5fABb"
//     },
//     {
//         uri: "https://res.cloudinary.com/musicalide/image/upload/v1658234370/NFT-images/Ferb_Fletcher4_hcyctl.webp",
//         tagline: "NFT Title",
//         tokenId: "0x3827277dicnw882283",
//         price: 5,
//         seller: "0x042d434242015acd48e3889C2510DFe221D5fABb"
//     },
//     {
//         uri: "https://res.cloudinary.com/musicalide/image/upload/v1658234370/NFT-images/Ferb_Fletcher4_hcyctl.webp",
//         tagline: "NFT Title",
//         tokenId: "0x3827277dicnw882283",
//         price: 5,
//         seller: "0x042d434242015acd48e3889C2510DFe221D5fABb"
//     },
//   ];
// >>>>>>> 7c997defd05d0e334ce6bf6c863631ceb20eaf5f

  return (
    loadStatus ?
    <Loader />
    :
    <div className='mp-div'>
        <h1 className='mp-heading'>Market Place</h1>
        <div className='mp-grid-div'>
            {
                tokens.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            cover={<img src={item.uri} alt={item.name} className='mp-cover-img' />}
                            className='mp-card'
                        >
                            <h3 className='mp-card-heading'>{item.tagline}</h3>
                            <h3 className='mp-card-heading'> TokenId: {item.tokenId} </h3> 
                            <div className='mp-card-price'>
                                <span>Price</span><br/>
                                <div>
                                    <FaEthereum />
                                    {item.price}
                                </div>
                            </div>
                            {item.sold ? "Sold" : "Not Sold"}
                            <div className='mp-card-address'>
                                <span>Address</span><br/>
                                <div>{item.seller.substring(0, 25).concat('...')}</div>
                            </div>
                        </Card>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MarketPlace