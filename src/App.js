import React, { Component } from 'react';
import './App.css';
import moment from "moment";
import { Button, Grid, Row, Col, Table } from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        let currentMoment = moment(new Date());
        let selectedMoment = moment(new Date());
        this.state = {
            currentMoment: currentMoment,
            selectedMoment: selectedMoment
        };
        this.nextMonth = this.nextMonth.bind(this);
        this.previousMonth = this.previousMonth.bind(this);
        this.setSelectedDate = this.setSelectedDate.bind(this);

    }
  render() {
    return (
      <Grid className="App">
          <Row>
              <Row>
                  <Col md={3} mdPush={2}>
                      {this.state.selectedMoment.format("DD-MMM, YYYY")}
                  </Col>
              </Row>
              <Row>
                  <Col md={1}><Button onClick={this.previousMonth} bsStyle="primary">Previous</Button></Col>
                  <Col md={1} mdPush={2}>{this.state.currentMoment.format("MMM YYYY")}</Col>
                  <Col md={1} mdPush={4}><Button onClick={this.nextMonth} bsStyle="primary">Next</Button></Col>
              </Row>
              <Table striped bordered condensed hover>
                  <thead>
                    <tr>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                  </thead>
                  { this.renderDaysForCurrentMonth() }
              </Table>
          </Row>
      </Grid>
    );
  }

    renderDaysForCurrentMonth() {
        return [...Array(this.state.currentMoment.daysInMonth())].map((e, i) => {
                let dayElement = <Day
                    key={i}
                    day={i+1}
                    setSelectedDate={this.setSelectedDate} />;
                    // if(moment().date(i+1).month(this.state.currentMoment.month()).year(this.state.currentMoment.year()).weekday() === 6) {
                    if(i%7==0) {
                        return <tr key={i}>{ dayElement }</tr>;
                    } else {
                        return dayElement;
                    }
            }
        )
    }

    nextMonth() {
        this.setState((prevState, props) => ({
            currentMoment: prevState.currentMoment.add(1, 'months')
        }));
    }

    previousMonth() {
        this.setState((prevState, props) => ({
            currentMoment: prevState.currentMoment.subtract(1, 'months')
        }));
    }

    setSelectedDate(day) {
        this.setState((prevState, props) => ({
            selectedMoment: moment().date(day).month(prevState.currentMoment.month()).year(prevState.currentMoment.year())
        }));
    }
}

class Day extends Component {
    render() {
        return <td onClick={() => this.props.setSelectedDate(this.props.day)}>{this.props.day}</td>;
    }
}
export default App;
