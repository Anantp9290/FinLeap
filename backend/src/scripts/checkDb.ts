import 'dotenv/config';
import mongoose from 'mongoose';

async function checkDatabase() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('MONGODB_URI environment variable is missing in .env');
      process.exit(1);
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    const db = mongoose.connection.db;

    if (!db) {
      console.error('Failed to get database connection handle');
      process.exit(1);
    }

    console.log('\n========================================');
    console.log('📊 MONGODB DATABASE SUMMARY');
    console.log('========================================');

    const collections = await db.listCollections().toArray();

    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`\n📁 Collection: "${col.name}" (${count} documents)`);

      if (count > 0) {
        const samples = await db.collection(col.name).find().limit(5).toArray();
        console.log(JSON.stringify(samples, null, 2));
      }
    }

    console.log('\n========================================\n');
  } catch (error: any) {
    console.error('Error checking database:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

checkDatabase();
