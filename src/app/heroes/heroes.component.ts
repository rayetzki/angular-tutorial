import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  constructor(private readonly heroService: HeroService) { }

  heroes: Array<Hero> = [];
  hero: Hero = { id: 1, name: 'Windstorm' };

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string) {
    if (!name) return;
    this.heroService.addHero({ name }).subscribe(hero => {
      this.heroes.push(hero);
    })
  }

  delete(hero: Hero) {
    if (!hero) return;
    this.heroes = this.heroes.filter(h => h.id !== hero.id);
  }
}
