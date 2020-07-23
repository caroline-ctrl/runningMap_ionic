import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrsPage } from './ors.page';

describe('OrsPage', () => {
  let component: OrsPage;
  let fixture: ComponentFixture<OrsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
