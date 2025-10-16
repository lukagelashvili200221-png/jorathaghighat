import { randomInt } from "crypto";

// OTP Session management
export interface OtpSession {
  mobile: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
  attempts: number;
}

export interface IStorage {
  // OTP methods
  createOtpSession(mobile: string, code: string): Promise<OtpSession>;
  getOtpSession(mobile: string): Promise<OtpSession | undefined>;
  verifyOtp(mobile: string, code: string): Promise<boolean>;
  deleteOtpSession(mobile: string): Promise<void>;
  incrementOtpAttempts(mobile: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private otpSessions: Map<string, OtpSession>;

  constructor() {
    this.otpSessions = new Map();
    
    // Clean up expired OTP sessions every minute
    setInterval(() => {
      const now = new Date();
      for (const [mobile, session] of this.otpSessions.entries()) {
        if (session.expiresAt < now) {
          this.otpSessions.delete(mobile);
        }
      }
    }, 60000);
  }

  async createOtpSession(mobile: string, code: string): Promise<OtpSession> {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 2 * 60 * 1000); // 2 minutes

    const session: OtpSession = {
      mobile,
      code,
      createdAt: now,
      expiresAt,
      attempts: 0,
    };

    this.otpSessions.set(mobile, session);
    return session;
  }

  async getOtpSession(mobile: string): Promise<OtpSession | undefined> {
    const session = this.otpSessions.get(mobile);
    if (!session) return undefined;

    // Check if expired
    if (session.expiresAt < new Date()) {
      this.otpSessions.delete(mobile);
      return undefined;
    }

    return session;
  }

  async verifyOtp(mobile: string, code: string): Promise<boolean> {
    const session = await this.getOtpSession(mobile);
    if (!session) return false;

    // Check max attempts (5 attempts max)
    if (session.attempts >= 5) {
      this.otpSessions.delete(mobile);
      return false;
    }

    // Verify code
    if (session.code === code) {
      this.otpSessions.delete(mobile);
      return true;
    }

    return false;
  }

  async deleteOtpSession(mobile: string): Promise<void> {
    this.otpSessions.delete(mobile);
  }

  async incrementOtpAttempts(mobile: string): Promise<void> {
    const session = this.otpSessions.get(mobile);
    if (session) {
      session.attempts++;
    }
  }
}

export const storage = new MemStorage();

// Helper function to generate 4-digit OTP code
export function generateOtpCode(): string {
  return randomInt(1000, 9999).toString();
}
