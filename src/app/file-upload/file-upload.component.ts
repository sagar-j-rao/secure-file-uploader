import { Component } from '@angular/core';
import { UploadService } from '../services/upload.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  selectedFileName = '';
  isUploading = false;
  downloadUrl: string = '';
  copied = false;

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }

  onUpload() {
    if (!this.selectedFile) return;
  
    this.isUploading = true;
  
    const file = this.selectedFile;
    const filename = file.name;
    const filetype = file.type;
  
    this.uploadService.getSignedUploadUrl(filename, filetype).subscribe({
      next: ({ url }) => {
        this.uploadService.uploadFileToS3(url, file).subscribe({
          next: (event) => {
            console.log('Upload event:', event);
          },
          complete: () => {
            console.log('Upload finished');
            this.isUploading = false;
    
            this.uploadService.getSignedDownloadUrl(filename).subscribe({
              next: (res) => {
                this.downloadUrl = res.url;
              }
            });
          },
          error: (err) => {
            console.error('Upload failed', err);
            this.isUploading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error generating upload URL', err);
        this.isUploading = false;
      }
    });
    
  }
  copyToClipboard() {
    navigator.clipboard.writeText(this.downloadUrl).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
  }
  
  
}
