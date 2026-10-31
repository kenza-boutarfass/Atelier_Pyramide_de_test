jest.mock('../../src/mailer');

const mailer = require('../../src/mailer');
const Commande = require('../../src/commande');
const Panier = require('../../src/panier');
const { validerCommande } = require('../../src/commande');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Commande', () => {
  test('calcule le total de la commande', () => {
    const panier = new Panier();
    panier.ajouter({ prix: 15 });
    panier.ajouter({ prix: 10 });

    const commande = new Commande('client@test.fr', panier);
    expect(commande.calculerTotal()).toBe(25);
  });

  test('envoie un e-mail de confirmation et retourne le montant', async () => {
    mailer.envoyer.mockResolvedValue();
    const items = [{ prix: 10, qte: 2 }, { prix: 5, qte: 1 }];

    const resultat = await validerCommande(items, 'client@test.fr');

    expect(resultat.montant).toBe(25);
    expect(mailer.envoyer).toHaveBeenCalledTimes(1);
    expect(mailer.envoyer).toHaveBeenCalledWith(
      'client@test.fr',
      expect.stringContaining('25'),
    );
  });

  test("refuse un panier vide et n'envoie aucun e-mail", async () => {
    await expect(validerCommande([], 'client@test.fr')).rejects.toThrow('Panier vide');
    expect(mailer.envoyer).not.toHaveBeenCalled();
  });
});
