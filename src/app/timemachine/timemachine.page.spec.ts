import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimemachinePage } from './timemachine.page';

describe('TimemachinePage', () => {
  let component: TimemachinePage;
  let fixture: ComponentFixture<TimemachinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimemachinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimemachinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
