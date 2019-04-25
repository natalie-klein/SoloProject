const React = require('react');
const ReactDOM = require('react-dom');
require('./index.css');    
import axios from "axios";

const url = 'http://localhost:3000/category/'

class App extends React.Component {
    constructor(props, state) {
        super(props, state);    
            this.state = {
                status: false,
                runningTime: 0,
                tilesArr: [[<Dummy />,<Dummy />,<Dummy />,<Dummy />],
                    [<Dummy />,<Dummy />, <Dummy />,<Dummy />]],
                pointsTeam1: 0,
                pointsTeam2: 0,
                pointsTeam3: 0,       

            };

        this.handleClick = this.handleClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.DecreaseItem = this.DecreaseItem.bind(this);
        this.IncrementItem = this.IncrementItem.bind(this);
        this.getCategory = this.getCategory.bind(this);
    }

     getCategory (category) {
         const that = this;
        axios.get(url+category)
        .then(function (response) {
         let rowsData = response.data.rows;
         console.log(rowsData);
        let firstRow = [];
        let secondRow = [];
        for (let i = 0 ; i < 4 ; i++){
            firstRow.push(<Box currStyle={'none'} word={rowsData[i].word} link={rowsData[i].link}/>)
        }
        for (let i = 4 ; i < rowsData.length ; i++){
            secondRow.push(<Box currStyle={'none'} word={rowsData[i].word} link={rowsData[i].link}/>)
        }
        that.setState({tilesArr:[firstRow,secondRow]});
        })
        .catch(function (error) {
        console.log(error);
        });
    } 
    
    handleClick () {
        this.setState(state => {
          if (state.status) {
            clearInterval(this.timer);
          } else {
            const startTime = Date.now() - this.state.runningTime;
            this.timer = setInterval( () => {
              this.setState({ runningTime: Date.now() - startTime });
            });
          }
          return { status: !state.status };
        });
      };

      handleReset () {
        clearInterval(this.timer);
        this.setState({ runningTime: 0, status:false});
         
      };

      IncrementItem () {
        if (event.target.id === "1+"){
            this.setState({ pointsTeam1: this.state.pointsTeam1 + 1 });
        }
        if (event.target.id === "2+"){
            this.setState({ pointsTeam2: this.state.pointsTeam2 + 1 });
        }
        if (event.target.id === "3+"){
            this.setState({ pointsTeam3: this.state.pointsTeam3 + 1 });
        }
      }

      DecreaseItem (event) {
        if (event.target.id === "1-"){
            this.setState({ pointsTeam1: this.state.pointsTeam1 - 1 });
        }
        if (event.target.id === "2-"){
            this.setState({ pointsTeam2: this.state.pointsTeam2 - 1 });
        }
        if (event.target.id === "3-"){
            this.setState({ pointsTeam3: this.state.pointsTeam3 - 1 });
        }
      }  

    render() {
      return (
        <div className="App">
          <center>
          <h1>VOCAB GAME</h1>
          {/* <Board tilesArr={this.state.tilesArr} rowsData={this.state.rowsData} /> */}
            <div style={{width:'100%', textAlign: 'center'}}>{this.state.tilesArr[0]}</div>
            <div style={{width:'100%', textAlign: 'center'}}>{this.state.tilesArr[1]}</div>
          <h2>Categories</h2>
          <CategoryButtons getCategory={this.getCategory} />
          <div className="row">
          <div className="column">
          <h2>Timer</h2>
          <Stopwatch status={this.state.status} runningTime={this.state.runningTime} handleClick={this.handleClick} handleReset={this.handleReset}/>
          </div>
          <div className="column">
          <h2>Scoreboard</h2>
          <Scoreboard pointsTeam1={this.state.pointsTeam1} pointsTeam2={this.state.pointsTeam2} pointsTeam3={this.state.pointsTeam3} IncrementItem={this.IncrementItem}  DecreaseItem={this.DecreaseItem} />
          </div>
          </div>
          </center>
        </div>
      );
    }
  }


  class Dummy extends React.Component{
    render() {

        return (
            <div style={{display:'inline-block'}}>
                 <button>-</button>
            </div>
      );
    }
  }

  class Stopwatch extends React.Component {   
    constructor(props) {
        super(props);    
    }

    render() {
 
      return (
        <div>
          <div className="stopStart"><p>{Math.floor(this.props.runningTime/1000)}</p></div>
          <button onClick={this.props.handleClick}>{this.props.status ? 'Stop' : 'Start'}</button>
          <button onClick={this.props.handleReset}>Reset</button>
        </div>
      );
    }
  }

  const Board = (props) => {
    const rows = [];
    props.tilesArr.forEach((row, i) => {
      rows.push(
        <Row id={i} key={`row ${i}`} row={row} rowsData={props.rowsData} />
      );
    });
    
    return (
      <div>
        {rows}
      </div>
    );
  };

  const Row = (props) => {
    const tiles = [];
    props.row.forEach((tileData, i) => {
      const id = `${props.id}${i}`;
      tiles.push(<Box id={i} key={`box${id}`} tileData={tileData} rowsData={props.rowsData}  />);
    });
    
    return (
      <div id={props.id}>
        {tiles}
      </div>
    );
  };

  const Box = props => (
    // <button onClick={(event) => event.target.parentNode.childNodes[2]['style']['display'] = 'inline'} >
    <button onClick={(event) => {
        if (event.target.parentNode.childNodes[2]['style']['display'] === "none"){
            event.target.parentNode.childNodes[2]['style']['display'] = "inline";
        } else if (event.target.parentNode.childNodes[2]['style']['display'] === "inline"){
            event.target.parentNode.childNodes[2]['style']['display'] = "none";
            }
        }
    }>
      <img src={props.link}/>
      <br></br>
      <span style={{display: props.currStyle}} >{props.word}</span>
    </button>
  );


class Scoreboard extends React.Component{
    constructor(props) {
        super(props);    
    }

    render() {
 
      return (
        <div>
            <div className="teamBunch">
            <span className="team">Team 1: <span className="pointies">{this.props.pointsTeam1}</span></span>
            <button className="points" id="1+" onClick={this.props.IncrementItem}>+</button>
            <button className="points" id="1-" onClick={this.props.DecreaseItem}>-</button>  
            </div>
            
            <br></br>
            <div className="teamBunch">
            <span className="team">Team 2: <span className="pointies">{this.props.pointsTeam2}</span></span>
            <button className="points" id="2+" onClick={this.props.IncrementItem}>+</button>
            <button className="points" id="2-" onClick={this.props.DecreaseItem}>-</button>
            </div>

            <br></br>
            <div className="teamBunch" id="teamBunchLast">
            <span className="team">Team 3: <span className="pointies">{this.props.pointsTeam3}</span></span>
            <button className="points" id="3+"onClick={this.props.IncrementItem}>+</button>
            <button className="points" id="3-" onClick={this.props.DecreaseItem}>-</button>
            </div>

        </div>
        );
    }
}


class CategoryButtons extends React.Component{
    render() {
        return (
          <div>
              <button onClick={() => this.props.getCategory('animal')} className="cat" >Animals</button>
              <button onClick={() => this.props.getCategory('food')}  className="cat">Food</button>
              <button onClick={() => this.props.getCategory('transportation')}  className="cat">Transportation</button>
        </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
     
)
