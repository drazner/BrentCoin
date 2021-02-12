const SHA256 = require('crypto-js/sha256'); 

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount; 
    }
}

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp; 
        this.transactions = transactions;
        this.previoushash = previousHash; 
        this.hash = this.calculateHash(); 
        this.nonce = 0;                     //random variable that holds no inherent value but is used to mine blocks
    }

    calculateHash(){
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty){
        //spawn hashes until we get one that begins with d number of 0s where d is the difficulty parameter
        //mechanism to control how fast new blocks take to be added to the block chain
        //difficulty 5,6 takes about 1 minute
        //difficulty 7 took 46 minutes (for 2 blocks) = 23 minutes for 1 block
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++; 
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100; 
    }

    createGenesisBlock(){
        return new Block("01/01/2021", "Genesis block", "0"); 
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash; 
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock); 
        //In reality, there are more checks for adding a block
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!'); 
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]; 
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

module.export.Blockchain = Blockchain;
module.export.Transaction = Transaction;

//Add Merkle Tree functionality
//Add Proof of Work (prime factorization? / or just factorization in general?) aim is to make it take 10 minutes to create 1 block
//1 block holds the transactions for roughly 2500 transactions
//Add p2p network