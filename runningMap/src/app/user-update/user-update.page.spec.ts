import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserUpdatePage } from './user-update.page';

describe('UserUpdatePage', () => {
  let component: UserUpdatePage;
  let fixture: ComponentFixture<UserUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
