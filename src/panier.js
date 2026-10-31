const total = (items) =>
  items.reduce((sum, item) => {
    if (item.prix < 0) throw new Error('Prix négatif');
    return sum + item.prix * item.qte;
  }, 0);

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
module.exports.total = total;
