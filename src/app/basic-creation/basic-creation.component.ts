import { Component, OnInit } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { of } from 'rxjs';
import { from } from 'rxjs';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-basic-creation',
  templateUrl: './basic-creation.component.html',
  styleUrls: ['./basic-creation.component.css']
})
export class BasicCreationComponent implements OnInit {

  subscription: Subscription = new Subscription; //unsubscribe

  constructor() { }

  ngOnInit(): void {
  }

  observableCreate() {
    const hello = Observable.create((observer: Observer<string>) => {
      observer.next('Hello!');
      observer.next('from');
      observer.next('Observable!');
      observer.complete();
    });
    hello.subscribe(val => console.log(val))
  }
  fromClick() {
    from([1, 2, 3, 4, 5, { x: 10, y: 20 }])
      .subscribe((v) => console.log(v));
    const source = from([1, 2, 3, 4, 5, { x: 10, y: 20 }])
    const subscripition = source.subscribe((v) => console.warn(v)); //From entende como varios objetos os valores
    this.subscription.add(subscripition);
  }

  ofClick() {
    of([1, 2, 3, 4, 5, { x: 10, y: 20 }])
      .subscribe((v) => console.log(v)); // OF entende como apenas um objeto todos os valores

  }

  intervalClick() {
    const source = interval(1000);
    const subscripition = source.subscribe((v) => console.log(v)); // se inscreve de intervalo a intervalo, ja contando logo de inicio
    this.subscription.add(subscripition);
  
  }

  timerClick() {
    //const source = interval(1000); Conta uma vez só
    const source = timer(3000, 1000);
    const subscripition = source.subscribe((v) => console.log(v)); // TImer te possivbilita de contar uma vez só e parar, ou de esperar um tempo e ir contando de tempo em tempo
    this.subscription.add(subscripition);
  }

  unsubscribeClick(){
    this.subscription.unsubscribe();
    this.subscription = new Subscription();

  }
}
