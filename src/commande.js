class Commande {
  constructor(client, panier) {
    this.client = client;
    this.panier = panier;
  }

  calculerTotal() {
    return this.panier.total();
  }
}

module.exports = Commande;
