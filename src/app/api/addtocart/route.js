import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    // Parse incoming JSON data
    const data = await req.json();

    // Connect to MongoDB
    await client.connect();
    const database = client.db("your_database_name");
    const collection = database.collection("cart_items");

    // Insert the data into the collection
    const result = await collection.insertOne(data);

    // Return success response
    return new Response(
      JSON.stringify({ success: true, message: "Item added to cart", id: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting into MongoDB:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
