 import React from "react";
 import ChartistGraph from "react-chartist";
 import h337 from "heatmap.js";
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
  constructor(props){
    super(props);
    this.state = {
      page_id : "",
      xy : []
    }
  }


  handleSubmit = (event) => {
    this.setState({page_id: this.element.value}, () =>
     console.log(this.state.page_id));

    fetch(`http://127.0.0.1:5000/get_xy/${this.element.value}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ xy : data }, () => {
            var heatmapInstance = h337.create({
            // only container is required, the rest will be defaults
            container: document.querySelector('.heatmap')
            });
            console.log("I am being called", this.state.xy["data"])
            heatmapInstance.setData({max: 1, data: this.state.xy["data"]});
          })
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
                  <div className="heatmap">

                      <h1>Hello Heatmaps</h1>
                      
                      <h2>Submit the page id to see heatmaps!</h2>
                  </div>
                </Card.Body>
              <Card.Footer>
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
