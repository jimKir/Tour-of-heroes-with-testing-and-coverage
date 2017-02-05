import {HeroDetailComponent} from "./hero-detail.component";
import {HeroService} from "./hero.service";
import {MockBackend} from "@angular/http/testing";
import {ComponentFixture, TestBed, async, tick, fakeAsync} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {BaseRequestOptions, Http} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {Hero} from "./hero";
import {RouteParams} from 'angular2/router';


let elementFixture: ComponentFixture<HeroDetailComponent>;
let componentInstance: HeroDetailComponent;
let hdsSpy: HeroDetailServiceSpy;

describe('Component: HeroDetail', () => {

  /** Create the HeroDetailComponent, initialize it, set test variables  */
  function createComponent() {
    elementFixture = TestBed.createComponent(HeroDetailComponent);
    componentInstance    = elementFixture.componentInstance;

    // 1st change detection triggers ngOnInit which gets a hero
    elementFixture.detectChanges();
    return elementFixture.whenStable().then(() => {
      // 2nd change detection displays the async-fetched hero
      elementFixture.detectChanges();
    });
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      declarations: [
        HeroDetailComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    }) // Override component's own provider
      .overrideComponent(HeroDetailComponent, {
        set: {
          providers: [
            { provide: HeroService, useClass: HeroDetailServiceSpy }
          //  { provide: RouteParams,  useValue: new RouteParams({ id: '1' })}
          ]
        }
      }).
    compileComponents()
  }));

  beforeEach( async(() => {
    createComponent();
    // get the component's injected HeroDetailServiceSpy
    hdsSpy = elementFixture.debugElement.injector.get(HeroService);
  }));

  // synchronous beforeEach
  beforeEach(() => {
    createComponent();
    componentInstance = elementFixture.componentInstance; // BannerComponent test instance
    hdsSpy =  elementFixture.debugElement.injector.get(HeroService);
  });



describe('Functional: ', () => {
    // it('should save stub hero change', fakeAsync(() => {
    //   const origName = hdsSpy.testHero.name;
    //   const newName = 'New Name';
    //
    //   componentInstance.ngOnInit();
    //   expect(hdsSpy.getHero.calls.count()).toBe(1, 'getHero called once');
    //   expect(componentInstance.hero.name).toBeDefined();
    //   expect(hdsSpy.testHero.name).toBe(origName, 'service hero unchanged before save');
    //   elementFixture.componentInstance.save();
    //   expect(hdsSpy.saveHero.calls.count()).toBe(1, 'saveHero called once');
    //
    //   tick(); // wait for async save to complete
    //   expect(hdsSpy.testHero.name).toBe(newName, 'service hero has new name after save');
    //
    // }));

    it('should create a new hero and set navigated false when initialized without route id param',() => {
        elementFixture = TestBed.createComponent(HeroDetailComponent);
        elementFixture.detectChanges();
        expect(elementFixture.componentInstance.hero).toBeDefined();
        elementFixture.componentInstance.ngOnInit();
        expect(elementFixture.componentInstance.navigated).toBeFalsy();
        expect(elementFixture.componentInstance.hero).toEqual(new Hero());

      }
    );


    // it('should attempt to save the hero when save is called and navigate to hero when save successful', () => {
    //   elementFixture.componentInstance.hero = MockHero;
    //   spyOn(elementFixture.componentInstance, 'goBack');
    //   spyOn(heroServiceSpy, 'save').and.callFake(() => {
    //     return Promise.resolve(MockHero);
    //   });
    //
    //   elementFixture.componentInstance.save();
    //   tick();
    //   expect(heroService.save).toHaveBeenCalled();
    //   expect(heroService.save).toHaveBeenCalledTimes(1);
    //   expect(heroService.save).toHaveBeenCalledWith(MockHero);
    //   expect(elementFixture.componentInstance.hero).toEqual(MockHero);
    //   expect(elementFixture.componentInstance.goBack).toHaveBeenCalled();
    //   expect(elementFixture.componentInstance.goBack).toHaveBeenCalledTimes(1);
    //   expect(elementFixture.componentInstance.goBack).toHaveBeenCalledWith(MockHero);
    //
    //
    // });

  });

});

class HeroDetailServiceSpy {
  testHero = {id: 42, name: 'Test Hero'};

  getHero = jasmine.createSpy('getHero').and.callFake(
    () => Promise
      .resolve(true)
      .then(() => Object.assign({}, this.testHero))
  );

  saveHero = jasmine.createSpy('saveHero').and.callFake(
    (hero: Hero) => Promise
      .resolve(true)
      .then(() => Object.assign(this.testHero, hero))
  );
}
