import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Hero } from './hero';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) { }

  #heroesUrl = 'api/heroes';

  getHeroes(): Observable<Hero[]> {
    this.#log('HeroService: Fetched heroes');
    return this.http.get<Hero[]>(this.#heroesUrl).pipe(
      tap(() => this.#log('fetched heroes')),
      catchError(this.#handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.#heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(() => this.#log(`Fetched hero: id = ${id}`)),
      catchError(this.#handleError<Hero>(`getHeroById: id = ${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.#heroesUrl, hero, this.#httpOptions).pipe(
      tap(() => this.#log(`updated hero id=${hero.id}`)),
      catchError(this.#handleError('updateHero'))
    );
  }

  addHero(hero: Pick<Hero, 'name'>): Observable<Hero> {
    return this.http.post<Hero>(this.#heroesUrl, hero, this.#httpOptions).pipe(
      tap(newHero => this.#log(`added hero w/ id=${newHero.id}`)),
      catchError(this.#handleError<Hero>('addHero'))
    )
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.#heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.#httpOptions).pipe(
      tap(() => this.#log(`deleted hero id=${id}`)),
      catchError(this.#handleError<Hero>('deleteHero'))
    );
  }

  searchHero(term: string): Observable<Hero[]> {
    if (!term) return of([]);
    const params = new HttpParams().set('name', term );
    return this.http.get<Hero[]>(this.#heroesUrl, { params }).pipe(
      tap(found => {
        if (found.length) this.#log(`Found ${length} heroes matching term: ${term}`);
        else if (!found.length) this.#log(`Found no matches by term: ${term}`);
      }),
      catchError(this.#handleError<Hero[]>('searchHeros', []))
    );
  }

  #httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  #handleError<T>(operation = 'operation', result?: T) {
    return (error: unknown): Observable<T> => {
      if (error instanceof Error) {
        console.error(error);
        this.#log(`${operation} failed: ${error.message}`);
      }
      if (result) return of(result);
      else return of();
    }
  }

  #log(message: string) {
    this.messageService.add(message);
  }
}
