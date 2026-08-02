import * as crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
// Fallback key must be exactly 32 bytes for aes-256-cbc
const DEFAULT_KEY = Buffer.from("hospitalos_secure_key_32_bytes__", "utf8");

function getKey(): Buffer {
  const envKey = process.env.ENCRYPTION_KEY;
  if (envKey) {
    // If env key exists, ensure it is 32 bytes
    if (envKey.length >= 32) {
      return Buffer.from(envKey.substring(0, 32), "utf8");
    }
    return Buffer.concat([Buffer.from(envKey, "utf8"), Buffer.alloc(32 - envKey.length)]);
  }
  return DEFAULT_KEY;
}

export const EncryptionService = {
  encrypt(text: string): { encryptedData: string; iv: string } {
    const key = getKey();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return {
      encryptedData: encrypted,
      iv: iv.toString("hex"),
    };
  },

  decrypt(encryptedData: string, ivHex: string): string {
    const key = getKey();
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedData, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  },
};
