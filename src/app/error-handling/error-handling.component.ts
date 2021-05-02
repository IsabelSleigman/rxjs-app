import { observable, Observable, Observer, of, throwError, timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { catchError, map, retry, retryWhen, tap, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css']
})
export class ErrorHandlingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  startTeste() {
    let obj: Observable<any> = new Observable((observer) => {
      for (let i = 0; i < 10; i++) {
        if (i === 7)
          observer.error('Ocorreu um erro: ' + i);
        else
          observer.next(i);
      }
    });
    obj
      .pipe(
        map(i => i + 10),
        tap(i => console.log('Antes do erro ' + i)),
        catchError(error => {
          console.error('CatchError: ' + error);
          //return of(0);
           return throwError('ThrowError: Ocorreu um erro inesperado!')
        }),
       // retry(2), //Serve pra tentar repetir a mesma operação depois do erro.
        retryWhen(i => timer(5000)) // serve parar tentar depois do erro passando um observable
        )
      // .subscribe((i) => console.log("Normal " + i),
      //   err => console.error(err),
      //   () => console.log('Completado')
      // );

      let obj2: Observable<any> = new Observable((observer) =>{
        timer(2000).subscribe((n) => observer.next(1000));
        timer(2500).subscribe((n) => observer.complete());
      });

      obj2
      .pipe(
        timeout(2400) // com 2000 ele capta o catchError, mas com 2400 ele passa pelo complete
      ).subscribe((i) => console.log("N: " + i),
      err => console.error(err),
      () => console.log('Completado')

      )
  }
}
