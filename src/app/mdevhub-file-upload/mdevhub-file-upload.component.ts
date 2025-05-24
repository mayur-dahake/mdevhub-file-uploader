import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface UploadFile {
  name: string;
  size: number;
  progress: number;
  rawFile: File;
  previewUrl?: string;
  intervalId?: ReturnType<typeof setInterval>;
}

export interface FileUploadDialogData {
  allowMultiple?: boolean;
  acceptTypes?: string[];
  maxFileSizeMB?: number;
  enablePreview?: boolean;
  enableUrlUpload?: boolean;
}

@Component({
  selector: 'mdevhub-file-upload',
  standalone: false,
  templateUrl: './mdevhub-file-upload.component.html',
  styleUrl: './mdevhub-file-upload.component.scss',
})
export class MdevhubFileUploadComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  public fileFormData: FormData = new FormData();
  public fileError: string | null = null;
  uploadedFile: UploadFile | null = null;

  constructor(
    public dialogRef: MatDialogRef<MdevhubFileUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileUploadDialogData
  ) {}

  ngOnInit(): void {
    this.data = {
      allowMultiple: this.data.allowMultiple ?? true,
      acceptTypes: this.data.acceptTypes ?? ['*/*'],
      maxFileSizeMB: this.data.maxFileSizeMB ?? 10,
      enablePreview: this.data.enablePreview ?? false,
      enableUrlUpload: this.data.enableUrlUpload ?? false,
    };
  }

  public openFileSelector(): void {
    this.fileInput.nativeElement.click();
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    this.handleFile(input.files[0]);
    this.fileInput.nativeElement.value = ''; // Reset input
  }

  public onFileDropped(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files = Array.from(event.dataTransfer?.files || []);
    if (files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  private handleFile(file: File): void {
    const maxSizeMB = this.data?.maxFileSizeMB ?? 10;
    const allowedTypes = this.data?.acceptTypes ?? ['text/csv'];

    const isTypeValid =
      allowedTypes.includes('*/*') || allowedTypes.includes(file.type);
    const isSizeValid = file.size <= maxSizeMB * 1024 * 1024;

    if (!isTypeValid || !isSizeValid) {
      this.fileError = !isTypeValid
        ? `Invalid file type. Allowed: ${allowedTypes.join(', ')}`
        : `File size exceeds ${maxSizeMB}MB.`;
      return;
    }

    this.fileError = null;

    // Clear previous
    if (this.uploadedFile?.intervalId) {
      clearInterval(this.uploadedFile.intervalId);
    }

    const uploadedFile: UploadFile = {
      name: file.name,
      size: file.size,
      progress: 0,
      rawFile: file,
    };

    // 👇 Add preview logic
    if (this.data?.enablePreview && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        uploadedFile.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

    // Cancel previous upload if needed
    if (this.uploadedFile?.intervalId) {
      clearInterval(this.uploadedFile.intervalId);
    }

    this.uploadedFile = uploadedFile;

    this.fileFormData = new FormData();
    this.fileFormData.append('file', file, file.name);

    this.simulateUpload(this.uploadedFile);
  }

  public removeFile(): void {
    if (this.uploadedFile?.intervalId) {
      clearInterval(this.uploadedFile.intervalId);
    }
    this.uploadedFile = null;
    this.fileFormData = new FormData();
  }

  public simulateUpload(file: UploadFile): void {
    const intervalId = setInterval(() => {
      if (file.progress >= 100) {
        clearInterval(intervalId);
        return;
      }
      file.progress += 10;
    }, 100);
    file.intervalId = intervalId;
  }

  public convertFileSize(size: number): string {
    const sizeInKB = size / 1024;
    return sizeInKB < 1024
      ? Math.round(sizeInKB) + ' KB'
      : (sizeInKB / 1024).toFixed(1) + ' MB';
  }

  public canGoNext(): boolean {
    return !!this.uploadedFile && this.uploadedFile.progress === 100;
  }

  public next(): void {
    this.dialogRef.close({ data: this.fileFormData });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  onDragOver(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
