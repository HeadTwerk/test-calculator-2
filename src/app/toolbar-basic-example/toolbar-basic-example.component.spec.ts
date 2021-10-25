import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarBasicExampleComponent } from './toolbar-basic-example.component';

describe('ToolbarBasicExampleComponent', () => {
  let component: ToolbarBasicExampleComponent;
  let fixture: ComponentFixture<ToolbarBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarBasicExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
