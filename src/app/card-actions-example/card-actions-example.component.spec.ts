import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActionsExampleComponent } from './card-actions-example.component';

describe('CardActionsExampleComponent', () => {
  let component: CardActionsExampleComponent;
  let fixture: ComponentFixture<CardActionsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardActionsExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardActionsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
