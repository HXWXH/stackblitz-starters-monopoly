import { Component, ElementRef, ViewChild, Injectable, Renderer2} from '@angular/core';
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
  winCondition: any; // 勝利條件儲存變數
  
  // 格子內容
  cellContentData=[
    {
      class: 'question',
      question: '如果小明有3支鉛筆，小華給了他5支鉛筆，請問小明現在總共有多少支鉛筆？',
      options: ['8支', '6支', '7支'],
      answer: '8支'
    },
    {
      class: 'question',
      question: '如果一個蘋果賣5元，小美用20元買了幾個蘋果？',
      options: ['4個', '3個', '5個'],
      answer: '4個'
    },
    {
      class: 'question',
      question: '如果一個長方形花園的長是6公尺，寬是3公尺，請問它的面積是多少平方公尺？',
      options: ['18平方公尺', '9平方公尺', '20平方公尺'],
      answer: '18平方公尺'
    },
    {
      class: 'question',
      question: '如果一個數字比6大2，結果是多少？',
      options: ['8', '7', '9'],
      answer: '8'
    },
    {
      class: 'question',
      question: '如果小明每天睡覺前都看書半小時，一個星期看了多少小時的書？',
      options: ['3.5小時', '3小時', '4.5小時'],
      answer: '3.5小時'
    },
    {
      class: 'question',
      question: '「一鳴驚人」是用來形容什麼情況？',
      options: [
        '比喻平時默默無聞，而後卻突然有驚人的表現。',
        '比喻圓滿美好毫無缺陷的境界。',
        '比喻多此一舉，反將事情弄糟。'],
      answer: '比喻平時默默無聞，而後卻突然有驚人的表現。'
    },
    {
      class: 'question',
      question: '「畫蛇添足」這個成語的意思是什麼？',
      options: ['比喻多此一舉，反將事情弄糟。',
      '比喻平時默默無聞，而後卻突然有驚人的表現。',
      '比喻見識淺薄的人。'],
      answer: '比喻多此一舉，反將事情弄糟。'
    },
    {
      class: 'question',
      question: '「井底之蛙」這個成語是形容什麼樣的人？',
      options: ['比喻見識淺薄的人。',
      '比喻多此一舉，反將事情弄糟。',
      '比喻盲目胡亂地模仿他人，結果卻適得其反。'],
      answer: '比喻見識淺薄的人。'
    },
    {
      class: 'question',
      question: '「東施效顰」這個成語的意思是什麼？',
      options: ['比喻盲目胡亂地模仿他人，結果卻適得其反。',
      '比喻見識淺薄的人。',
      '比喻圓滿美好毫無缺陷的境界。'],
      answer: '比喻盲目胡亂地模仿他人，結果卻適得其反。'
    },
    {
      class: 'question',
      question: '「十全十美」這個成語的意思是什麼？',
      options: ['比喻圓滿美好毫無缺陷的境界。',
      '比喻盲目胡亂地模仿他人，結果卻適得其反。',
      '比喻平時默默無聞，而後卻突然有驚人的表現。'],
      answer: '比喻圓滿美好毫無缺陷的境界。'
    },
    {
      class: 'destiny',
      content: '扶老奶奶過馬路，玩家前進3格',
      value: '3'
    },
    {
      class: 'destiny',
      content: '在警察面前闖紅燈，玩家退3格',
      value: '-3'
    },
    {
      class: 'change',
      content: '路上撿到500元，玩家加3分',
      value: '3'
    },
    {
      class: 'change',
      content: '踩到狗大便，玩家扣3分',
      value: '-3'
    },
    {
      class: 'change',
      content: '遇到外星人，玩家加5分',
      value: '5'
    }
  ]

  constructor(private dataService: DataService, private renderer: Renderer2, private elementRef: ElementRef) {
    this.dataService.winConditionSelect.subscribe(data => {
      this.handleWinConditionSelect(data);
    });
  }

   // winConditionSource資料更改時執行
   handleWinConditionSelect(newData: string) {
    this.winCondition = newData;
    this.gameCellRandom();
    this.getCellByClassAndAssign();
    console.log(this.cellContentData);
  }

  // 獲取格子 Class Name 分配問題
  getCellByClassAndAssign() {
    const elements = this.elementRef.nativeElement.querySelectorAll('.cell');
    for (let i = 1; i < elements.length; i++) {
      this.isQuestion(this.cellContentData[i-1], elements[i]);
      this.isChange(this.cellContentData[i-1], elements[i]);
      this.isDestiny(this.cellContentData[i-1], elements[i]);
    }
  }

  // 格子配對的問題與機會命運格會重新洗牌
  gameCellRandom() {
    // 隨機排序陣列內容
    this.cellContentData.sort(() => Math.random() - 0.5);
  }

  // 確認class是question
  isQuestion(cellContentData: any, element: any) {
    if(cellContentData.class === 'question') {
      element.classList.add('questionCell');
      element.innerText = '問題';
      return 
    }
      return
  }

  // 確認class是change
  isChange(cellContentData: any, element: any) {
    if(cellContentData.class === 'change') {
      element.classList.add('changeCell');
      element.innerText = '機會';
      return 
    }
      return
  }

  // 確認class是destiny
  isDestiny(cellContentData: any, element: any) {
    if(cellContentData.class === 'destiny') {
      element.classList.add('destinyCell');
      element.innerText = '命運';
      return 
    }
      return
  }

}


// GAME CHARACTER
@Component({
  selector: 'game-character',
  standalone: true,
  templateUrl: './template/html/gameCharacter.html',
  styleUrls: ['./template/css/gameCharacter.css']
})
export class gameCharacterApp {
  winCondition: any; // 勝利條件儲存變數


}


// Composite components
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [gameSetApp, gameCellWorkApp, gameCharacterApp],
  template: `
    <game-set></game-set>
    <game-cell-work></game-cell-work>
    <game-character></game-character>
  `
})
export class AppComponent {}

bootstrapApplication(AppComponent);