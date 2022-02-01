 import React from "react";
 import h337 from "heatmap.js";
 import webpage from "assets/img/91092828-2644-4d9d-b0a2-09f06f23f6fd.png";
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
  Image,
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
            container: document.querySelector('.heatmap'),
            radius: 30
            });
            heatmapInstance.setData({max: 2, data: this.state.xy["data"]});
            console.log("heatmap image url : ",heatmapInstance.getDataURL());
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
        <Card>
        <Card.Header>Enter Page ID</Card.Header>
        <Card.Header>
        </Card.Header>
        <Card.Body>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control type="text" ref={el => this.element = el} name="page_id" placeholder="Enter page id" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
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
      <Col lg="15" sm="15">
            <Card>
              <Card.Body>
                <div className="heatmap" fluid>
                  <Image src={webpage} alt="webpage image"/>
                </div>
              </Card.Body>
            </Card>
      </Col>
      </Row>
    </Container>
    </>
  );
  }
}
export default Dashboard;
