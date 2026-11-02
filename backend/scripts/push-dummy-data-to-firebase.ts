// Script to push dummy data to Firebase
// Run with: npx tsx scripts/push-dummy-data-to-firebase.ts

import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { DUMMY_SUBSTATIONS } from "../lib/dummy-data"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDAeaXEwDT66UjCe1dqRrHu4cwWoL7vfF4",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "oceanberg-digitaltwin.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "oceanberg-digitaltwin",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "oceanberg-digitaltwin.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "403206405780",
  appId: process.env.FIREBASE_APP_ID || "1:403206405780:web:6a5581e174f7b084363e81",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-5J2SXQ0229",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function pushDummyData() {
  console.log("Starting to push dummy data to Firebase...")
  
  try {
    for (const substation of DUMMY_SUBSTATIONS) {
      const docRef = await addDoc(collection(db, "substations"), {
        ...substation,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      console.log(`✓ Pushed substation ${substation.master.name} with ID: ${docRef.id}`)
    }
    
    console.log("\n✅ All dummy data pushed successfully!")
  } catch (error) {
    console.error("❌ Error pushing data:", error)
    process.exit(1)
  }
}

pushDummyData()



