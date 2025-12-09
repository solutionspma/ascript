-- Genesis Account Setup
-- Run this in Supabase SQL Editor

-- Insert Genesis Admin account
INSERT INTO "Account" (id, email, "passwordHash", name, role, "tenantId", "createdAt", "updatedAt")
VALUES (
  'cm4m9x0000000l08w0000genesis',
  'jason.harris@getcovered.life',
  '$2a$10$YN5A7Dn5v3fIDCoQdup/XOamn7y7n6UvyF7oRVc5EUpI9eAOL17sW',
  'Jason Harris',
  'genesis',
  NULL,
  NOW(),
  NOW()
);
