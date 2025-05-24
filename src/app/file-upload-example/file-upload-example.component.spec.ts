import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadExampleComponent } from './file-upload-example.component';

describe('FileUploadExampleComponent', () => {
  let component: FileUploadExampleComponent;
  let fixture: ComponentFixture<FileUploadExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileUploadExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
