import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdevhubFileUploadComponent } from './mdevhub-file-upload.component';

describe('MdevhubFileUploadComponent', () => {
  let component: MdevhubFileUploadComponent;
  let fixture: ComponentFixture<MdevhubFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdevhubFileUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdevhubFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
