import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private backendUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getSignedUploadUrl(filename: string, filetype: string) {
    return this.http.post<{ url: string }>(
      `${this.backendUrl}/generate-upload-url`,
      { filename, filetype }
    );
  }

  uploadFileToS3(signedUrl: string, file: File) {
    return this.http.put(signedUrl, file, {
      headers: {
        'Content-Type': file.type
      },
      reportProgress: true,
      observe: 'events'
    });
  }

  getSignedDownloadUrl(filename: string) {
    return this.http.get<{ url: string }>(
      `${this.backendUrl}/generate-download-url?filename=${filename}`
    );
  }
  
}
