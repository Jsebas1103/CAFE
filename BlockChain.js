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


///CAMBIOS GITHUB
class Block {
    constructor(index, data, previousHash = "") {
        this.index = index;
        this.data = data;
        this.previousHash = previousHash;
        this.date = new Date(); // Guarda el objeto Date
        this.dateString = this.date.toISOString(); // Guarda la fecha en formato legible
        this.hash = this.createHash();
    }
    createHash() {
        return simpleHash(this.index + this.dateString + JSON.stringify(this.data) + this.previousHash);
    }
}

class Blockchain {
    constructor(genesis) {
        this.chain = [this.createFirstBlock(genesis)];
        counter = 1
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
    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            let current = this.chain[i];
            let prev = this.chain[i - 1];
            if (current.hash !== current.createHash()) return false;
            if (current.previousHash !== prev.hash) return false;
        }
        return true;
    }
}

// Exponer las clases globalmente
window.Block = Block;
window.Blockchain = Blockchain;
