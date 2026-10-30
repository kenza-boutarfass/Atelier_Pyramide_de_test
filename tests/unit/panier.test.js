const Panier = require('../src/panier');

describe('Panier', () => {
  test('ajoute un produit et calcule le total', () => {
    const panier = new Panier();
    panier.ajouter({ prix: 12.5 });
    panier.ajouter({ prix: 7.5 });

    expect(panier.total()).toBe(20);
  });
});
