const tp = require('turbproxy');


/** Setup accounts for user and bot, first creating room for joining them in. */
async function createAccounts(credentials) {
  const { user, bot, room } = credentials
  if (!!user && !!bot && !!room) {
    console.log(`[admin] calling createAccounts...`)
    try {
      if (user.username.match(/fail/)) throw new Error('forced fail for demo')
      // turbproxy createaccounts method signature
      // {e: email, g: group, u: uname, p: passwords}
      // uname is basename for two users:  uname + 'bot'  and uname 
      // passwords is an array of 2 passwords, first one for bot
      const passwords = [];
      passwords[0] = bot.password;
      passwords[1] = user.password;
      let result = {}

      result = await tp.createaccounts({
        e: user.email,
        g: room.name,
        u: user.username,
        p: passwords
      })
      console.log(`[admin] calling with USER ${JSON.stringify(user)}`)
      console.log(`[admin] calling with BOT ${JSON.stringify(bot)}`)
      console.log(`[admin] calling with ROOM ${JSON.stringify(room)}`)
      console.log(`[admin] calling with PASSOWRDS ${JSON.stringify(passwords)}`)
      console.log(`[admin] createAccounts returned ${JSON.stringify(result)}`)
      process.env.ROCKETCHAT_USER = bot.username;
      process.env.ROCKETCHAT_PASSWORD = bot.password;
    } catch (err) {
      console.error(`[admin] createAccounts failed: ${err.message}`)
      throw new Error('could not create accounts due to a playground server error.')
    }
  } else {
    console.error('[admin] createAccounts called without all attributes.')
    if (!user) throw new Error('could not create accounts, missing user attributes.')
    if (!bot) throw new Error('could not create accounts, missing bot attributes.')
    if (!room) throw new Error('could not create accounts, missing room attributes.')
  }
}

async function deleteAllUsersExceptAdmin() {
  console.log(`[admin] arrg! nuke all BOTs...`)
  try {
    await tp.resetplayground()
  } catch (err) {
    console.error(`[admin] nuke bots failed error: ${err.message}`)
    throw new Error('cannot cleanup playground due to server error.')
  }
}

module.exports = {
  createAccounts,
  deleteAllUsersExceptAdmin
}
