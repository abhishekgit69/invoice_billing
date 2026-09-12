import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenForm } from './open-form';

describe('OpenForm', () => {
  let component: OpenForm;
  let fixture: ComponentFixture<OpenForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenForm],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
