import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserMpForgetPage } from './user-mp-forget.page';

describe('UserMpForgetPage', () => {
  let component: UserMpForgetPage;
  let fixture: ComponentFixture<UserMpForgetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMpForgetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserMpForgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
