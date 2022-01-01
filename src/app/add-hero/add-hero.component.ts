import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent {
  constructor(
    private readonly heroService: HeroService,
    private readonly location: Location
  ) {}

  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];
  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  newHero() {
    this.heroService.addHero({ name: this.model.name }).subscribe(() => {
      this.location.back();
    })
  }
}
