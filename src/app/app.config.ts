import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI-1GS_vjoU9BAqOaisYSZUNsmcBCTtI8",
  authDomain: "image-cropper-b93b1.firebaseapp.com",
  projectId: "image-cropper-b93b1",
  storageBucket: "image-cropper-b93b1.firebasestorage.app",
  messagingSenderId: "341148995741",
  appId: "1:341148995741:web:e4732e1aa7be4579250474"
};

// Corrected Application Configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage())
  ],
};


// Corrected Application Configuration
// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideAnimations(),
//     importProvidersFrom(
//       provideFirebaseApp(() => initializeApp(firebaseConfig)),
//       provideStorage(() => getStorage())
//     )
//   ],
// };


// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideAnimationsAsync(), provideAnimationsAsync(),
//   ],
// };



