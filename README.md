# Mdevhub File Uploader

A flexible Angular file upload component with drag & drop, URL upload, file type/size restrictions, progress display, and preview support. Designed for use with Angular Material dialogs.

---

## ✨ Features

- **Single or Multiple File Upload** (configurable)
- **File Type Restrictions** (`acceptTypes`)
- **Maximum File Size Limit** (`maxFileSizeMB`)
- **Upload Progress Bar** for each file
- **Remove File** before or after upload
- **URL-based Upload** (fetch file from a direct URL)
- **Drag & Drop Support** with visual feedback
- **Manual File Selection** via button
- **File Metadata Display** (name, size, type, status)
- **Preview Support** for images and PDFs
- **Error Messages** for invalid type/size
- **Custom Upload Handler** (optional)
- **Theming & SCSS** support
- **Dialog-based Integration** (no Input/Output events required)

---

## 🚀 Usage

### 1. Open the File Upload Dialog

```typescript
import { MatDialog } from '@angular/material/dialog';
import { MdevhubFileUploadComponent } from './mdevhub-file-upload/mdevhub-file-upload.component';

constructor(private dialog: MatDialog) {}

openUploadDialog() {
  const dialogRef = this.dialog.open(MdevhubFileUploadComponent, {
    width: '500px',
    data: {
      title: 'Import File',
      allowMultiple: true,
      acceptTypes: ['*/*'],
      maxFileSizeMB: 10,
      enablePreview: true,
      enableUrlUpload: true,
    },
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result && result.files) {
      // Handle uploaded files
      result.files.forEach(file => {
        // file: { name, type, size, rawFile }
      });
      // Or use result.formData for direct upload
    }
  });
}
```

### 2. Read Excel/CSV Files

```typescript
readExcelOrCsvFile(file: File) {
  const reader = new FileReader();
  reader.onload = (e: any) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    console.log('Sheet Data:', jsonData);
  };
  reader.readAsArrayBuffer(file);
}
```

---

## 🧪 Test URLs

- **Image:**  
  `https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png`
- **PDF:**  
  `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`
- **CSV:**  
  `https://people.sc.fsu.edu/~jburkardt/data/csv/airtravel.csv`
- **Excel:**  
  `https://file-examples.com/storage/fe6b8e7e2e7e4b2b8e4e4e4/2017/02/file_example_XLSX_10.xlsx`

---

## 🛠️ Customization

- **Theming:**  
  Override SCSS variables for colors, backgrounds, etc.
- **Preview:**  
  Enable/disable with `enablePreview` flag.
- **URL Upload:**  
  Enable/disable with `enableUrlUpload` flag.
- **Accept Types:**  
  Restrict file types with `acceptTypes` array.

---

## 📦 Dependencies

- Angular
- Angular Material
- `xlsx` (for Excel/CSV parsing, optional)

---

## 📄 License

MIT
