"use server";

import { ID, InputFile, Query } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwirte.config";
import { parseStringify } from "../utils";

export const createUser = async (user) => {
  try {
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error) {
    // Check existing user
    if (error && error.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId) => {
  try {
    const user = await users.get(userId);
    
    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};


// REGISTER PATIENT
export const registerPatient = async ({ identificationDocument, ...patient }) => {
  try {
    let file;
    if (identificationDocument) {
      const blobFile = identificationDocument.get("blobFile");
      const fileName = identificationDocument.get("fileName");
      
      // Create a new File object for the Blob
      const fileObject = new File([blobFile], fileName, { type: blobFile.type });
      
      // Upload file using storage.createFile
      file = await storage.createFile(BUCKET_ID, ID.unique(), fileObject);
    }

    // Create new patient document
    const newPatient = await databases.createDocument(
      DATABASE_ID,
      PATIENT_COLLECTION_ID,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );
    console.log('register patient.....................', JSON.stringify(newPatient));
    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// GET PATIENT
export const getPatient = async (userId) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID,
      PATIENT_COLLECTION_ID,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};