import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarBottom } from './toolbar-bottom';

describe('ToolbarBottom', () => {
  let component: ToolbarBottom;
  let fixture: ComponentFixture<ToolbarBottom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarBottom],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarBottom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
