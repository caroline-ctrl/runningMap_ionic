import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserConnexionPage } from './user-connexion.page';

describe('UserConnexionPage', () => {
  let component: UserConnexionPage;
  let fixture: ComponentFixture<UserConnexionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConnexionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserConnexionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
