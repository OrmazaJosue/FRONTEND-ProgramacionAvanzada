import { HttpClient, HttpClientModule, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-uplaod-comprobante',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule , HttpClientModule, RouterLink],
  templateUrl: './uplaod-comprobante.component.html',
  styleUrl: './uplaod-comprobante.component.css'
})
export class UplaodComprobanteComponent implements OnInit {

  uploadForm: FormGroup = new FormGroup({
    comprobante: new FormControl('')
  });
  uploadedFileUrl: string = '';
  uploading: boolean = false;
  uploadProgress: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedFileUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadComprobante() {
    this.uploading = true;
    const file = this.uploadForm.get('comprobante')?.value;
    if (file) {
      const formData = new FormData();
      formData.append('comprobante', file);

      this.http.post('http://localhost:3001/upload-comprobante', formData, {
        reportProgress: true,
        observe: 'events'
      })
     .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total) {
              this.uploadProgress = Math.round(event.loaded * 100 / event.total);
            }
          } else if (event instanceof HttpResponse) {
            this.uploading = false;
            console.log('File uploaded successfully!');
          }
        }, error => {
          this.uploading = false;
          console.error('Error uploading file:', error);
        });
    }

}
}