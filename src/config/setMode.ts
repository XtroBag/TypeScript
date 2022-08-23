function setMode(mode: "development" | "production") {
  let TOKEN;
  let CLIENT_ID = "1011356275772231831"; // ID de tu Cliente de Discord // main typescript bot id
  let GUILD_ID = "1002414283113640036"; // ID de tu servidor de pruebas 

  // If you are in production mode:
  if (mode === "production") {
    TOKEN = process.env.TOKEN;
  }
  // If you are in development mode:
  if (mode === "development") {
    TOKEN = process.env.DEV_TOKEN;
    CLIENT_ID = "994710967407620198"; // pop bot id
  }

  return { TOKEN, CLIENT_ID, GUILD_ID };
}

export default setMode;
