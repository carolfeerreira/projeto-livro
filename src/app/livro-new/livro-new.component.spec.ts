import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroNewComponent } from './livro-new.component';

describe('LivroNewComponent', () => {
  let component: LivroNewComponent;
  let fixture: ComponentFixture<LivroNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivroNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivroNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
