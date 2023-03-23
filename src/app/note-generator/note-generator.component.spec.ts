import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteGeneratorComponent } from './note-generator.component';

describe('NoteGeneratorComponent', () => {
  let component: NoteGeneratorComponent;
  let fixture: ComponentFixture<NoteGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
