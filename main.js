const {Blockchain, Transaction} = require('./blockchain');

let brentCoin = new Blockchain();


/*
console.log('Mining block 1...')
brentCoin.addBlock(new Block(1, "01/06/2021", {amount: 3}));

console.log('Mining block 2...')
brentCoin.addBlock(new Block(2, "01/24/2021", {amount: 10}));

console.log(JSON.stringify(brentCoin, null, 4));
console.log('Is blockchain valid? ' + brentCoin.isChainValid());

brentCoin.chain[1].transactions = { amount: 100};
brentCoin.chain[1].hash = brentCoin.chain[1].calculateHash();
brentCoin.chain[2].previoushash = brentCoin.chain[1].calculateHash(); 
brentCoin.chain[2].hash = brentCoin.chain[2].calculateHash();

console.log(JSON.stringify(brentCoin, null, 4));
console.log('Is blockchain valid? ' + brentCoin.isChainValid());
*/

brentCoin.createTransaction(new Transaction('address1', 'address2', 100));
brentCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
brentCoin.minePendingTransactions('xaviers-address');
console.log('\nBalance of xavier is', brentCoin.getBalanceOfAddress('xaviers-address'));

console.log('\n Starting the miner again...');
brentCoin.minePendingTransactions('xaviers-address');
console.log('\nBalance of xavier is', brentCoin.getBalanceOfAddress('xaviers-address'));

console.log('\n Starting the miner again...');
brentCoin.minePendingTransactions('xaviers-address');
console.log('\nBalance of xavier is', brentCoin.getBalanceOfAddress('xaviers-address'));

//Add Merkle Tree functionality
//Add Proof of Work (prime factorization? / or just factorization in general?) aim is to make it take 10 minutes to create 1 block
//1 block holds the transactions for roughly 2500 transactions
//Add p2p network