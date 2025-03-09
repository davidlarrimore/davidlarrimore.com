import { Prisma, PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Function to handle Prisma client initialization with retry logic
function initPrismaClient() {
  try {
    console.log('Initializing Prisma client...');
    
    // Configuration for Prisma client
    const prismaOptions = {
      log: ['error', 'warn'] as Array<Prisma.LogLevel>,
    };

    // Create a new PrismaClient instance
    const client = new PrismaClient(prismaOptions);
    
    console.log('Prisma client initialized successfully.');
    return client;
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    
    // If in production, we should still try to return a client
    // even if logging fails
    if (process.env.NODE_ENV === 'production') {
      console.log('Attempting to initialize without logging in production...');
      return new PrismaClient();
    }
    
    throw error;
  }
}

// Prevent multiple instances of Prisma Client in development
export const db = global.prisma || initPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = db;
}

// Handle potential connection issues on application shutdown
process.on('beforeExit', async () => {
  await db.$disconnect();
});