// Gets all twitch chat messages as they come in
// Separates messages by channel if appropriate
// Somehow reports back to all the twitch channel components whenever a new chat msg comes in (halp us MobX)
// Message filtering should probably be done in the channel component, not here