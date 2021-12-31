import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  constructor(private readonly heroService: HeroService) { }

  heroes$!: Observable<Hero[]>;
  #searchTerms = new Subject<string>();

  search(term: string) {
    this.#searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.#searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.heroService.searchHero(term)),
    )
  }
}
