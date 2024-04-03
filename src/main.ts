import { Component, ElementRef, ViewChild, Injectable, Renderer2, AfterViewChecked } from '@angular/core';
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
  }

  // 格子內容-資料訂閱
  private cellContentSource = new BehaviorSubject<any>(null);
  cellContent = this.cellContentSource.asObservable();

  setCellContent(newData: any) {
    this.cellContentSource.next(newData);
  }

  // 擲骰子-資料訂閱
  private charactersPositionSource = new BehaviorSubject<any>(null);
  charactersPosition = this.cellContentSource.asObservable();

  getCharactersPosition(newData: any) {
    this.charactersPositionSource.next(newData);
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
  cellSortToMonopoly:any = [];
  cellCorrespondCellContentIndex = [0, 1, 2, 3, 4, 6, 8, 10, 15, 14, 13, 12, 11, 9, 7, 5]

  // get element ID "gameSetBoard"
  @ViewChild('gameSetBoard', {static: true}) gameSetBoard: ElementRef;

  // get button element ID "getFirst"
  @ViewChild('getFirst', {static: true}) getFirst: ElementRef;

  // get button element ID "getScore"
  @ViewChild('getScore', {static: true}) getScore: ElementRef;

  // get select element ID "scoreSelect"
  @ViewChild('scoreSelect', {static: true}) scoreSelect: ElementRef;

  constructor(private dataService: DataService, private renderer: Renderer2, private elementRef: ElementRef) {
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


  // 格子內容
  cellContentData=[
    {
      class: '問題',
      question: '如果小明有3支鉛筆，小華給了他5支鉛筆，請問小明現在總共有多少支鉛筆？',
      options: ['8支', '6支', '7支'],
      answer: '8支'
    },
    {
      class: '問題',
      question: '如果一個蘋果賣5元，小美用20元買了幾個蘋果？',
      options: ['4個', '3個', '5個'],
      answer: '4個'
    },
    {
      class: '問題',
      question: '如果一個長方形花園的長是6公尺，寬是3公尺，請問它的面積是多少平方公尺？',
      options: ['18平方公尺', '9平方公尺', '20平方公尺'],
      answer: '18平方公尺'
    },
    {
      class: '問題',
      question: '如果一個數字比6大2，結果是多少？',
      options: ['8', '7', '9'],
      answer: '8'
    },
    {
      class: '問題',
      question: '如果小明每天睡覺前都看書半小時，一個星期看了多少小時的書？',
      options: ['3.5小時', '3小時', '4.5小時'],
      answer: '3.5小時'
    },
    {
      class: '問題',
      question: '「一鳴驚人」是用來形容什麼情況？',
      options: [
        '比喻平時默默無聞，而後卻突然有驚人的表現。',
        '比喻圓滿美好毫無缺陷的境界。',
        '比喻多此一舉，反將事情弄糟。'],
      answer: '比喻平時默默無聞，而後卻突然有驚人的表現。'
    },
    {
      class: '問題',
      question: '「畫蛇添足」這個成語的意思是什麼？',
      options: ['比喻多此一舉，反將事情弄糟。',
      '比喻平時默默無聞，而後卻突然有驚人的表現。',
      '比喻見識淺薄的人。'],
      answer: '比喻多此一舉，反將事情弄糟。'
    },
    {
      class: '問題',
      question: '「井底之蛙」這個成語是形容什麼樣的人？',
      options: ['比喻見識淺薄的人。',
      '比喻多此一舉，反將事情弄糟。',
      '比喻盲目胡亂地模仿他人，結果卻適得其反。'],
      answer: '比喻見識淺薄的人。'
    },
    {
      class: '問題',
      question: '「東施效顰」這個成語的意思是什麼？',
      options: ['比喻盲目胡亂地模仿他人，結果卻適得其反。',
      '比喻見識淺薄的人。',
      '比喻圓滿美好毫無缺陷的境界。'],
      answer: '比喻盲目胡亂地模仿他人，結果卻適得其反。'
    },
    {
      class: '問題',
      question: '「十全十美」這個成語的意思是什麼？',
      options: ['比喻圓滿美好毫無缺陷的境界。',
      '比喻盲目胡亂地模仿他人，結果卻適得其反。',
      '比喻平時默默無聞，而後卻突然有驚人的表現。'],
      answer: '比喻圓滿美好毫無缺陷的境界。'
    },
    {
      class: '命運',
      content: '扶老奶奶過馬路，玩家前進3格',
      value: '3'
    },
    {
      class: '命運',
      content: '在警察面前闖紅燈，玩家退3格',
      value: '-3'
    },
    {
      class: '機會',
      content: '路上撿到500元，玩家加3分',
      value: '3'
    },
    {
      class: '機會',
      content: '踩到狗大便，玩家扣3分',
      value: '-3'
    },
    {
      class: '機會',
      content: '遇到外星人，玩家加5分',
      value: '5'
    }
  ]


  // 開始遊戲
  startGameButton() {
    // 獲取原生DOM元素
    const getGameSetBoard = this.gameSetBoard.nativeElement;

    // 隱藏gameSetBoard
    getGameSetBoard.classList.add('invisible');

    this.message = this.selectWinCondition;
    this.dataService.setWinCondition(this.message);
    this.gameCellRandom();
    this.getCellByClassAndAssign();
    // 增加一個obj到array第一個
    this.cellContentData.unshift({class: 'startPoint', content: '', value: ''})
    
    // 將亂序的格子按照大富翁的格子順序排列 
    for (const item of this.cellCorrespondCellContentIndex) {
      this.cellSortToMonopoly.push(this.cellContentData[item]) 
    }

    this.cellContentData = this.cellSortToMonopoly;

    //  傳送亂序過的資料
    this.dataService.setCellContent(this.cellContentData);
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
      if(cellContentData.class === '問題') {
        element.classList.add('questionCell');
        element.innerText = '問題';
      }
    }
  
    // 確認class是change
    isChange(cellContentData: any, element: any) {
      if(cellContentData.class === '機會') {
        element.classList.add('changeCell');
        element.innerText = '機會';
      }
    }
  
    // 確認class是destiny
    isDestiny(cellContentData: any, element: any) {
      if(cellContentData.class === '命運') {
        element.classList.add('destinyCell');
        element.innerText = '命運';
      }
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
  cellContent: any; // 格子內容儲存變數
  diceNum: any; // 儲存骰子的數值
  whoTurn: string = 'circle'; // 誰的回合
  circlePosition:any ; // 獲取圓形元素ID
  squarePosition:any ; // 獲取方形元數ID
  winCondition: any; // 勝利條件儲存變數
  imageUrl: string; // 圖片Url
  run: any = 0; // 用於角色移動動畫
  isButtonDisabled: boolean = false; // 骰子按鈕 disable
  AnswerButtonDisabled: boolean = false; // 選擇按鈕 disable
  // 移動停止後，所觸發的事件
  class: any;
  question: any;
  option1: any;
  option2: any;
  option3: any;
  content: any;
  value: any;
  // 玩家分數紀錄
  charactersPositionSoreLog: any = [
    {name: 'circle', currentPosition: 0, score: 0},
    {name: 'square', currentPosition: 0, score: 0}
  ]

  // get element ID "squareCharacter"
  @ViewChild('squareCharacter', {static: true}) squareCharacter: ElementRef;

  // get element ID "circleCharacter"
  @ViewChild('circleCharacter', {static: true}) circleCharacter: ElementRef;
  
  // get element ID "dice"
  @ViewChild('dice', {static: true}) dice: ElementRef;

  // get element ID "monopolyEvent"
  @ViewChild('monopolyEvent', {static: true}) monopolyEvent: ElementRef;

  // get element ID "monopolyBtn"
  @ViewChild('monopolyBtn' , {static: true}) monopolyBtn: ElementRef;

  // get element ID "btn1"
  @ViewChild('btn1' , {static: true}) btn1: ElementRef;

  // get element ID "btn2"
  @ViewChild('btn2' , {static: true}) btn2: ElementRef;

  // get element ID "btn3"
  @ViewChild('btn3' , {static: true}) btn3: ElementRef;

  // get element ID "monopolyContent"
  @ViewChild('monopolyContent', {static: true}) monopolyContent: ElementRef;

  // get element ID "checkAnswer"
  @ViewChild('checkAnswer', {static: true}) checkAnswer: ElementRef;

  constructor(private dataService: DataService) {
    this.imageUrl = 'assets/roll.png';
    this.squareCharacter = {} as ElementRef;
    this.circleCharacter = {} as ElementRef;
    this.dice = {} as ElementRef;
    this.monopolyEvent = {} as ElementRef;
    this.monopolyBtn = {} as ElementRef;
    this.monopolyContent = {} as ElementRef;
    this.checkAnswer = {} as ElementRef;
    this.btn1 = {} as ElementRef;
    this.btn2 = {} as ElementRef;
    this.btn3 = {} as ElementRef;
  
    // 格子內容 問題、命運、機會
    this.dataService.cellContent.subscribe(data => this.cellContent = data);
  }

  rollDice() {
    const randomInt = Math.floor(Math.random() * 6) + 1; // 隨機數值1~6
    this.diceNum = randomInt;
    this.imageUrl = 'assets/dice' + this.diceNum + '.png'; // 置入diceNum，用於圖片致換
    this.isButtonDisabled = true; // 骰子 disable 按鈕
    this.AnswerButtonDisabled = false; // 選擇 disable 按鈕
    
    this.run = 1;

    // 回合轉換
    this.whoTurn === 'circle' ? this.circleTurn(this.diceNum) : this.squareTurn(this.diceNum);

    // 測試
    // let circleCharacterPositiion =  this.circleCharacter.nativeElement.getBoundingClientRect();
    // console.log('circls posiiton = ',circleCharacterPositiion.x);
    // let circleCharacterPosition = this.circleCharacter.nativeElement.getBoundingClientRect();
    // console.log('circleCharacterPosition left = ',circleCharacterPosition.x);
    // this.circleCharacter.nativeElement.style.left = circleCharacterPosition.x;

  }

  circleTurn(diceNum: any) {
    // 測試
    console.log('circle turn');
    console.log('Dice Number =', diceNum);
    this.whoTurn = 'square';
    this.cellPositionLog(this.circleCharacter, this.diceNum, this.charactersPositionSoreLog[0]) ;
  }

  squareTurn(diceNum: any) {
    // 測試
    console.log('square');
    console.log(diceNum);
    this.whoTurn = 'circle';


    this.cellPositionLog(this.squareCharacter, this.diceNum, this.charactersPositionSoreLog[1]) ;
  }
  // 測試
  num: number = 0;
  runRight(character: any, diceNum: any, charactersPositionSoreLog: any) {
    // 判斷位置
    // if (this.num > 2) {
    //   return;
    // }
    // 移動動畫
    if (this.run > this.diceNum) {
      // setTimeout(() => {
      // this.isButtonDisabled = false; // active 按鈕
      // this.imageUrl = 'assets/roll.png'; // 置入roll，用於圖片致換
      // }, 500);
      return
    } else {
      setTimeout(() => {
      character.nativeElement.style.transition = ".3s";
      // 獲取目標元素左邊框與父元素的左邊框的距離
      let characterPosition = character.nativeElement.offsetLeft;
      character.nativeElement.style.left = characterPosition + 123 +'px';
      this.run += 1;
      // test
      // console.log('num',this.num);
      this.cellPositionLog(character, diceNum, charactersPositionSoreLog);
      }, 500);
    }
  }

  runLeft(character: any, diceNum: any, charactersPositionSoreLog: any) {
    // 移動動畫
    if (this.run > this.diceNum) {
      // setTimeout(() => {
      // this.isButtonDisabled = false; // active 按鈕
      // this.imageUrl = 'assets/roll.png'; // 置入roll，用於圖片致換
      // }, 500);
      return
    } else {
      setTimeout(() => {
      character.nativeElement.style.transition = ".3s";
      // 獲取目標元素左邊框與父元素的左邊框的距離
      let characterPosition = character.nativeElement.offsetLeft;
      character.nativeElement.style.left = characterPosition - 123 +'px';
      this.run += 1;
      this.cellPositionLog(character, diceNum, charactersPositionSoreLog);
      }, 500);
    }
  }

  runUp(character: any, diceNum: any, charactersPositionSoreLog: any) {
    // 移動動畫
    if (this.run > this.diceNum) {
      // setTimeout(() => {
      // this.isButtonDisabled = false; // active 按鈕
      // this.imageUrl = 'assets/roll.png'; // 置入roll，用於圖片致換
      // }, 500);
      return
    } else {
      setTimeout(() => {
      character.nativeElement.style.transition = ".3s";
      // 獲取目標元素左邊框與父元素的左邊框的距離
      let characterPosition = character.nativeElement.offsetTop;
      character.nativeElement.style.top = characterPosition - 123 +'px';
      this.run += 1;
      this.cellPositionLog(character, diceNum, charactersPositionSoreLog);
      }, 500);
    }
  }

  runDown(character: any, diceNum: any, charactersPositionSoreLog: any) {
    // 判斷位置
    // if (this.num > 4 && this.num < 8) {
    //   return;
    // }
    // 移動動畫
    if (this.run > this.diceNum) {
      // setTimeout(() => {
      // this.isButtonDisabled = false; // active 按鈕
      // this.imageUrl = 'assets/roll.png'; // 置入roll，用於圖片致換
      // }, 500);
      return
    } else {
      setTimeout(() => {
      character.nativeElement.style.transition = ".3s";
      // 獲取目標元素左邊框與父元素的左邊框的距離
      let characterPosition = character.nativeElement.offsetTop;
      character.nativeElement.style.top = characterPosition + 123 +'px';
      this.run += 1;
      // test
      // console.log('num',this.num);
      this.cellPositionLog(character, diceNum, charactersPositionSoreLog);
      }, 500);
    }
  }

  // log circle and square position
  cellPositionLog(character: any, diceNum: any, charactersPositionSoreLog: any) {

    // 判斷是否還在回合內，如果為否位置不能+1
    if ((this.diceNum - this.run) !== -1) {
      charactersPositionSoreLog.currentPosition += 1;
    console.log('currentPosition:',charactersPositionSoreLog.currentPosition);
    } else {

  // class: any;
  // question: any;
  // option: any;
  // content: any;
  // value: any;

      // 配置cell觸發事件
      if (this.cellContent[charactersPositionSoreLog.currentPosition].class == "問題") {
        this.monopolyContent.nativeElement.classList.add('displayNone');
        this.monopolyBtn.nativeElement.classList.remove('displayNone');
        this.class = this.cellContent[charactersPositionSoreLog.currentPosition].class;
        this.question = this.cellContent[charactersPositionSoreLog.currentPosition].question;
        this.option1 = this.cellContent[charactersPositionSoreLog.currentPosition].options[0];
        this.option2 = this.cellContent[charactersPositionSoreLog.currentPosition].options[1];
        this.option3 = this.cellContent[charactersPositionSoreLog.currentPosition].options[2];
        this.content = '';
        this.value = '';
        this.endMove();
      } else if((this.cellContent[charactersPositionSoreLog.currentPosition].class == "命運")||(this.cellContent[charactersPositionSoreLog.currentPosition].class == "機會")) {
        this.monopolyBtn.nativeElement.classList.add('displayNone');
        this.monopolyContent.nativeElement.classList.remove('displayNone');
        this.class = this.cellContent[charactersPositionSoreLog.currentPosition].class;
        this.question = '';
        this.option1 = '';
        this.option2 = '';
        this.option3 = '';
        this.content = this.cellContent[charactersPositionSoreLog.currentPosition].content;
        this.value = this.cellContent[charactersPositionSoreLog.currentPosition].value;
        this.closeMonopolyEventWindow(2500);
        this.endMove();
      } else {
        setTimeout(() => {
          this.isButtonDisabled = false; // active 按鈕
        this.imageUrl = 'assets/roll.png'; // 置入roll，用於圖片致換
        },500);
      }

      

      console.log('cellContent=',this.cellContent);
    }

   // 判斷位置
    if ((charactersPositionSoreLog.currentPosition >= 0) && (charactersPositionSoreLog.currentPosition < 5)) {
      // console.log('num',this.num);
      this.runRight(character, diceNum, charactersPositionSoreLog);
    }
    if ((charactersPositionSoreLog.currentPosition >= 5) && (charactersPositionSoreLog.currentPosition < 9)) {
      // console.log('num',this.num);
      this.runDown(character, diceNum, charactersPositionSoreLog);
    }
    if ((charactersPositionSoreLog.currentPosition >= 9) && (charactersPositionSoreLog.currentPosition < 13)) {
      // console.log('num',this.num);
      this.runLeft(character, diceNum, charactersPositionSoreLog);
    }
    if ((charactersPositionSoreLog.currentPosition >= 13) && (charactersPositionSoreLog.currentPosition < 17)) {
      console.log('num',charactersPositionSoreLog);
      this.runUp(character, diceNum, charactersPositionSoreLog);
      if (charactersPositionSoreLog.currentPosition === 16){
        charactersPositionSoreLog.currentPosition = 0;
      } 
    }
  }

  answer(answer: any) {
  
    // 確認是誰的回合
    let whoAnswerTurn:any ; 
    this.whoTurn == 'square' ?
    whoAnswerTurn = this.charactersPositionSoreLog[0]:
    whoAnswerTurn = this.charactersPositionSoreLog[1] ;

    this.AnswerButtonDisabled = true;
    // whoAnswerTurn = this.cellContent[this.charactersPositionSoreLog[0].currentPosition] :
    // whoAnswerTurn = this.cellContent[this.charactersPositionSoreLog[1].currentPosition] ;

    if (answer == this.cellContent[whoAnswerTurn.currentPosition].answer) {
      whoAnswerTurn.score += 5;
      this.value = '非常棒~答案正確加 5 分';
      this.closeMonopolyEventWindow(1300);
    } else {
      this.value = '答案錯誤X，多多加油唷~';
      this.closeMonopolyEventWindow(1300);
    }
    
  }

  closeMonopolyEventWindow(delayTime: number) {
    setTimeout(() => {
      this.monopolyEvent.nativeElement.classList.add('invisible');
    }, delayTime);
  }

  endMove() {
    setTimeout(() => {
      this.monopolyEvent.nativeElement.classList.remove('invisible');
      this.isButtonDisabled = false; // active 按鈕
      this.imageUrl = 'assets/roll.png'; // 置入roll，用於圖片致換
    },500);
  }

}



// Composite components
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [gameSetApp, gameCharacterApp],
  template: `
    <game-set></game-set>
    <game-character></game-character>
  `
})
export class AppComponent {}

bootstrapApplication(AppComponent);