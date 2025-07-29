const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "jobPortal";

async function insertInternships(internships) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("internships");
        await collection.deleteMany({});
        const result = await collection.insertMany(internships);
        console.log(`${result.insertedCount} internships inserted`);
    } catch (err) {
        console.error("Error inserting internships:", err);
    } finally {
        await client.close();
    }
}

module.exports = insertInternships;
