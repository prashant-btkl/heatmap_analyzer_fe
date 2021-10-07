 import React from "react";
 import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
class Dashboard extends React.Component {
  state = {
    page_id : "",
    xy : {}
  }


  handleSubmit = (event) => {
    this.setState({page_id: this.element.value});
    alert('A form was submitted: ' +this.element.value);

    fetch(`http://127.0.0.1:5000/get_xy/${this.element.value}`)
        .then(res => res.json())
        .then((data) => {
          this.setState({ xy : data })
        })
        .catch(console.log)

    event.preventDefault();
}

render() {
 return (
  <>
    <Container fluid>
    <Row>
      <Col lg="5" sm="3">  
        <Card className="card-stats">
        <Card.Header>
                <Card.Title as="h5">submit page id</Card.Title>
        </Card.Header>
          <Card.Body>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Page ID:
                    <input type="text" ref={el => this.element = el} name="page_id" />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
          </Card.Body>
          <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
        </Card>
      </Col>
      </Row>
      <Row>
          <Col md="11">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Heatmaps</Card.Title>
              </Card.Header>
              <Card.Body>
                
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
    </Container>
    </>
  );
  }
}
export default Dashboard;
