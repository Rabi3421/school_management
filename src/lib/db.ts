import mongoose from 'mongoose';

const MONGODB_URI = process.env.NEXT_MONGODB_URI as string;

if (!MONGODB_URI) throw new Error('NEXT_MONGODB_URI is not defined');

/** Cache connection across hot-reloads in development */
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (global._mongooseConn) return global._mongooseConn;
  global._mongooseConn = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  return global._mongooseConn;
}
