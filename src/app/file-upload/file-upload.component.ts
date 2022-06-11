import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  selectedFile: File | null = null;
  selectedFileName = '';

  onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;

      if (input.files && input.files.length > 0) {
          const file = input.files[0];
          this.selectedFile = file;

          this.selectedFileName = file.name;
      }
  }
  onUpload() {
      console.log("Uploading...", this.selectedFile);
  }
}
