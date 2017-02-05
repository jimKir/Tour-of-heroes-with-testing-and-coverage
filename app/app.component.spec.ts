/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';


describe('App: Testing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [RouterTestingModule]
    });

  });

  it('should create the app', async(() => {
    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(AppComponent);
      let app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });
  }));

  it(`should have as title 'Tour of heroes'`, async(() => {
    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(AppComponent);
      let app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('Tour of Heroes');
    });
  }));

  it('should render title in a h1 tag', async(() => {
    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Tour of Heroes');
    })
  }));
});
