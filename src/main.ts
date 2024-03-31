import { Component, ElementRef, ViewChild, Injectable} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { makeBindingParser } from '@angular/compiler';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // 勝利條件-資料訂閱
  private winConditionSource = new BehaviorSubject<any>(null);
  winConditionSelect = this.winConditionSource.asObservable();

  setWinCondition(newData: any) {
    this.winConditionSource.next(newData);

  //  XXX-資料訂閱
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
  message: any; // message用於存取component傳遞的資料
  selectWinCondition: any = {winCondition: 'getFirst', score: 'NaN'}; // 選擇勝利方式

  // get element ID "gameSetBoard"
  @ViewChild('gameSetBoard', {static: true}) gameSetBoard: ElementRef;

  // get button element ID "getFirst"
  @ViewChild('getFirst', {static: true}) getFirst: ElementRef;

  // get button element ID "getFirst"
  @ViewChild('getScore', {static: true}) getScore: ElementRef;

  // get select element ID "scoreSelect"
  @ViewChild('scoreSelect', {static: true}) scoreSelect: ElementRef;

  constructor(private dataService: DataService) {
    this.dataService.winConditionSelect.subscribe(data => this.message = data);
    // 初始化一个空的 ElementRef
    this.gameSetBoard = {} as ElementRef;
    this.getFirst = {} as ElementRef;
    this.getScore = {} as ElementRef;
    this.scoreSelect = {} as ElementRef;
  }

  ngAfterViewInit() {
    const getFirstButton = this.getFirst.nativeElement;

    getFirstButton.classList.add('selectBorder');
  }

  selectGetFirst() {
    // 獲取原生DOM元素
    const getFirstButton = this.getFirst.nativeElement;
    const getScoreButton = this.getScore.nativeElement;

    // 顯示以及關閉選取框
    getFirstButton.classList.add('selectBorder');
    getScoreButton.classList.remove('selectBorder');

    // 關閉分數選取
    this.scoreDisabledTrue()

    // 設置GetFirst給selectWinCondition
    this.selectWinCondition.winCondition = getFirstButton.value;

    // 設置目標分數
    this.selectWinCondition.score = 'NaN';
  }

  selectGetScore() {
    // 獲取原生DOM元素
    const getScoreButton = this.getScore.nativeElement;
    const getFirstButton = this.getFirst.nativeElement;
    const getScoreValue = this.scoreSelect.nativeElement;

    // 顯示以及關閉選取框
    getScoreButton.classList.add('selectBorder');
    getFirstButton.classList.remove('selectBorder');

    // 開啟分數選取
    this.scoreDisabledFalse();

    // 設置獲勝條件為達成目標分數
    this.selectWinCondition.winCondition = getScoreButton.value;

    // 設置目標分數
    this.selectWinCondition.score = getScoreValue.value;
    
  }

  // 開啟關閉分數選取
  isDisabled: boolean = true;

  scoreDisabledFalse() {
    this.isDisabled = false;
  }

  scoreDisabledTrue() {
    this.isDisabled = true;
  }

  // 開始遊戲
  startGameButton() {
    // 獲取原生DOM元素
    const getGameSetBoard = this.gameSetBoard.nativeElement;

    // 隱藏gameSetBoard
    getGameSetBoard.classList.add('invisible');

    this.message = this.selectWinCondition;
    this.dataService.setWinCondition(this.message);
  }
}


// GAME CELL WORK
@Component({
  selector: 'game-cell-work',
  standalone: true,
  templateUrl: './template/html/gameCellWork.html',
  styleUrls: ['./template/css/gameCellWork.css']
})
export class gameCellWorkApp {
  winCondition: any;

  constructor(private dataService: DataService) {
    this.dataService.winConditionSelect.subscribe(data => {
      this.handleWinConditionSelect(data);
    });
  }

   // winConditionSource資料更改時執行
   handleWinConditionSelect(newData: string) {
    this.winCondition = newData;
  }


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