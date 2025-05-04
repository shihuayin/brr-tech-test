// import.js
const admin = require("firebase-admin");
const fs = require("fs");

// 1. initialize the Admin SDK
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// 2. define collections and corresponding files to import
const imports = [
  { collection: "staff", file: "staff.json" },
  { collection: "tickets", file: "tickets.json" },
  { collection: "todos", file: "todos.json" },
];

(async () => {
  for (const { collection, file } of imports) {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    console.log(
      `→ Importing ${data.length} documents into the "${collection}" collection`
    );
    const batch = db.batch();
    data.forEach((doc) => {
      // use the id field from JSON as the document ID if present; otherwise let Firestore generate one
      const ref = db.collection(collection).doc(String(doc.id || undefined));
      batch.set(ref, doc);
    });
    await batch.commit();
  }
  console.log("✅ All data imported successfully");
  process.exit(0);
})().catch((e) => {
  console.error("Import failed", e);
  process.exit(1);
});
