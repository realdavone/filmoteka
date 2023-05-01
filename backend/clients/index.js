import crypto from 'crypto'

class ClientSource {
  currentClients = []

  addClient(client) {
    if(typeof(client) !== 'object') return
    this.currentClients.push({ ...client, uid: crypto.randomUUID() })
  }

  removeClient(uid) {
    this.currentClients = this.currentClients.filter(client => client.uid !== uid)
  }

  get getClients() {
    return this.currentClients
  }
}

const clients = new ClientSource()

export default clients