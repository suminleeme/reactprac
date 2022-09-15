//https://ko.reactjs.org/tutorial/tutorial.html#setup-option-1-write-code-in-the-browser
// 추가 구현
// 이동 기록 목록에서 특정 형식(행, 열)으로 각 이동의 위치를 표시해주세요.
// 이동 목록에서 현재 선택된 아이템을 굵게 표시해주세요.
// 사각형들을 만들 때 하드코딩 대신에 두 개의 반복문을 사용하도록 Board를 다시 작성해주세요.
// 오름차순이나 내림차순으로 이동을 정렬하도록 토글 버튼을 추가해주세요.
// 승자가 정해지면 승부의 원인이 된 세 개의 사각형을 강조해주세요.
// 승자가 없는 경우 무승부라는 메시지를 표시해주세요.


import React from 'react'; // React 엘리먼트는 애플리케이션에 전달할 수 있는 클래스형 JavaScript 객체
import ReactDOM from 'react-dom/client';
import './index.css';

// class Square extends React.Component {
//     //Square 컴포넌트를 클릭한 것을 “기억하게” 만들어 “X” 표시를 채워 넣으려고 합니다. 무언가를 “기억하기”위해 component는 state를 사용합니다.
//     //React 컴포넌트는 생성자에 this.state를 설정하는 것으로 state를 가질 수 있습니다. this.state는 정의된 React 컴포넌트에 대해 비공개로 간주해야 합니다.
//     //이제 Square의 현재 값을 this.state에 저장하고 Square를 클릭하는 경우 변경하겠습니다.
//     //JavaScript 클래스에서 하위 클래스의 생성자를 정의할 때 항상 super를 호출해야합니다. 모든 React 컴포넌트 클래스는 생성자를 가질 때 super(props) 호출 구문부터 작성해야 합니다.

//     //Square는 게임의 상태를 유지할 필요가 없기 때문에 constructor를 지워주세요.
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }

//     //Square를 클릭하면 Board에서 넘겨받은 onClick 함수가 호출

//     render() {
//         return (
//             // <button className="square" => console.log('click')}>
//             <button
//                 className="square"
//                 // => this.setState({value: 'X'})}
//                 => this.props.onClick()}
//             >
//                 {this.props.value}
//                 {/* {this.state.value} */}
//             </button>
//         );
//     }
// }

// 함수 컴포넌트로 수정
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     };
    // }

    // handleClick(i) {
    //     const squares = this.state.squares.slice(); // .slice()를 호출하는 것으로 기존 배열을 수정하지 않고 squares 배열의 복사본을 생성하여 수정,
    //     // 직접적인 데이터 변이를 피하는 것은 이전 버전의 게임 이력을 유지하고 나중에 재사용할 수 있게 만듭니다.
    //     // 객체가 직접적으로 수정되기 때문에 복제가 가능한 객체에서 변화를 감지하는 것은 어렵습니다. 불변 객체에서 변화를 감지하는 것은 상당히 쉽습니다. 참조하고 있는 불변 객체가 이전 객체와 다르다면 객체는 변한 것입니다.
    //     // React에서 순수 컴포넌트를 만드는 데 도움을 준다는 것입니다. 변하지 않는 데이터는 변경이 이루어졌는지 쉽게 판단할 수 있으며 이를 바탕으로 컴포넌트가 다시 렌더링할지를 결정

    //     //누군가가 승리하거나 Square가 이미 채워졌다면 Board의 handleClick 함수가 클릭을 무시
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //     }

    //     squares[i] = this.state.xIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.state.xIsNext,
    //     });
    // }

    //Square에 value prop을 전달
    renderSquare(i) {
        // return <Square value={i} />;
        // Board에서 Square로 value와 onClick 두 개의 props를 전달
        // onClick prop은 Square를 클릭하면 호출되는 함수, React에서 이벤트를 나타내는 prop에는 on[Event], 이벤트를 처리하는 함수에는 handle[Event]를 사용하는 것이 일반적
        return (<Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //     status = 'Winner ' + winner;
        // } else {
        //     status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
        // }

        return (
            <div>
                {/* <div className="status">{status}</div> */}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0, //stepNumber state는 현재 사용자에게 표시되는 이동을 반영
            xIsNext: true
        };
    }

    handleClick(i) {
        // const history = this.state.history;
        const history = this.state.history.slice(0, this.state.stepNumber + 1); //  “시간을 되돌려” 그 시점에서 새로운 움직임을 보이면, 지금은 올바르지 않은 “미래”의 기록을 모두 버림
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{squares: squares}]), // 배열 push() 함수와 같이 더 익숙한 방식과 달리 concat() 함수는 기존 배열을 변경하지 않기 때문에 이를 더 권장
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        // const current = history[history.length - 1];
        const current = history[this.state.stepNumber]; //게임의 기록에서 어떤 차례를 선택한다면 틱택토 게임판을 즉시 업데이트해서 그 단계가 발생한 직후의 게임판을 보여줌
        const winner = calculateWinner(current.squares);

        // ※ js map 함수 : arr.map(function(element, index, array){  }, this);
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return ( // 틱택토 게임 기록의 각각 이동마다 버튼 <button>을 포함하는 리스트 아이템 <li>를 생성
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;

        if (winner) {
            status = 'Winner ' + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        // 빙고 라인에서 세개 값 같을 경우, ex : squares[a] : X / squares[b] : X / squares[c] : X
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}