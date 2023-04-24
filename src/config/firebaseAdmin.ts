import * as admin from "firebase-admin";
//.replace(/\\n/gm, "\n") || "",

const fireConfig:any = {
  type: process.env.NEXT_PUBLIC_type,
  project_id: process.env.NEXT_PUBLIC_project_id,
  private_key_id: process.env.NEXT_PUBLIC_private_key_id,
  private_key:process.env.NEXT_PUBLIC_private_key,
  client_email: process.env.NEXT_PUBLIC_client_email,
  client_id: process.env.NEXT_PUBLIC_client_id,
  auth_uri: process.env.NEXT_PUBLIC_auth_uri,
  token_uri: process.env.NEXT_PUBLIC_token_uri,
  auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.NEXT_PUBLIC_client_x509_cert_url,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(fireConfig)
  });
}

const db = admin.firestore();
export { admin, db };