import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { app } from "../firebase";

export default function Login() {
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(getAuth(app));
    ui.start("#firebaseui-auth-container", {
      signInSuccessUrl: "/",
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          clientId: process.env.REACT_APP_FIREBASE_CID,
        },
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        },
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-5xl font-mono text-amber-500">
            CyberFortress
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Welcome, Please login to visit the dashboard
          </p>
        </div>
        <div className="mt-8 bg-neutral-800 py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border-2 border-blue-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500 opacity-5"></div>
          <div className="relative z-10">
            <div className="mb-6 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div id="firebaseui-auth-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
