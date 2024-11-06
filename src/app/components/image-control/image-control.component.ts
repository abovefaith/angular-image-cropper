import { CommonModule } from '@angular/common';
import { Component, computed, effect, EventEmitter, inject, Input, NgZone, Output, signal} from '@angular/core';
import { filter } from 'rxjs';
import { CropperDialogComponent, CropperDialogResult } from '../cropper-dialog/cropper-dialog.component';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-image-control',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatDialogModule, MatButtonModule],
  templateUrl: './image-control.component.html',
  styleUrl: './image-control.component.scss'
})
export class ImageControlComponent {
  imageWidth = signal(0);
  @Input({ required: true }) set width(val: number) {
    this.imageWidth.set(val);
  }

  imageHeight = signal(0);
  @Input({ required: true }) set height(val: number) {
    this.imageHeight.set(val);
  }

  imagePath = signal('');
  @Input({ required: true }) set path(val: string) {
    this.imagePath.set(val);
  }

  placeholder = computed(
    () => `https://placehold.co/${this.imageWidth()}X${this.imageHeight()}`
  );

  croppedImageURL = signal<string | undefined>(undefined);

  imageSource = computed(() => {
    return this.croppedImageURL() ?? this.placeholder();
  });

  uploading = signal(false);

  dialog = inject(MatDialog);

  fileSelected(event: any) {
    const file = event.target?.files[0];
    if (file) {
      const dialogRef = this.dialog.open(CropperDialogComponent, {
        data: {
          image: file,
          width: this.imageWidth(),
          height: this.imageHeight(),
        },
        width: '500px',
      });

      dialogRef
        .afterClosed()
        .pipe(filter((result) => !!result))
        .subscribe((result: CropperDialogResult) => {
          this.uploadImage(result.blob);
        });
    }
  }

  @Output() imageReady = new EventEmitter<string>();

  constructor() {
    effect(() => {
      if (this.croppedImageURL()) {
        this.imageReady.emit(this.croppedImageURL());
      }
    });
  }

  storage = inject(Storage);
  zone = inject(NgZone);

  async uploadImage(blob: Blob) {
    this.uploading.set(true);
    const storageRef = ref(this.storage, this.imagePath());
    const uploadTask = await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    this.croppedImageURL.set(downloadUrl);
    this.uploading.set(false);
  }
}