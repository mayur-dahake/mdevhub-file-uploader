import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDailogComponentComponent } from './common-dailog-component.component';

describe('CommonDailogComponentComponent', () => {
  let component: CommonDailogComponentComponent;
  let fixture: ComponentFixture<CommonDailogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonDailogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonDailogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
