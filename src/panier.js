class Panier {
  constructor() {
    this.items = [];
  }

  ajouter(item) {
    this.items.push(item);
    return this.items.length;
  }

  total() {
    return this.items.reduce((sum, item) => sum + Number(item.prix || 0), 0);
  }
}

module.exports = Panier;
