import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesEntityDetailComponent } from './notes-entity-detail.component';

describe('NotesEntityDetailComponent', () => {
  let component: NotesEntityDetailComponent;
  let fixture: ComponentFixture<NotesEntityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesEntityDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesEntityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
