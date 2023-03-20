import { default as baseConfig } from "config";

export const config = () => {
  if (!baseConfig.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
