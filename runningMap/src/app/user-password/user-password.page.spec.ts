import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserPasswordPage } from './user-password.page';

describe('UserPasswordPage', () => {
  let component: UserPasswordPage;
  let fixture: ComponentFixture<UserPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
