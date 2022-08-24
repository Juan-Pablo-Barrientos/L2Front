import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsocCompaniesComponent } from './asoc-companies.component';

describe('AsocCompaniesComponent', () => {
  let component: AsocCompaniesComponent;
  let fixture: ComponentFixture<AsocCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsocCompaniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsocCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
