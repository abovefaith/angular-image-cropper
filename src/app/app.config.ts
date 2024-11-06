import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
  apiKey: 'AIzaSyCQFqfgcwI6ynvVpXfLOAOYEHstCegL9CQ',
  authDomain: 'image-cropper-control.firebaseapp.com',
  projectId: 'image-cropper-control',
  storageBucket: 'image-cropper-control.appspot.com',
  messagingSenderId: '398885936902',
  appId: '1:398885936902:web:f09e8854362657790e4887',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
  ],
};
