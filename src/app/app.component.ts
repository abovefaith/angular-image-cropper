import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ImageControlComponent } from './components/image-control/image-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, ImageControlComponent, MatFormFieldModule, MatInputModule , FormsModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
  title = 'angular-image-cropper';
  height = signal(250);
  width = signal(250);

  imageReady(imageUrl: string) {
    console.log('Firebase Uploaded Image: ', imageUrl);
  }
}
