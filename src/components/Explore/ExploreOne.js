import React, { Component } from 'react';
import axios from 'axios';
import { contractAddress, refDefaultAddress } from "../constant";

const BigNumber = require('bignumber.js');
const TronWeb = require('tronweb');

const initData = {
    pre_heading: "",
    heading: "My Mints",
    btn_1: "View All",
    btn_2: "Load More"
}

// const data = [
//     {
//         id: "1",
//         img: "./img/test.png",
//         title: "#1",
//         owner: "Richard",
//         price: "1.5 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "2",
//         img: "./img/test2 (1).png",
//         title: "#2",
//         owner: "John Deo",
//         price: "2.7 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "3",
//         img: "./img/test2 (2).png",
//         title: "#3",
//         owner: "Arham",
//         price: "2.3 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "4",
//         img: "./img/test2 (3).png",
//         title: "#4",
//         owner: "Yasmin",
//         price: "1.8 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "5",
//         img: "./img/test2 (4).png",
//         title: "#5",
//         owner: "Junaid",
//         price: "1.7 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "6",
//         img: "./img/test.png",
//         title: "Sports",
//         owner: "ArtNox",
//         price: "1.9 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "7",
//         img: "/img/auction_7.jpg",
//         title: "Cartoon Heroes",
//         owner: "Junaid",
//         price: "3.2 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "8",
//         img: "/img/auction_8.jpg",
//         title: "Gaming Chair",
//         owner: "Johnson",
//         price: "0.69 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "9",
//         img: "/img/auction_9.jpg",
//         title: "Photography",
//         owner: "Sara",
//         price: "2.3 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "10",
//         img: "/img/auction_10.jpg",
//         title: "Zed Run",
//         owner: "SpaceMan",
//         price: "3.7 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "11",
//         img: "/img/auction_11.jpg",
//         title: "Rare Tyres",
//         owner: "Monas",
//         price: "2.2 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "12",
//         img: "/img/auction_12.jpg",
//         title: "World of Women",
//         owner: "Victor",
//         price: "4.3 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     }
// ]

class ExploreOne extends Component {
    // state = {
    //     initData: {},
    //     data: []
    // }
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    openDetails = async (e) => {
        try {
            console.log("name", e);
            // console.log("name", e.target.value);
            // console.log("name", e.target.name);
            localStorage.setItem("namecount", e.target.name);
            window.location.href = "/item-details";
        } catch (e) {
            console.log("blnc", e);
        }
    }
    fetchData = async () => {
        try {

            if (!window.tronWeb) {
                const HttpProvider = TronWeb.providers.HttpProvider;
                const fullNode = new HttpProvider('https://api.shasta.trongrid.io');
                const solidityNode = new HttpProvider('https://api.shasta.trongrid.io');
                const eventServer = 'https://api.shasta.trongrid.io/';

                const tronWeb = new TronWeb(
                    fullNode,
                    solidityNode,
                    eventServer,
                );
                tronWeb.setAddress('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');

                window.tronWeb = tronWeb;
            }

            console.log("fetchData is called");
            // let windows = {};
            // windows.tronWeb = await window.tronWeb

            let main = localStorage.getItem("load");
            console.log("getmintedtoken", main);

            let balanceOff = localStorage.getItem("balanceOff");
            console.log("getmintedtoken", balanceOff);

            // let idArr = [];
            // for (let i = 0; i < balanceOff; i++) {
            // let contract = await windows?.tronWeb?.contract().at(contractAddress);
            // const ids = await contract.tokenOfOwnerByIndex(main, i).call();
            // console.log("ids", (ids._tokenId).toString());
            // console.log("ids", JSON.stringify(ids.toString()));
            // console.log("ids", ids._tokenId);
            // console.log("ids", ids.toNumber());
            // console.log(ids.toString());
            //     idArr.push((ids._tokenId).toString());
            // }
            // console.log("idArr", idArr);
            // console.log("idArr", idArr[0]);

            let newArr = [];
            let contract = await window.tronWeb.contract().at(contractAddress);
            // let contract = await windows?.tronWeb.contract().at(contractAddress);
            // const getmintedtoken = await contract.balanceOf(main).call();
            let prevArray = [];
            prevArray = [...this.state.data];
            prevArray.map((item) => {
                newArr.push(item)
            })
            for (let i = this.state.data.length; i <= 3 + this.state.data.length && i < balanceOff; i++) {
                // let contract = await windows?.tronWeb?.contract().at(contractAddress);
                const ids = await contract.tokenOfOwnerByIndex(main, i).call();
                console.log("ids i", i);
                const id = (ids._tokenId).toString();
                // console.log("ids", id);

                await axios.get(`https://sudeepojha.com.np/blockchain/api/v1/getjson/${id}`)
                    .then((response) => {
                        console.log("response", response);
                        // console.log("response", response.data);
                        // console.log("response", response.data.attributes[0]);
                        newArr.push(response.data);
                        // this.setState({ data: newArr });
                        //   this.setState({data: response.data.attributes});
                    }).catch((error) => {
                        console.log("error", error);
                    });
            }

            this.setState({ data: newArr });
            console.log("fullData", this.state.data);
        } catch (e) {
            console.log("blnc", e);
        }
    }
    // shouldComponentUpdate() {
    //     try {
    //         this.fetchData();
    //     } catch (e) {
    //         console.log("blnc", e);
    //     }
    // }
    componentDidMount() {
        try {
            console.log("Component Did mount Called Once")
            this.fetchData();
        } catch (e) {
            console.log("blnc", e);
        }
    }


    // componentDidMount() {
    // this.setState({
    //     initData: initData
    // })
    //     setInterval(() => {
    //         this.fetchData();
    //     }, 1000);
    // }

    render() {
        return (
            <section className="explore-area load-more p-0" >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <h3 className="mt-3 mb-0">
                                        My Mints
                                    </h3>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.data.map((item) => {
                            console.log("item", item);
                            return (
                                <div
                                    className="col-12 col-sm-6 col-lg-3 item"
                                >
                                    <div className="card">
                                        <div className="image-over">
                                            <a
                                                onClick={this.openDetails}
                                            >
                                                <img className="card-img-top"
                                                    src={item.image}
                                                    value={item.edition}
                                                    name={item.edition}
                                                    alt="" />
                                            </a>
                                        </div>
                                        <div className="card-caption col-12 p-0">
                                            <div className="card-body">
                                                <a
                                                    onClick={this.openDetails}
                                                >
                                                    <h5 className="mb-0">
                                                        {item.name}
                                                    </h5>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            {/* id="load-btn" */}
                            <button id="load-btn" className="btn btn-bordered-white mt-5" href="#"
                                onClick={this.fetchData}
                            >
                                Load More
                            </button>
                        </div>

                    </div>
                </div>
            </section >
        );
    }
}

export default ExploreOne;