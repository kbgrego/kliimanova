import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelec } from './language-selec';

describe('LanguageSelec', () => {
  let component: LanguageSelec;
  let fixture: ComponentFixture<LanguageSelec>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelec],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelec);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
