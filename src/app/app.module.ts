import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdevhubFileUploadComponent } from './mdevhub-file-upload/mdevhub-file-upload.component';
import { FileUploadExampleComponent } from './file-upload-example/file-upload-example.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonDailogComponentComponent } from './common-dailog-component/common-dailog-component.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadExampleComponent,
    MdevhubFileUploadComponent,
    CommonDailogComponentComponent,
  ],
  imports: [BrowserModule,FormsModule, AppRoutingModule, MatDialogModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
