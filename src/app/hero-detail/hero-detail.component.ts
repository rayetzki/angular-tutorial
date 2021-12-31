import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(private readonly heroService: HeroService) { }

  @Input() selectedHero?: Hero;

  ngOnInit(): void {}

  save(): void {
    if (!this.selectedHero) return;
    this.heroService.updateHero(this.selectedHero);
  }
}
