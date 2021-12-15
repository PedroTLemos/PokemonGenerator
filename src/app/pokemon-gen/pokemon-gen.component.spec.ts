import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonGenComponent } from './pokemon-gen.component';

describe('PokemonGenComponent', () => {
  let component: PokemonGenComponent;
  let fixture: ComponentFixture<PokemonGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
