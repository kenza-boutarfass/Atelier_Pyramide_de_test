const Panier = require('../../src/panier');
const { total } = require('../../src/panier');

describe('total()', () => {
  test('calcule le total du panier', () => {
    // Arrange : préparer les données
    const items = [{ prix: 10, qte: 2 }, { prix: 5, qte: 1 }];

    // Act : exécuter la fonction
    const resultat = total(items);

    // Assert : vérifier le résultat
    expect(resultat).toBe(25);
  });

  test('retourne 0 pour un panier vide', () => {
    expect(total([])).toBe(0);
  });

  test('ignore une ligne dont la quantité est 0', () => {
    const items = [{ prix: 10, qte: 0 }, { prix: 5, qte: 2 }];
    expect(total(items)).toBe(10);
  });

  test('refuse un prix négatif', () => {
    const items = [{ prix: -5, qte: 1 }];
    expect(() => total(items)).toThrow('Prix négatif');
  });

  test('retourne 0 pour un article sans prix', () => {
    const panier = new Panier();
    panier.ajouter({});
    expect(panier.total()).toBe(0);
  });
});
