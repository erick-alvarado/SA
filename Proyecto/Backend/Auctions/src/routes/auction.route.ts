import { Router } from 'express'
import { healthy, postAuction, bidUp, getAuctions, getBidHistory, endAuction, auctionsdHistory} from '../controllers/auction.controller';

const router = Router();

/**
 * host + /auctions/ping
*/
router.get('/ping', healthy);

/**
 * host + /auctions/postAuction
*/
router.post('/postAuction',postAuction);

/**
 * host + /auctions/bidUp
*/
router.put('/bidUp',bidUp);

/**
 * host + /auctions/getAuctions
*/
router.get('/getAuctions',getAuctions);

/**
 * host + /auctions/getBidHistory
*/
router.get('/getBidHistory/:idUser',getBidHistory);

/**
 * host + /auctions/endAuction
*/
router.post('/endAuction',endAuction);

/**
 * host + /auctions/getBidHistory
*/
router.get('/auctionsHistory/:idUser',auctionsdHistory);

export default router;
