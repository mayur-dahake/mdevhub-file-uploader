import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdevhubFileUploadComponent } from './mdevhub-file-upload/mdevhub-file-upload.component';
import { FileUploadExampleComponent } from './file-upload-example/file-upload-example.component';

@NgModule({
  declarations: [
    AppComponent,
    MdevhubFileUploadComponent,
    FileUploadExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
