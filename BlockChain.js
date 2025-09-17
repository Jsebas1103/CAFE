function simpleHash(str) {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash.toString();
}

class Block {
    constructor(index, data, previousHash = "") {
        this.index = index;
        this.data = data;
        this.previousHash = previousHash;
        this.date = new Date();
        this.dateString = this.date.toISOString(); 
        this.hash = this.createHash();
    }
    createHash() {
        return simpleHash(this.index + this.dateString + JSON.stringify(this.data) + this.previousHash);
    }
}

class Blockchain {
    constructor(genesis) {
        this.chain = [this.createFirstBlock(genesis)];
    }
    createFirstBlock(data) {
        return new Block(0, data);
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(data) {
        let prevBlock = this.getLastBlock();
        let block = new Block(prevBlock.index + 1, data, prevBlock.hash);
        this.chain.push(block);
    }
}

// Exponer las clases globalmente
window.Block = Block;
window.Blockchain = Blockchain;
