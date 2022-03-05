
let cnt;
let int;

var trump = [];
var trump_cnt = 0;

var card_1 = "";
var card_2 = "";

const cardType = ["♦","♥","♣","♠"];

window.onload = function() {
    document.getElementById('msg').innerHTML = "ようこそ！ボタンを押して初めてください！";
}

// ボタンの処理
function startGame() {
    
    const button = document.getElementById('start_btn');
    //押されたらリセットボタンに変更
    if(button.value == "ゲームをリセットする") {

        //質問を問いかける
        let res = window.confirm('リセットします。よろしいですか？');

        if(res == true) {
            //「はい」であればリセット
            for(cnt = 0; cnt < 52; cnt++) {
                const element = document.querySelector('button');
                element.remove();
            }
            onGame();
        }
        else {
            //「キャンセル」であれば取り消し
            return;
        }
    }
    else {
        //開始ボタンの場合
        button.value = "ゲームをリセットする";
        onGame();
    }
}

// ゲームの処理
function onGame() {
    // カードを52枚つくりたい
    // まずは種類
    for(cnt = 0; cnt < cardType.length; cnt++) {
        // cardType[cnt]のintとしてカードを作る
        for(int = 1; int < 14; int++) {
            // 1はA、11はJ、12はQ、13はKで出力させる。
            if(int == 1) {
                card_num = "A";
            }
            else if(int == 11) {
                card_num = "J";
            }
            else if(int == 12) {
                card_num = "Q";
            }
            else if(int == 13) {
                card_num = "K";
            }
            else {
                card_num = int;
            }
            trump[trump_cnt] = cardType[cnt] + "<br>" + card_num;
            trump_cnt++;
        }
        document.getElementById('msg').innerHTML = "カードを生成中です…";
    }

    // まぜて出力
    const gameWindow = document.getElementById('game');

    for(cnt = 0; cnt < 52; cnt++) {
        // 52までの乱数を生成
        const rand = Math.floor(Math.random() * 52);

        // AppendChild用のデータを出力
        let card = document.createElement('button');
        card.innerHTML = trump[rand];
        card.onclick = cardOpening;
        card.dataset.index = cnt;
        card.value = trump[rand];

        // もしハートかダイヤだったら文字を赤くする
        if(trump[rand].includes("♥") || trump[rand].includes("♦")) {
            card.style.color = "red";
        }
        gameWindow.appendChild(card);
        document.getElementById('msg').innerHTML = "カードをシャッフルし、並べています…";
    }
    document.getElementById('msg').innerHTML = "1枚目のカードを選んでください。";
    
    
}


var check_card1, check_card2;
function cardOpening() {
    
    if(!card_1) {
        card_1 = this.value;
        check_card1 = this.value.substr(5);

        if(check_card1 == "A") {
            check_card1 = 1;
        }
        else if(check_card1 == "J") {
            check_card1 = 11;
        }
        else if(check_card1 == "Q") {
            check_card1 = 12;
        }
        else if(check_card1 == "K") {
            check_card1 = 13;
        }

        console.log("1枚目："+card_1+","+check_card1);
        document.getElementById('msg').innerHTML = card_1 + " のカードが選択されました。2枚目のカードを選んでください。";
        return;
    }
    else if(!card_2) {
        card_2 = this.value;
        check_card2 = this.value.substr(5);

        if(check_card2 == "A") {
            check_card2 = 1;
        }
        else if(check_card2 == "J") {
            check_card2 = 11;
        }
        else if(check_card2 == "Q") {
            check_card2 = 12;
        }
        else if(check_card2 == "K") {
            check_card2 = 13;
        }
        console.log("2枚目："+card_2+","+check_card2);

        if(check_card1 == check_card2) {
            document.getElementById('msg').innerHTML = card_1 + " と " + card_2 + " のカード… 素晴らしい！一致していました！次のカードを選んでください。";
        }
        else {
            document.getElementById('msg').innerHTML = card_1 + " と " + card_2 + " のカード… 残念！揃いませんでした！次のカードを選んでください。";
        }
        card_1 = "";
        card_2 = "";
    }
    
}

