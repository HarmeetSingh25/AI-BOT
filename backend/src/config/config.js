import {config} from "dotenv";

config();
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("Error: Missing required environment variables.");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables");
    process.exit(1);
}

if (!process.env.CLIENT_ID) {
    console.error("CLIENT_ID is not defined in environment variables");
    process.exit(1);
}
if (!process.env.CLIENT_SECRET) {
    console.error("CLIENT_SECRET is not defined in environment variables");
    process.exit(1);
}
if(!process.env.MISTRAL_API_KEY){
    console.error("MISTRAL_API_KEY is not defined in environment variables");
    process.exit(1);
}

const _config = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

console.log(_config.clientID, _config.clientSecret);

export default Object.freeze(_config);
