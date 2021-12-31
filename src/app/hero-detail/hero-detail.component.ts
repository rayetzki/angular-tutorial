import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private readonly heroService: HeroService,
    private readonly location: Location
  ) { }

  @Input() selectedHero?: Hero;

  ngOnInit(): void {
    this.getHero();
  }

  delete(hero: Hero) {
    this.heroService.deleteHero(hero.id).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  getHero() {
    const heroId = Number(this.route.snapshot.paramMap.get('id'));
    if (!heroId) return;
    return this.heroService.getHero(heroId).subscribe(hero => {
      this.selectedHero = hero;
    })
  }

  save(): void {
    if (!this.selectedHero) return;
    this.heroService.updateHero(this.selectedHero);
  }
}
