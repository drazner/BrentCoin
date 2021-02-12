# BrentCoin

This personal project serves as demonstration to learn about blockchain.

I created a hypothetical cyrptocurrency called BrentCoin which utilizes blockchain technology. The blockchain I designed contains 
a genesis block followed by a chain of blocks which contain transactions, timestamps of those transactions, hashes, pointers to 
the previous block's hashes, and a random nonce variable used to mine blocks. Blockchain is a secure way to keep track of transactions
because fabricating a transaction within a blockchain requires such a monumental amount of computation that it is impossible given the 
current state of processing limits. The blockchain I designed uses proof of work to ensure that mining blocks can not be achieved 
instantaneously. The timing of block mining is based on the difficulty variable. After a small number of test runs, I found that a 
difficulty of 7 results in a block mining time of around 20 minutes. 
