import GlobalSettings from "../../schemas/GlobalSettings.js"

export async function getGlobalSettings() {
  const globalSettings = await GlobalSettings.findOne({})
  const { _id, ...settings } = globalSettings._doc

  return settings
}

export async function updateGlobalSettings(settings) {
  return await GlobalSettings.findOneAndUpdate({}, settings)
}

export async function isRegistrationAllowed() {
  const { allowRegistration } = await GlobalSettings.findOne({})
  
  return allowRegistration
}