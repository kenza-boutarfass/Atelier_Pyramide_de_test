class Mailer {
  constructor(client) {
    this.client = client;
  }

  envoyerBienvenue(email) {
    return { email, status: 'envoye', client: this.client };
  }
}

module.exports = Mailer;
