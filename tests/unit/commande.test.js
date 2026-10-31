const Commande = require('../../src/commande');
const Panier = require('../../src/panier');

describe('Commande', () => {
  test('calcule le total de la commande', () => {
    const panier = new Panier();
    panier.ajouter({ prix: 15 });
    panier.ajouter({ prix: 10 });

    const commande = new Commande('client@test.fr', panier);
    expect(commande.calculerTotal()).toBe(25);
  });
});
