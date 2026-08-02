import { describe, it, expect } from "vitest";
import { EncryptionService } from "../services/EncryptionService";

describe("EncryptionService", () => {
  it("should encrypt and decrypt text using AES-256-CBC successfully", () => {
    const rawText = "Secret Medical Data: Patient has high blood pressure";
    
    // Encrypt
    const { encryptedData, iv } = EncryptionService.encrypt(rawText);
    expect(encryptedData).toBeDefined();
    expect(iv).toBeDefined();
    expect(encryptedData).not.toBe(rawText);
    
    // Decrypt
    const decrypted = EncryptionService.decrypt(encryptedData, iv);
    expect(decrypted).toBe(rawText);
  });
});
