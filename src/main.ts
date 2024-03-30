import { Component, ElementRef, ViewChild, Injectable} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { makeBindingParser } from '@angular/compiler';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject<any>(null);
  currentMessage = this.messageSource.asObservable();

  setData(newData: any) {
    this.messageSource.next(newData);
  }
}


// SELECT WIN CONDITION
@Component({
  selector: 'game-set',
  standalone: true,
  templateUrl: './template/html/gameSet.html',
  styleUrls: ['./template/css/gameSet.css']
})
export class gameSetApp {
  message: any;

  // get button element ID "getFirst"
  @ViewChild('getFirst', {static: true}) getFirst: ElementRef;

  // get button element ID "getFirst"
  @ViewChild('getScore', {static: true}) getScore: ElementRef;

  constructor(private dataService: DataService) {
    this.dataService.currentMessage.subscribe(data => this.message = data);
    // 初始化一个空的 ElementRef
    this.getFirst = {} as ElementRef;

    // 初始化一个空的 ElementRef
    this.getScore = {} as ElementRef;
  }

  ngAfterViewInit() {
    const getFirstButton = this.getFirst.nativeElement;

    getFirstButton.classList.add('selectBorder');
  }

  selectGetFirst() {
    // 獲取原生DOM元素
    const getFirstButton = this.getFirst.nativeElement;
    const getScoreButton = this.getScore.nativeElement;

    getFirstButton.classList.add('selectBorder');
    getScoreButton.classList.remove('selectBorder');
  }

  selectGetScore() {
    // 獲取原生DOM元素
    const getScoreButton = this.getScore.nativeElement;
    const getFirstButton = this.getFirst.nativeElement;

    getScoreButton.classList.add('selectBorder');
    getFirstButton.classList.remove('selectBorder');
  }

  // select element togle
  isDisabled: boolean = true;

  disabledFalse() {
    this.isDisabled = false;
  }

  disabledTrue() {
    this.isDisabled = true;
  }
  test: string = 'test';
}


// GAME CELL WORK
@Component({
  selector: 'game-cell-work',
  standalone: true,
  templateUrl: './template/html/gameCellWork.html'
})
export class gameCellWorkApp {
  
}


// Composite components
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [gameSetApp, gameCellWorkApp],
  template: `
    <game-set></game-set>
    <game-cell-work></game-cell-work>
  `
})
export class AppComponent {}

bootstrapApplication(AppComponent);