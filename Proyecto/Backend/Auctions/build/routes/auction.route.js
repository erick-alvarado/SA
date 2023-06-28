"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auction_controller_1 = require("../controllers/auction.controller");
const router = (0, express_1.Router)();
/**
 * host + /auctions/ping
*/
router.get('/ping', auction_controller_1.healthy);
/**
 * host + /auctions/postAuction
*/
router.post('/postAuction', auction_controller_1.postAuction);
/**
 * host + /auctions/bidUp
*/
router.put('/bidUp', auction_controller_1.bidUp);
/**
 * host + /auctions/getAuctions
*/
router.get('/getAuctions', auction_controller_1.getAuctions);
/**
 * host + /auctions/getBidHistory
*/
router.get('/getBidHistory/:idUser', auction_controller_1.getBidHistory);
/**
 * host + /auctions/endAuction
*/
router.post('/endAuction', auction_controller_1.endAuction);
/**
 * host + /auctions/getBidHistory
*/
router.get('/auctionsHistory/:idUser', auction_controller_1.auctionsdHistory);
exports.default = router;
