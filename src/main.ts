import { Component, ElementRef, ViewChild} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { makeBindingParser } from '@angular/compiler';


// SELECT WIN CONDITION
@Component({
  selector: 'game-set',
  standalone: true,
  templateUrl: './template/html/gameSet.html',
  styleUrls: ['./template/css/gameSet.css']
})
export class gameSetApp {

  // get button element ID "getFirst"
  @ViewChild('getFirst', {static: true}) getFirst: ElementRef;

  // get button element ID "getFirst"
  @ViewChild('getScore', {static: true}) getScore: ElementRef;

  constructor() {
    // 初始化为一个空的 ElementRef
    this.getFirst = {} as ElementRef;

    // 初始化为一个空的 ElementRef
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

bootstrapApplication(gameSetApp);


// GAME WORK
@Component({
  selector: 'game-work',
  standalone: true,
  template: '<div></div>'
})
export class gameWorkApp {
  
}

bootstrapApplication(gameWorkApp);