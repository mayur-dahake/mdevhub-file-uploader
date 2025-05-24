# MDevHub File Uploader

A flexible, modern Angular file upload component with drag & drop, URL upload, file type/size restrictions, progress display, and preview support.  
Built for Angular Material dialogs and easy integration in any Angular project.

---

## 🚀 Demo

- [Live Demo on StackBlitz](https://stackblitz.com/github/mdevhub/mdevhub-file-uploader)  
- [MDevHub Website](https://mdevhub.com)

---

## ✨ Features

- Single or multiple file upload (configurable)
- File type restrictions (`acceptTypes`)
- Maximum file size limit (`maxFileSizeMB`)
- Upload progress bar for each file
- Remove files before or after upload
- URL-based upload (fetch file from direct URL)
- Drag & drop support with visual feedback
- Manual file selection via button
- File metadata display (name, size, type, status)
- Preview support for images and PDFs
- Error messages for invalid type/size
- Custom upload handler (optional)
- Theming & SCSS support
- Dialog-based integration (no Input/Output events required)

---

## 🛠️ Installation

```sh
npm install mdevhub
```

---

## 🧑‍💻 Usage

### 1. Import and Open the File Upload Dialog

```typescript
import { MatDialog } from '@angular/material/dialog';
import { MdevhubFileUploaderComponent } from 'mdevhub';

@Component({ /* ... */ })
export class YourComponent {
  constructor(private dialog: MatDialog) {}

  openUploadDialog() {
    const dialogRef = this.dialog.open(MdevhubFileUploaderComponent, {
      width: '500px',
      data: {
        title: 'Import File',
        allowMultiple: true,
        acceptTypes: ['image/png', 'application/pdf', '.csv', '.xlsx'],
        maxFileSizeMB: 10,
        enablePreview: true,
        enableUrlUpload: true,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.files) {
        result.files.forEach(file => {
          // file: { name, type, size, rawFile }
          // Process or upload file.rawFile as needed
        });
        // Or use result.formData for direct upload
      }
    });
  }
}
```

### 2. Add the Demo Component in Your App

```html
<!-- app.component.html -->
<app-file-upload-example></app-file-upload-example>
<router-outlet />
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

## 🎨 Theming & Customization

- Override SCSS variables for colors, backgrounds, etc.
- Enable/disable preview and URL upload with flags.
- Restrict file types with `acceptTypes` array.

---

## 📦 Dependencies

- Angular
- Angular Material
- `xlsx` (for Excel/CSV parsing, optional)

---

## 🌐 Social & Community

- [GitHub](https://github.com/mdevhub)
- [Twitter](https://twitter.com/mdevhub)
- [LinkedIn](https://linkedin.com/company/mdevhub)
- [MDevHub Website](https://mdevhub.com)

---

## 📄 License

MIT

---