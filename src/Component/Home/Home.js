import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
  return (
    <Container className="home-container">
      <div className="generics-sec">
        <Row>
          <Col>
            <h2 className="generics-titlee">The Generics</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="home-button">
              Get Our Latest Album
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
          <Button className="play-button"> ► </Button>
         </Col>
        </Row>
        
        <Row>
            <Col>
            <h1 className='tour'>Tours</h1>
            
            <table className="tour-table">
              <tr>
                <td>JUL 16</td>
                <td>DETROIT, MI</td>
                <td>DTE ENERGY MUSIC THEATRE</td>
                <td><Button className='buy_tickets'>BUY TICKETS</Button></td>
              </tr>
              <tr>
                <td>JUL 19</td>
                <td>TORONTO, ON</td>
                <td>BUDWEISER STAGE</td>
                <td><Button className='buy_tickets'>BUY TICKETS</Button></td>
              </tr>
              <tr>
                <td>JUL 22</td>
                <td>BRISTOW, VA</td>
                <td>JIFFY LUBE LIVE</td>
                <td><Button className='buy_tickets'>BUY TICKETS</Button></td>
              </tr>
              <tr>
                <td>JUL 29</td>
                <td>PHOENIX, AZ</td>
                <td>AK-CHIN PAVILION</td>
                <td><Button className='buy_tickets'>BUY TICKETS</Button></td>
              </tr>
              <tr>
                <td>AUG 2</td>
                <td>LAS VEGAS, NV</td>
                <td>T-MOBILE ARENA</td>
                <td><Button className='buy_tickets'>BUY TICKETS</Button></td>
              </tr>
              <tr>
                <td>AUG 7</td>
                <td>CONCORD, CA</td>
                <td>CONCORD PAVILION</td>
                <td><Button className='buy_tickets'>BUY TICKETS</Button></td>
              </tr>
            </table>
            </Col>
        </Row>

        <div className="generics-bottom">
        <Row>
          <Col>
            <h2 className="generics-bt">The Generics</h2>
          </Col>
        </Row>
        </div>
      </div>
    </Container>
  );
};

export default Home;