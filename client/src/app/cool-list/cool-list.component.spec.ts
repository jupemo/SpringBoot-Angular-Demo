import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolListComponent } from './cool-list.component';

describe('CoolListComponent', () => {
  let component: CoolListComponent;
  let fixture: ComponentFixture<CoolListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoolListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
